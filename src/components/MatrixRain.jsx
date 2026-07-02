import React, { useEffect, useRef, useState } from 'react';

export default function MatrixRain() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleTrigger = () => {
      setIsActive(true);
      // Desliga sozinho depois de 10 segundos
      setTimeout(() => {
        setIsActive(false);
      }, 10000);
    };

    window.addEventListener('trigger-matrix', handleTrigger);
    return () => window.removeEventListener('trigger-matrix', handleTrigger);
  }, []);

  useEffect(() => {
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // A ideia do usuário: chover as letras do site
    const letters = "LIRASTUDIODESIGNCONVERSAOPERFORMANCEWEBCODEUIUX".split("");
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1; 
    }

    const draw = () => {
      // Fundo preto com opacidade leve para dar o efeito de rastro
      ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ler a cor dinâmica do tema atual
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#0F0';
      
      ctx.fillStyle = accent; 
      ctx.font = `${fontSize}px var(--font-mono)`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999999, // Na frente de TUDO
        pointerEvents: 'none', // Não atrapalha cliques
      }}
    />
  );
}
