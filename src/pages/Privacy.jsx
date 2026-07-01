import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import SEO from '../components/SEO';

const privacidadeData = {
  title: 'POLÍTICA DE PRIVACIDADE',
  lastUpdate: '10 de Janeiro, 2026',
  sections: [
    {
      title: '01. Coleta de Dados',
      content: 'Quando você entra em contato para orçar um projeto, coletamos apenas informações essenciais para a negociação: seu nome, e-mail da empresa, telefone (WhatsApp) e URL do site atual. Não há coleta oculta de dados sensíveis.'
    },
    {
      title: '02. Uso das Informações',
      content: 'Seus dados são usados estritamente para (a) formular propostas comerciais personalizadas, (b) conduzir auditorias no seu site atual, e (c) comunicação direta sobre o andamento do seu projeto.'
    },
    {
      title: '03. Ferramentas de Terceiros',
      content: 'Nosso site utiliza infraestrutura de ponta (Vercel, Neon) e ferramentas de analytics padrão da indústria (como Google Analytics e Pixels). Estas ferramentas podem usar cookies para entender padrões de tráfego, sem identificar você pessoalmente.'
    },
    {
      title: '04. Segurança Extrema',
      content: 'Toda comunicação entre seu navegador e nosso servidor é criptografada. Os dados dos nossos clientes são mantidos em bancos de dados seguros, inacessíveis ao público.'
    },
    {
      title: '05. Seus Direitos',
      content: 'A qualquer momento, você pode solicitar a exclusão de todos os seus dados comerciais da nossa base enviando um e-mail para contato@liraconversao.com.br.'
    }
  ]
};

export default function Privacy() {
  return (
    <motion.div 
      className="app-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <SEO 
        title="Política de Privacidade"
        description="Como tratamos seus dados na Lira Studio."
        url="https://liraconversao.com.br/privacidade"
      />
      <CustomCursor />
      <div className="container section" style={{ minHeight: '80vh', paddingTop: 'var(--space-8)' }}>
        <Link to="/" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--fg-muted)', marginBottom: 'var(--space-4)', textDecoration: 'none', transition: 'color 0.2s' }}>
          <ArrowLeft size={20} /> VOLTAR PARA HOME
        </Link>
        
        <div className="legal-hero" style={{ borderBottom: '1px solid var(--border-base)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 1, marginBottom: 'var(--space-2)' }}>{privacidadeData.title}</h1>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Última atualização: {privacidadeData.lastUpdate}
          </p>
        </div>

        <div className="legal-layout">
          <aside className="legal-sidebar">
            <div className="sticky-nav">
              <h3 style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Índice</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {privacidadeData.sections.map((sec, idx) => (
                  <li key={idx}>
                    <a href={`#section-${idx}`} style={{ color: 'var(--fg-base)', textDecoration: 'none', fontSize: '1.125rem', fontWeight: 500, transition: 'color 0.2s' }} className="legal-nav-link">
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="legal-content">
            {privacidadeData.sections.map((sec, idx) => (
              <section id={`section-${idx}`} key={idx} className="legal-section" style={{ marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--fg-base)', marginBottom: 'var(--space-3)' }}>{sec.title}</h2>
                <p style={{ color: 'var(--fg-muted)', fontSize: '1.125rem', lineHeight: 1.8 }}>
                  {sec.content}
                </p>
              </section>
            ))}
            
            <div className="legal-contact" style={{ marginTop: 'var(--space-7)', padding: 'var(--space-5)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-base)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>Dúvidas?</h3>
              <p style={{ color: 'var(--fg-muted)', marginBottom: 'var(--space-4)' }}>Se você tem qualquer questionamento sobre nossos documentos legais, fale com nosso time diretamente.</p>
              <a href="mailto:legal@liraconversao.com.br" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>FALAR COM SUPORTE</a>
            </div>
          </main>
        </div>
      </div>
    </motion.div>
  );
}
