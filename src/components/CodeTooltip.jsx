import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeTooltip({ children, snippet, language = "jsx" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      style={{ position: 'relative', display: 'inline-block', cursor: 'help' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ 
        borderBottom: '1px dashed var(--accent-primary)',
        color: 'var(--fg-base)',
        transition: 'color 0.2s',
        ...(isHovered ? { color: 'var(--accent-primary)' } : {})
      }}>
        {children}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '12px',
              backgroundColor: '#1E1E1E',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '12px',
              zIndex: 100,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              minWidth: '250px',
              textAlign: 'left',
              pointerEvents: 'none'
            }}
          >
            {/* Setinha apontando para baixo */}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: 'calc(50% - 6px)',
              width: '12px',
              height: '12px',
              backgroundColor: '#1E1E1E',
              borderBottom: '1px solid #333',
              borderRight: '1px solid #333',
              transform: 'rotate(45deg)'
            }} />
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '8px',
              borderBottom: '1px solid #333',
              paddingBottom: '4px'
            }}>
              <span style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{language}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
              </div>
            </div>

            <pre style={{ margin: 0, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#D4D4D4', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
              <code>{snippet}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
