import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // espera a animação de saída terminar
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--bg-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Counter */}
          <motion.div
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--fg-muted)',
              letterSpacing: '0.1em',
            }}
          >
            <Counter />
          </motion.div>

          {/* LIRA. logo */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 15vw, 12rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--fg-base)',
                lineHeight: 1,
              }}
            >
              LIRA<span style={{ color: 'var(--accent-primary)' }}>.</span>
            </motion.h1>
          </div>

          {/* Tagline */}
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--fg-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              Alta Conversão
            </motion.p>
          </div>

          {/* Bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '2rem',
              right: '2rem',
              height: '1px',
              backgroundColor: 'var(--accent-primary)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate: bigger jumps as we get closer to 100
        const jump = prev < 60 ? Math.floor(Math.random() * 8) + 3 : Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + jump, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return <span>{String(count).padStart(3, '0')}%</span>;
}
