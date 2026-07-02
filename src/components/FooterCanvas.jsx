import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function FooterCanvas() {
  const canvasRef = useRef(null);
  const isInView = useInView(canvasRef, { margin: "200px" });

  useEffect(() => {
    if (!isInView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 80;

    let mouse = { x: -1000, y: -1000 };

    // Ler a cor do tema atual em cada frame
    const getAccentColor = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
      return raw || '#D4FF00';
    };
    const getBgColor = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--bg-base').trim();
      return raw || '#06080A';
    };

    // Converter hex para rgba
    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseSize = Math.random() * 1.5 + 0.5;
      }
      update() {
        // Movimento magnético (repulsão sutil do mouse)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          this.vx -= (dx / distance) * force * 0.05;
          this.vy -= (dy / distance) * force * 0.05;
        }

        // Fricção leve
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Limite de velocidade mínima (vagando)
        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.05;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw(color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.baseSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      const bgColor = getBgColor();
      const accentColor = getAccentColor();
      const particleColor = hexToRgba(accentColor, 0.4);

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw(particleColor);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
