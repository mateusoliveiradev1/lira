import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/SEO';
import { projects } from '../data/projects';
import { useEffect, useRef } from 'react';
import PhoneMockup from '../components/PhoneMockup';
import PushNotification from '../components/PushNotification';

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
        
        <div className="project-hero-overlay" />
        
        <div className="project-hero-content container">
          <Link to="/" className="project-back-btn" aria-label="Voltar para a home">
            <ArrowLeft size={20} /> <span>VOLTAR</span>
          </Link>
          
          <div>
            <motion.span 
              className="project-category-tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {project.category}
            </motion.span>
            
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
              {project.metrics?.map((m, idx) => (
                <div className="meta-item" key={idx}>
                  <span className="meta-label">{m.label}</span>
                  <span className="meta-value">{m.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stack Tags */}
      <section className="project-stack-section container">
        <div className="project-stack-tags">
          {project.stack?.map((tech, idx) => (
            <span className="stack-tag" key={idx}>{tech}</span>
          ))}
        </div>
      </section>

      {/* Galeria — se tiver (Removendo a primeira se for igual a img de capa) */}
      {project.gallery && project.gallery.length > 1 && (
        <section className="project-gallery container">
          <div className="gallery-grid">
            {project.gallery.filter(img => img !== project.img).map((img, idx) => (
              <motion.div 
                className="gallery-item" 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <img src={img} alt={`${project.name} screenshot ${idx + 1}`} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Detalhes do Projeto */}
      <section className="project-content-section container">
        <div className="project-content-grid">
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

          {/* Lado Direito - Métricas Reais do Projeto */}
          <div className="project-stats-column">
            {project.metrics?.map((m, idx) => {
              const isNumeric = /^[\d\+\-%x]+$/.test(m.value.replace(/\s/g, ''));
              return (
                <motion.div 
                  className="stats-block"
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <div className={isNumeric ? "stat-mega" : "stat-text"}>{m.value}</div>
                  <p className="stat-desc">{m.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Componentes Complexos baseados no slug */}
          {project.slug === 'validade-zero' && (
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
              <PhoneMockup 
                videoUrl="https://res.cloudinary.com/dpv0ukw6y/video/upload/v1709292881/demo-vz_c7w4xk.mp4" 
                imgUrl={project.img}
              />
            </div>
          )}
          {project.slug === 'resenha-web' && (
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
              <PushNotification 
                title="Novo Artigo"
                message="Flamengo vence de virada aos 45 do segundo tempo!"
                time="Agora mesmo"
              />
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="project-cta-section">
        <div className="container" style={{ textAlign: 'center', padding: '10vh 0 15vh 0' }}>
          {project.url ? (
            <a 
              href={project.url} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary btn-large"
              style={{ display: 'inline-flex', alignItems: 'center', fontSize: '1.125rem', padding: '1rem 3rem' }}
            >
              ACESSAR PROJETO AO VIVO <ArrowUpRight size={24} style={{ marginLeft: '12px' }} />
            </a>
          ) : (
            <span 
              className="btn btn-large"
              style={{ display: 'inline-flex', alignItems: 'center', fontSize: '1.125rem', padding: '1rem 3rem', opacity: 0.5, background: 'var(--bg-surface)', color: 'var(--fg-muted)', cursor: 'not-allowed' }}
            >
              {project.badge || 'EM DESENVOLVIMENTO'}
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
