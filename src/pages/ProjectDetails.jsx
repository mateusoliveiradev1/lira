import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/SEO';
import { projects } from '../data/projects';
import { useEffect, useRef } from 'react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  // Parallax Setup para o Hero
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const titleY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const imgScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(heroScroll, [0, 1], [0, 0.9]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return <Navigate to="/" />;
  }

  return (
    <div className="app-wrapper project-details-page">
      <SEO 
        title={`Case ${project.name}`}
        description={`Confira o case completo de ${project.name}: ${project.challenge.substring(0, 100)}...`}
        image={`https://liraconversao.com.br${project.img}`}
        url={`https://liraconversao.com.br/projeto/${project.slug}`}
      />
      
      {/* Hero Cinemático */}
      <section className="project-hero" ref={heroRef}>
        <motion.div 
          className="project-hero-bg"
          style={{ scale: imgScale }}
        >
          <img src={project.img} alt={project.name} loading="eager" />
        </motion.div>
        
        <motion.div 
          className="project-hero-overlay"
          style={{ opacity: overlayOpacity }}
        />
        
        <div className="project-hero-content container">
          <Link to="/" className="project-back-btn" aria-label="Voltar para a home">
            <ArrowLeft size={24} /> <span>VOLTAR</span>
          </Link>
          
          <motion.h1 
            className="project-title-mega"
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            {project.name}
          </motion.h1>
          
          <motion.div 
            className="project-hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="meta-item">
              <span className="meta-label">ROLE</span>
              <span className="meta-value">Design & Dev</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">CLIENTE</span>
              <span className="meta-value">{project.name}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">STACK</span>
              <span className="meta-value">{project.tags?.slice(0, 2).join(' / ') || 'Custom'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detalhes do Projeto */}
      <section className="project-content-section container">
        <div className="project-content-grid">
          {/* Lado Esquerdo - Tópicos */}
          <div className="project-text-column">
            <motion.div 
              className="content-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <h2>O Desafio</h2>
              <p>{project.challenge}</p>
            </motion.div>
            
            <motion.div 
              className="content-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <h2>A Solução</h2>
              <p>{project.solution}</p>
            </motion.div>
          </div>

          {/* Lado Direito - Resultados / Métricas */}
          <div className="project-stats-column">
            <motion.div 
              className="stats-block"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="stat-mega">
                {project.results ? (project.results.match(/\d+%/)?.[0] || '100%') : '+150%'}
              </div>
              <p className="stat-desc">Aumento Direto em Conversão de Leads e Vendas.</p>
            </motion.div>
            
            <motion.div 
              className="stats-block"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-mega">0</div>
              <p className="stat-desc">Uso de Templates. Tudo desenvolvido do zero para máxima performance.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="project-cta-section">
        <div className="container" style={{ textAlign: 'center', padding: '10vh 0 15vh 0' }}>
          <a 
            href={project.url || '#'} 
            target="_blank" 
            rel="noreferrer" 
            className={`btn btn-primary btn-large project-live-btn ${!project.url ? 'disabled' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {project.url ? 'ACESSAR PROJETO AO VIVO' : 'EM DESENVOLVIMENTO'}
            {project.url && <ArrowUpRight size={24} style={{ marginLeft: '12px' }} />}
          </a>
        </div>
      </section>
    </div>
  );
}
