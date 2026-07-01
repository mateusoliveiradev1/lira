import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatted = time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo'
  });

  return (
    <div className="live-clock" aria-label="Horário local da agência">
      <span className="clock-label">SÃO PAULO, BR</span>
      <span className="clock-separator">//</span>
      <span className="clock-time">{formatted}</span>
    </div>
  );
}
