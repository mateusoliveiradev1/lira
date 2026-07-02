import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'LiraOS v1.0.0 (tty1)' },
    { type: 'output', text: 'Digite "help" para ver os comandos disponíveis.' }
  ]);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Escutar atalho Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focar no input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Bloquear scroll do fundo enquanto o terminal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    
    // Adiciona o input ao histórico
    const newHistory = [...history, { type: 'input', text: `guest@lira-studio:~$ ${command}` }];

    if (command === '') {
      setHistory(newHistory);
      return;
    }

    let response = '';

    switch (command) {
      case 'help':
        response = `Comandos disponíveis:\n  whoami    - Quem sou eu?\n  projects  - Lista meus projetos\n  contact   - Meios de contato\n  clear     - Limpa o terminal\n  exit      - Fecha o terminal`;
        break;
      case 'whoami':
        response = `Mateus Oliveira (Lira).\nDesenvolvedor Web Fullstack.\nCriando soluções digitais que convertem e encantam.`;
        break;
      case 'projects':
        response = `Projetos de destaque:\n1. Validade Zero (App Mobile)\n2. Lira Studio (Landing Page)\n3. Resenha Web (Portal Esportivo)\n\nNavegue pelo menu do site para ver todos.`;
        break;
      case 'contact':
        response = `Email: ola@liraconversao.com.br\nWhatsApp: +55 (seu numero aqui)`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      case 'sudo rm -rf /':
      case 'rm -rf /':
        response = `[!] Acesso negado. Tentativa de invasão bloqueada. Muito engraçadinho!`;
        break;
      default:
        response = `Comando não encontrado: ${command}. Digite "help" para ajuda.`;
    }

    setHistory([...newHistory, { type: 'output', text: response }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <>
      {/* Botão flutuante caso a pessoa não saiba do atalho */}
      <motion.button
        className="terminal-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '100px', // Acima do botão de whatsapp que costuma ficar lá
          zIndex: 9000,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#0a0a0a',
          border: '1px solid var(--accent-primary)',
          color: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(215, 255, 0, 0.1)'
        }}
        title="Terminal (Ctrl+K)"
      >
        <TerminalIcon size={20} />
      </motion.button>

      {/* A Janela do Terminal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: '160px',
              right: '24px',
              width: '400px',
              maxWidth: 'calc(100vw - 48px)',
              height: '350px',
              backgroundColor: '#050505',
              border: '1px solid var(--border-base)',
              borderRadius: '8px',
              zIndex: 999999, // Ficar até acima do cursor, se precisar
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              fontFamily: 'var(--font-mono)',
              cursor: 'auto'
            }}
          >
            {/* Barra de título estilo MacOS / Janela */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: '#1a1a1a',
              borderBottom: '1px solid var(--border-base)',
              cursor: 'default'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>guest@lira-studio:~</span>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', display: 'flex' }}>
                <X size={14} />
              </button>
            </div>

            {/* Área de conteúdo */}
            <div 
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                padding: '12px',
                overflowY: 'auto',
                color: 'var(--fg-muted)',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                position: 'relative'
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} style={{ marginBottom: '8px', color: line.type === 'input' ? 'var(--accent-primary)' : '#fff', whiteSpace: 'pre-wrap' }}>
                  {line.text}
                </div>
              ))}
              
              <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent-primary)', marginRight: '8px' }}>guest@lira-studio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    cursor: 'text'
                  }}
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <div ref={endRef} />
            </div>
            {/* Efeito Scanline sutil */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              backgroundSize: '100% 4px, 3px 100%',
              pointerEvents: 'none',
              opacity: 0.3
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
