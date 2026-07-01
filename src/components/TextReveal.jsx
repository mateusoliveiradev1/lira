import { motion } from 'framer-motion';

export default function TextReveal({ text, delay = 0, className = '', style = {} }) {
  // If text is a string with \n, split it. If it's an array, use it directly.
  const lines = Array.isArray(text) ? text : text.split('\n');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * 0.1 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 14, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: { type: 'spring', damping: 14, stiffness: 100 },
    },
  };

  return (
    <motion.div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
          {line.split(' ').map((word, wordIndex) => (
            <motion.span
              variants={child}
              style={{ marginRight: '0.25em', display: 'inline-block' }}
              key={wordIndex}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
