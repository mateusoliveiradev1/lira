import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/SEO';
import { projects } from '../data/projects';
import { useEffect, useRef } from 'react';
import PhoneMockup from '../components/PhoneMockup';
import PushNotification from '../components/PushNotification';
import AnimatedCounter from '../components/AnimatedCounter';
import CodeTooltip from '../components/CodeTooltip';

const tagStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.4rem 1rem',
  background: 'var(--bg-surface-raised)',
  border: '1px solid var(--border-base)',
  borderRadius: '999px',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-sans)',
  color: 'var(--fg-muted)',
  letterSpacing: '0.02em',
};

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  // Parallax Setup
  const imgContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgContainerRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return <Navigate to="/" />;
  }

  return (
    <div className="app-wrapper project-details">
      <SEO 
        title={`Case ${project.name}`}
        description={`Confira o case completo de ${project.name}: ${project.challenge.substring(0, 100)}...`}
        image={`https://liraconversao.com.br${project.img}`}
        url={`https://liraconversao.com.br/projeto/${project.slug}`}
      />
      
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
        <Link to="/" className="btn" style={{ padding: '0.75rem 1.5rem', marginBottom: '4rem', background: 'var(--bg-surface)', color: 'var(--fg-base)' }}>
          <ArrowLeft size={20} style={{ marginRight: '8px' }} /> VOLTAR
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ maxWidth: '100%' }}>
              <span style={{ ...tagStyle, marginBottom: '1rem', display: 'inline-flex' }}>{project.category}</span>
              <h1 className="project-title" style={{ margin: '0.5rem 0 1rem' }}>{project.name}</h1>
            </div>
            {project.url ? (
              <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '1.25rem' }}>
                VER PROJETO AO VIVO <ArrowUpRight size={24} style={{ marginLeft: '12px' }} />
              </a>
            ) : (
              <div className="btn" style={{ fontSize: '1.25rem', opacity: 0.5, cursor: 'not-allowed', background: 'var(--bg-surface)' }}>
                EM DESENVOLVIMENTO
              </div>
            )}
          </div>

          {/* Stack Tags */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
            {project.stack && project.stack.map((tech, i) => (
              <span key={i} style={{ ...tagStyle, color: i === 0 ? 'var(--accent-primary)' : 'var(--fg-muted)', borderColor: i === 0 ? 'var(--accent-primary)' : 'var(--border-base)' }}>
                <CodeTooltip 
                  snippet={`{\n  "dependency": "${tech}",\n  "status": "active",\n  "performance": "blazing-fast"\n}`} 
                  language="json"
                >
                  {tech}
                </CodeTooltip>
              </span>
            ))}
          </div>

          {project.gallery ? (
            <div style={{ marginBottom: 'var(--space-8)' }}>
              {/* Imagem Web com Parallax */}
              <div ref={imgContainerRef} style={{ width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
                <motion.img 
                  src={project.gallery[0]} 
                  alt={`${project.name} Web Preview`} 
                  loading="eager"
                  decoding="async"
                  style={{ width: '100%', height: 'auto', display: 'block', y: imgY, scale: 1.15 }} 
                />
              </div>
              {/* Imagens Mobile lado a lado */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', padding: '1rem 0' }}>
                {project.slug === 'validade-zero' ? (
                  <>
                    <PhoneMockup imageSrc={project.gallery[1]} alt={`${project.name} Mobile 1`} />
                    <PhoneMockup imageSrc={project.gallery[2]} alt={`${project.name} Mobile 2`} />
                  </>
                ) : (
                  <>
                    <img 
                      src={project.gallery[1]} 
                      alt={`${project.name} Mobile 1`} 
                      loading="lazy"
                      style={{ maxWidth: '320px', width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', display: 'block', border: '1px solid var(--border-base)' }} 
                    />
                    <img 
                      src={project.gallery[2]} 
                      alt={`${project.name} Mobile 2`} 
                      loading="lazy"
                      style={{ maxWidth: '320px', width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', display: 'block', border: '1px solid var(--border-base)' }} 
                    />
                  </>
                )}
              </div>
            </div>
          ) : (
            <div ref={imgContainerRef} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-8)' }}>
              <motion.img 
                src={project.img} 
                alt={`Demonstração visual do case ${project.name}`} 
                loading="eager"
                decoding="async"
                style={{ width: '100%', height: 'auto', display: 'block', y: imgY, scale: 1.15 }} 
              />
            </div>
          )}

          <div className="project-details-grid" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="process-step" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <h2 className="project-section-title">O Desafio</h2>
              <p className="project-section-text">{project.challenge}</p>
            </div>
            <div className="process-step" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <h2 className="project-section-title">A Solução</h2>
              <p className="project-section-text">{project.solution}</p>
            </div>
          </div>
          
          {project.slug === 'validade-zero' && (
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <AnimatedCounter 
                startValue={100}
                endValue={0} 
                duration={3} 
                title="Produtos Vencidos na Gôndola" 
                description="O prejuízo e a dor de cabeça pararam de existir. Operação de risco zero."
              />
            </div>
          )}
          
          {project.slug === 'validade-zero' && (
            <PushNotification 
              title="Alerta de Vencimento" 
              message="Lote de Leite Integral vence em 3 dias. Verifique a Gôndola 4." 
              delay={3500} 
              icon="🚨"
            />
          )}
        </motion.div>
      </div>

      <section className="stats-ribbon container" style={{ borderTop: '1px solid var(--border-base)', paddingTop: 'var(--space-6)' }}>
        <h2 className="project-results-title">RESULTADOS REAIS</h2>
        <div style={{ display: 'flex', gap: 'var(--space-6)', width: '100%', flexWrap: 'wrap' }}>
          {project.metrics.map((metric, idx) => (
            <motion.div 
              className="stat-item" 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="stat-number project-stat-number">{metric.value}</span>
              <span className="stat-label">{metric.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>QUER RESULTADOS <br/>COMO ESSE?</h2>
          <a href="https://wa.me/5517997437433" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '1.5rem', padding: '1.5rem 3rem' }}>
            AGENDAR CONSULTORIA
          </a>
        </div>
      </section>
    </div>
  );
}
