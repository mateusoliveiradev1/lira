import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

const themes = [
  { 
    id: 'neon', name: 'Neon', color: '#D4FF00', text: '#06080A',
    bg: '#06080A', surface: '#0E1116', raised: '#161A22'
  },
  { 
    id: 'cyber', name: 'Cyberpunk', color: '#FF00FF', text: '#000000',
    bg: '#0A0015', surface: '#150028', raised: '#1F0038'
  },
  { 
    id: 'electric', name: 'Arctic', color: '#00FFFF', text: '#000000',
    bg: '#050A14', surface: '#0A1428', raised: '#0F1E3A'
  },
  { 
    id: 'blood', name: 'Blood', color: '#FF3333', text: '#000000',
    bg: '#0A0505', surface: '#160A0A', raised: '#221010'
  }
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('neon');
  const [hoveredTheme, setHoveredTheme] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    // Adicionar transição global para troca suave de cores
    document.documentElement.style.setProperty('transition', 'background-color 0.4s ease, color 0.4s ease');

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

  // Fechar com Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const applyTheme = (theme, closePanel = true) => {
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', theme.color);
    root.style.setProperty('--accent-primary-text', theme.text);
    root.style.setProperty('--bg-base', theme.bg);
    root.style.setProperty('--bg-surface', theme.surface);
    root.style.setProperty('--bg-surface-raised', theme.raised);
    setActiveTheme(theme.id);
    localStorage.setItem('lira-theme', theme.id);
    if (closePanel) setIsOpen(false);
  };

  const currentTheme = themes.find(t => t.id === activeTheme);

  return (
    <>
      {/* Botão Flutuante — brilha com a cor do tema ativo */}
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
          border: `2px solid ${currentTheme?.color || '#D4FF00'}`,
          color: currentTheme?.color || '#D4FF00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: `0 0 20px ${currentTheme?.color || '#D4FF00'}30`
        }}
        aria-label="Mudar Tema"
      >
        <Palette size={20} />
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
              gap: '12px',
              minWidth: '180px'
            }}
          >
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-muted)' }}>
              {hoveredTheme ? hoveredTheme : (currentTheme?.name || 'Tema')}
            </span>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              {themes.map(theme => (
                <motion.button
                  key={theme.id}
                  onClick={() => applyTheme(theme)}
                  onMouseEnter={() => setHoveredTheme(theme.name)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: theme.color,
                    border: activeTheme === theme.id ? '2px solid #FFF' : '2px solid transparent',
                    cursor: 'pointer',
                    boxShadow: activeTheme === theme.id ? `0 0 20px ${theme.color}80` : 'none',
                    position: 'relative'
                  }}
                  aria-label={`Selecionar tema ${theme.name}`}
                >
                  {activeTheme === theme.id && (
                    <motion.div
                      layoutId="active-dot"
                      style={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '50%',
                        border: `2px solid ${theme.color}60`
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
