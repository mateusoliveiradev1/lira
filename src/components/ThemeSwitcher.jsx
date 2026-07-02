import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X } from 'lucide-react';

const themes = [
  { id: 'neon', name: 'Neon Yellow', color: '#D4FF00', text: '#06080A' },
  { id: 'cyber', name: 'Cyber Magenta', color: '#FF00FF', text: '#000000' },
  { id: 'electric', name: 'Electric Blue', color: '#00FFFF', text: '#000000' },
  { id: 'blood', name: 'Blood Red', color: '#FF3333', text: '#000000' }
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('neon');
  const panelRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('lira-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.id === savedTheme);
      if (theme) applyTheme(theme, false);
    }
  }, []);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !e.target.closest('.theme-switcher-btn')) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const applyTheme = (theme, closePanel = true) => {
    document.documentElement.style.setProperty('--accent-primary', theme.color);
    document.documentElement.style.setProperty('--accent-primary-text', theme.text);
    setActiveTheme(theme.id);
    localStorage.setItem('lira-theme', theme.id);
    if (closePanel) setIsOpen(false);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        className="theme-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          left: '24px',
          bottom: '24px',
          zIndex: 9000,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-surface-raised)',
          border: '1px solid var(--border-base)',
          color: 'var(--fg-base)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
        aria-label="Mudar Tema"
      >
        <Settings size={20} />
      </motion.button>

      {/* Painel de Cores */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'fixed',
              left: '24px',
              bottom: '84px',
              zIndex: 9000,
              backgroundColor: 'var(--bg-surface-raised)',
              border: '1px solid var(--border-base)',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-muted)' }}>Tema</span>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', padding: 0 }}>
                <X size={16} />
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => applyTheme(theme)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: theme.color,
                    border: activeTheme === theme.id ? '2px solid #FFF' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    transform: activeTheme === theme.id ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: activeTheme === theme.id ? `0 0 15px ${theme.color}80` : 'none'
                  }}
                  title={theme.name}
                  aria-label={`Selecionar tema ${theme.name}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
