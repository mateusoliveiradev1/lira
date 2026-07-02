import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hoursMinutes = time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  });
  
  const seconds = time.toLocaleTimeString('pt-BR', {
    second: '2-digit',
    timeZone: 'America/Sao_Paulo'
  });

  return (
    <div className="live-clock" aria-label="Horário local da agência">
      <span className="clock-label">SÃO PAULO, BR</span>
      <span className="clock-separator">//</span>
      <span className="clock-time" style={{ display: 'flex', alignItems: 'center' }}>
        {hoursMinutes}:
        <div style={{ position: 'relative', width: '1.2em', height: '1.2em', overflow: 'hidden', display: 'inline-flex', alignItems: 'center' }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={seconds}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ position: 'absolute' }}
            >
              {seconds}
            </motion.span>
          </AnimatePresence>
        </div>
      </span>
    </div>
  );
}
