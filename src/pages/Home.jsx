import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import MagneticButton from '../components/MagneticButton';
import TextReveal from '../components/TextReveal';
import SEO from '../components/SEO';
import ExitIntentModal from '../components/ExitIntentModal';
import Marquee from '../components/Marquee';
import LiveClock from '../components/LiveClock';
import TiltCard from '../components/TiltCard';
import CodeTooltip from '../components/CodeTooltip';
import MediaTooltip from '../components/MediaTooltip';

const testimonials = [
  { quote: "A Lira Studio não entregou apenas um site bonito, eles construíram uma verdadeira impressora de dinheiro. Nosso custo por lead caiu pela metade na primeira semana.", author: "João P.", role: "CEO, TechFlow" },
  { quote: "Eu estava cansada de templates genéricos do WordPress que quebravam toda hora. A performance e o design brutalista que criaram nos colocou em outro nível de mercado.", author: "Marina S.", role: "Founder, Elevate" },
  { quote: "Investimento que se pagou no primeiro mês. A taxa de conversão saltou de 1.2% para 4.8%. É absurdo o que um design focado em UX pode fazer.", author: "Carlos M.", role: "Diretor de Marketing" },
];

const faqs = [
  { q: "Por que cobrar mais caro que alguém no Wix ou WordPress?", a: "Páginas feitas em plataformas prontas são pesadas, lentas e cheias de código inútil. Nós codificamos do zero. Seu site carregará em milissegundos, ranqueará melhor no Google e converterá muito mais. Você não está pagando por um site, está pagando por uma máquina de conversão." },
  { q: "Em quanto tempo o projeto fica pronto?", a: "Nosso processo é brutalmente eficiente. Do briefing à entrega final, o prazo médio é de 7 a 14 dias. Sem enrolação." },
  { q: "Vocês fazem a manutenção depois?", a: "Nossos sites são construídos para não quebrar. Mas sim, oferecemos um plano de suporte contínuo exclusivo para nossos clientes caso queiram atualizações de copy ou testes A/B no futuro." }
];

const processSteps = [
  { title: "Auditoria e Estratégia", desc: "Analisamos a fundo o seu produto, seus concorrentes e a dor do seu cliente. Criamos o copy exato para aniquilar as objeções." },
  { title: "Design 'Awwwards'", desc: "Criamos uma interface agressiva, com tipografia brutalista, paletas focadas em CTA e animações que prendem a atenção do lead na hora." },
  { title: "Código de Elite", desc: "Sem builders lentos. Codificamos à mão para garantir nota 100 no Google PageSpeed. Um site que abre antes do cliente piscar." }
];


