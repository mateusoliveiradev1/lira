import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (window.__lenis) window.__lenis.scrollTo(el);
    }
  };

  const handleAnchor = (e, sectionId) => {
    e.preventDefault();
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      navigate('/#' + sectionId);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.__lenis) window.__lenis.scrollTo(0);
    } else {
      navigate('/');
    }
  };

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
          <a 
            href="/" 
            className="navbar-logo"
            onClick={handleLogoClick}
          >
            LIRA<span>.</span>
          </a>
        </MagneticButton>
        
        <nav className="navbar-links">
          <MagneticButton>
            <a href="/#projetos" onClick={(e) => handleAnchor(e, 'projetos')}>Projetos</a>
          </MagneticButton>
          <MagneticButton>
            <a href="/#processo" onClick={(e) => handleAnchor(e, 'processo')}>Processo</a>
          </MagneticButton>
          <MagneticButton>
            <a href="/#contato" className="navbar-cta" onClick={(e) => handleAnchor(e, 'contato')}>Iniciar Projeto</a>
          </MagneticButton>
        </nav>
      </div>
    </motion.header>
  );
}
