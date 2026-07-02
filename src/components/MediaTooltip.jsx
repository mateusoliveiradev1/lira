import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

export default function MediaTooltip({ children, mediaUrl, mediaType = 'image', width = 300, height = 200 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (isHovered) {
      x.set(mousePosition.x);
      y.set(mousePosition.y);
    }
  }, [mousePosition, isHovered, x, y]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <span 
      style={{ 
        position: 'relative', 
        display: 'inline',
        cursor: 'none', // Força o mouse a sumir (ou usar o custom)
        textDecoration: 'underline',
        textDecorationColor: 'var(--accent-primary)',
        textUnderlineOffset: '4px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: width,
              height: height,
              x: x,
              y: y,
              translateX: '-50%', // centraliza a mídia no mouse
              translateY: '-50%',
              pointerEvents: 'none',
              zIndex: 99999,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: '2px solid var(--accent-primary)'
            }}
          >
            {mediaType === 'video' ? (
              <video 
                src={mediaUrl} 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img 
                src={mediaUrl} 
                alt="Tooltip preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
