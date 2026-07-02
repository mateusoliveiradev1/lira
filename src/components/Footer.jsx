import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import FooterCanvas from './FooterCanvas';

export default function Footer() {
  const textRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // Começa fora da tela

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 }); // Esconde a luz quando tira o mouse
  };

  return (
    <footer 
      className="footer section" 
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <FooterCanvas />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          <div className="footer-info">
            <Link to="/" className="logo">LIRA<span>.</span></Link>
            <p className="footer-desc">
              Transformamos cliques em lucro com Landing Pages de ultra conversão e design de classe mundial.
            </p>
            <div className="footer-socials">
              <MagneticButton>
                <a href="https://wa.me/5517997437433" target="_blank" rel="noreferrer" aria-label="WhatsApp da Lira Studio">WhatsApp</a>
              </MagneticButton>
              <MagneticButton>
                <a href="mailto:warface01031999@gmail.com" aria-label="Enviar email para Lira Studio">E-mail</a>
              </MagneticButton>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h3>Navegação</h3>
            <ul>
              <li><MagneticButton><Link to="/">Início</Link></MagneticButton></li>
              <li><MagneticButton><a href="/#projetos">Projetos</a></MagneticButton></li>
              <li><MagneticButton><a href="/#contato">Contato</a></MagneticButton></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h3>Legal</h3>
            <ul>
              <li><MagneticButton><Link to="/termos">Termos de Uso</Link></MagneticButton></li>
              <li><MagneticButton><Link to="/privacidade">Privacidade</Link></MagneticButton></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lira Studio. Todos os direitos reservados.</p>
          <p className="footer-signature">Projetado & Desenvolvido com <span className="text-accent" style={{ fontWeight: 800 }}>Precisão</span></p>
        </div>
      </div>
      
      {/* Mega Typography at the bottom (Spotlight Fill) */}
      <div ref={textRef} className="footer-mega-text" aria-hidden="true" data-text="LIRA">
        <span className="footer-mega-text-outline">LIRA</span>
        <span className="footer-mega-text-fill">
          LIRA
        </span>
      </div>
    </footer>
  );
}
