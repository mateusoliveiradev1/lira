import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    
    // Esconder ao descer, mostrar ao subir
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="navbar-container">
        <MagneticButton>
          <a href="#" className="navbar-logo">
            LIRA<span>.</span>
          </a>
        </MagneticButton>
        
        <nav className="navbar-links">
          <MagneticButton>
            <a href="#projetos">Projetos</a>
          </MagneticButton>
          <MagneticButton>
            <a href="#processo">Processo</a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contato" className="navbar-cta">Iniciar Projeto</a>
          </MagneticButton>
        </nav>
      </div>
    </motion.header>
  );
}
