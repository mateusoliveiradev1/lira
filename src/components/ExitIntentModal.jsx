import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Apenas no Desktop
    if (window.innerWidth < 1024) return;

    const handleMouseLeave = (e) => {
      // Se o mouse sair pelo topo da tela (indo em direção as abas/fechar)
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        // Salvar no sessionStorage para não incomodar o usuário na mesma sessão
        sessionStorage.setItem('exitIntentTriggered', 'true');
      }
    };

    if (!sessionStorage.getItem('exitIntentTriggered')) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="exit-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(6, 8, 10, 0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={(e) => {
            if (e.target.className === 'exit-modal-overlay') setIsOpen(false);
          }}
        >
          <motion.div
            className="exit-modal-content"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--accent-primary)',
              padding: 'var(--space-5)',
              maxWidth: '600px',
              width: '100%',
              position: 'relative',
              textAlign: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                background: 'none',
                border: 'none',
                color: 'var(--fg-muted)',
                fontSize: '2rem',
                cursor: 'pointer'
              }}
              aria-label="Fechar modal"
            >
              &times;
            </button>

            <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              ESPERA AÍ.
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              VAI MESMO DEIXAR <span className="text-accent">DINHEIRO</span> NA MESA?
            </h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              Antes de sair, solicite uma <strong>Auditoria Gratuita</strong> do seu site atual. Eu vou analisar sua página e gravar um vídeo te mostrando exatamente onde você está perdendo vendas.
            </p>
            
            <a 
              href="https://wa.me/5517997437433?text=Ol%C3%A1%21+Quero+uma+auditoria+gratuita+do+meu+site+atual." 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '1.25rem', padding: '1.25rem' }}
              onClick={() => setIsOpen(false)}
            >
              QUERO A AUDITORIA GRATUITA
            </a>
            
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--fg-subtle)',
                marginTop: '1.5rem',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Não, prefiro continuar perdendo tráfego.
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