function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const num = String(index + 1).padStart(2, '0');
  
  return (
    <motion.div 
      className={`faq-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="faq-question" onClick={() => { setIsOpen(!isOpen); }} role="button" tabIndex={0} aria-expanded={isOpen} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(!isOpen); } }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <span className="faq-index">{num} //</span>
          <h3>{faq.q}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}
        >
          <Plus color={isOpen ? "var(--accent-primary)" : "var(--fg-base)"} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: "1rem" }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="faq-answer"
          >
            <p>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(!('ontouchstart' in window) && window.innerWidth > 1024);
  }, []);
  
  const imgX = useMotionValue(-1000);
  const imgY = useMotionValue(-1000);
  const imgSpringConfig = { damping: 30, stiffness: 400 };
  const imgXSpring = useSpring(imgX, imgSpringConfig);
  const imgYSpring = useSpring(imgY, imgSpringConfig);

  const handleMouseMove = (e) => {
    if (!isDesktop) return;
    imgX.set(e.clientX);
    imgY.set(e.clientY);
  };

  // Hero Parallax Fade
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div className="app-wrapper" onMouseMove={isDesktop ? handleMouseMove : undefined}>
      <SEO 
        title="Domine o Seu Mercado"
        description="Chega de templates genéricos. Nós criamos Landing Pages de ultra conversão com foco implacável em lucro e design de classe mundial."
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Lira Studio",
            "url": "https://liraconversao.com.br",
            "logo": "https://liraconversao.com.br/favicon.png",
            "image": "https://liraconversao.com.br/og-banner.png",
            "description": "Transformamos cliques em lucro com Landing Pages de ultra conversão, design de elite e performance extrema.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-17-99743-7433",
              "contactType": "customer service"
            },
            "priceRange": "$$$"
          })}
        </script>
      </SEO>
      <ExitIntentModal />
      <LiveClock />

      {isDesktop && (
        <motion.div 
          className="floating-image"
          style={{
            left: imgXSpring,
            top: imgYSpring,
            translateX: "-50%",
            translateY: "-50%",
            opacity: hoveredProject ? 1 : 0,
            scale: hoveredProject ? 1 : 0.8
          }}
        >
          {hoveredProject && <img src={hoveredProject.img} alt={`Preview do case ${hoveredProject.name}`} loading="eager" decoding="async" />}
        </motion.div>
      )}

      <section className="hero" ref={heroRef}>
        <motion.div
          className="container"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div 
            className="hero-grid"
            initial="hidden" animate="show"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h1 className="hero-title" variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
              SEU SITE ESTÁ <br/>
              <span className="text-accent">QUEIMANDO</span> DINHEIRO.
            </motion.h1>
            <motion.p className="hero-subtitle" variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
              Chega de templates genéricos e tráfego perdido. Nós criamos <CodeTooltip snippet={'<LandingPage\n  conversion={99.9}\n  design="awwwards"\n  performance={100}\n/>'} language="jsx">Landing Pages</CodeTooltip> de ultra conversão com foco implacável em <MediaTooltip mediaUrl={projects[0].img} width={300} height={200}>lucro</MediaTooltip> e <MediaTooltip mediaUrl={projects[1]?.img || projects[0].img} width={350} height={200}>design de classe mundial</MediaTooltip>.
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
              <MagneticButton>
                <a href="#contato" className="btn btn-primary" aria-label="Agendar consultoria - Estancar o sangramento">
                  ESTANCAR O SANGRAMENTO <ArrowUpRight size={24} style={{ marginLeft: '12px' }} aria-hidden="true" />
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Ticker */}
      <Marquee />

      <section className="stats-ribbon container">
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Performance Customizada</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">0</span>
          <span className="stat-label">Templates Usados</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Máquina de Vendas</span>
        </div>
      </section>

      <section className="section process container">
        <div className="section-header">
          <TextReveal text={["COMO", "FUNCIONA"]} className="h2-reveal" />
        </div>
        <div className="process-grid">
          {processSteps.map((step, idx) => (
            <motion.div 
              className="process-step" 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <div className="process-step-bg-num" aria-hidden="true">0{idx + 1}</div>
              <div className="process-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projetos" className="section showcase">
        <div className="container">
          <div className="section-header">
            <TextReveal text={["TRABALHOS", "RECENTES"]} className="h2-reveal" />
          </div>
          
          <div className="project-list">
            {projects.map((project, idx) => (
              <Link 
                to={`/projeto/${project.slug}`}
                className="project-row" 
                key={idx}
                onMouseEnter={() => { setHoveredProject(project); }}
                onMouseLeave={() => setHoveredProject(null)}
              >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>
                  {project.name}
                </h3>
                {project.badge && (
                  <span style={{ 
                    backgroundColor: 'var(--accent-primary)', 
                    color: '#000', 
                    fontSize: '0.85rem', 
                    padding: '4px 12px', 
                    fontWeight: '800', 
                    borderRadius: '999px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    marginTop: '4px'
                  }}>
                    {project.badge}
                  </span>
                )}
              </div>
                <div className="project-category">{project.category} <ArrowUpRight size={20} style={{ verticalAlign: 'middle', marginLeft: '8px' }} aria-hidden="true" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials container">
        <div className="section-header">
          <TextReveal text={["O QUE DIZEM", "OS NÚMEROS"]} className="h2-reveal" />
        </div>
        <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
          {testimonials.map((t, i) => (
            <TiltCard 
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-4)', border: '1px solid var(--border-base)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <p style={{ fontSize: '1.125rem', color: 'var(--fg-base)', fontStyle: 'italic', lineHeight: 1.6 }}>"{t.quote}"</p>
              <div>
                <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t.author}</p>
                <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{t.role}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="section faq container">
        <div className="section-header">
          <TextReveal text={["PERGUNTAS", "FREQUENTES"]} className="h2-reveal" />
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => <FAQItem key={i} faq={f} index={i} />)}
        </div>
      </section>

      <section id="contato" className="cta-section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            VAMOS DOMINAR<br/>O SEU MERCADO.
          </motion.h2>
          <MagneticButton>
            <a href="https://wa.me/5517997437433" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '1.5rem', padding: '1.5rem 3rem' }}>
              FALAR NO WHATSAPP
            </a>
          </MagneticButton>
          <div className="scarcity">
            <span className="pulse-dot"></span> Apenas 2 vagas na agenda este mês
          </div>
        </div>
      </section>
    </div>
  );
}
