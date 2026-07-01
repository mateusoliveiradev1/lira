import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import FooterCanvas from './FooterCanvas';

export default function Footer() {
  return (
    <footer className="footer section" style={{ position: 'relative', overflow: 'hidden' }}>
      <FooterCanvas />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          <div className="footer-info">
            <Link to="/" className="logo">LIRA<span>.</span></Link>
            <p className="footer-desc">
              Transformamos cliques em lucro com Landing Pages de ultra conversão e design de classe mundial.
            </p>
            <div className="footer-socials">
              {/* <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram da Lira Studio">Instagram</a> */}
              {/* <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn da Lira Studio">LinkedIn</a> */}
              {/* <a href="#" target="_blank" rel="noreferrer" aria-label="GitHub da Lira Studio">GitHub</a> */}
              <a href="https://wa.me/5517997437433" target="_blank" rel="noreferrer" aria-label="WhatsApp da Lira Studio">WhatsApp</a>
              <a href="mailto:warface01031999@gmail.com" aria-label="Enviar email para Lira Studio">E-mail</a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h3>Navegação</h3>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><a href="/#projetos">Projetos</a></li>
              <li><a href="/#contato">Contato</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/termos">Termos de Uso</Link></li>
              <li><Link to="/privacidade">Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lira Studio. Todos os direitos reservados.</p>
          <p className="footer-signature">Projetado & Desenvolvido com <span className="text-accent" style={{ fontWeight: 800 }}>Precisão</span></p>
        </div>
      </div>
      
      {/* Mega Typography at the bottom */}
      <div className="footer-mega-text" aria-hidden="true">
        LIRA
      </div>
    </footer>
  );
}
