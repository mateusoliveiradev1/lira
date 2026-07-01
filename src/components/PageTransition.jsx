import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--bg-base)' }}
    >
      {/* Cortina de entrada — cobre a tela e sobe revelando o conteúdo */}
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#06080A',
          zIndex: 9998,
          transformOrigin: 'bottom',
          pointerEvents: 'none',
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </motion.div>
  );
}
