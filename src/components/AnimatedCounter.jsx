import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';

export default function AnimatedCounter({ startValue = 0, endValue, duration = 2, prefix = "", suffix = "", title, description }) {
  const [value, setValue] = useState(startValue);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(startValue, {
    bounce: 0,
    duration: duration * 1000
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(endValue);
    }
  }, [isInView, endValue, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <motion.div 
      ref={ref}
      className="animated-counter"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '2rem',
        backgroundColor: 'var(--bg-surface-raised)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--accent-primary)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 40px rgba(215, 255, 0, 0.05)'
      }}
    >
      <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-primary)', lineHeight: 1, marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
        {prefix}{value}{suffix}
      </div>
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: 'var(--fg-base)' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--fg-muted)' }}>{description}</p>
    </motion.div>
  );
}
