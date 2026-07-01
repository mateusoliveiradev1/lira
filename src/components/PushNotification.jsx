import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PushNotification({ title, message, delay = 3000, icon = "🚨" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Auto hide after 6 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
      
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: 'rgba(20, 20, 20, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-base)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            maxWidth: '320px',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
            cursor: 'pointer'
          }}
          onClick={() => setIsVisible(false)}
        >
          <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{icon}</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.4 }}>{message}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
