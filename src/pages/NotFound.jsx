import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';

export default function NotFound() {
  return (
    <motion.div 
      className="app-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container" style={{ 
        minHeight: '85vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        gap: 'var(--space-4)',
        paddingTop: 'var(--space-7)',
        paddingBottom: 'var(--space-7)',
      }}>
        {/* Giant 404 */}
        <motion.h1 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ 
            fontSize: 'clamp(8rem, 25vw, 20rem)', 
            lineHeight: 0.85, 
            color: 'var(--accent-primary)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
          }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            maxWidth: '600px',
            lineHeight: 1.1,
          }}
        >
          PÁGINA NÃO ENCONTRADA.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ 
            color: 'var(--fg-muted)', 
            fontSize: '1.125rem', 
            lineHeight: 1.6, 
            maxWidth: '500px',
            marginBottom: 'var(--space-3)',
          }}
        >
          Essa página se perdeu. Mas o seu lucro não precisa se perder também.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <MagneticButton>
            <Link to="/" className="btn btn-primary" style={{ fontSize: '1.25rem' }}>
              VOLTAR PARA HOME
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a 
              href="https://wa.me/5517997437433" 
              target="_blank" 
              rel="noreferrer" 
              className="btn" 
              style={{ 
                fontSize: '1.25rem', 
                border: '1px solid var(--border-base)',
                padding: '1rem 2rem',
              }}
            >
              FALAR NO WHATSAPP
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
