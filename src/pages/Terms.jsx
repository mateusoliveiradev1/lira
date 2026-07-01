import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const termosData = {
  title: 'TERMOS DE USO',
  lastUpdate: '15 de Março, 2026',
  sections: [
    {
      title: '01. Aceitação e Escopo',
      content: 'Ao contratar a LIRA., você concorda que o escopo do projeto se limita ao que está expressamente documentado no briefing inicial e contrato. Funcionalidades adicionais solicitadas após o início do desenvolvimento serão orçadas separadamente.'
    },
    {
      title: '02. Prazos e Colaboração',
      content: 'Nossa velocidade brutal de entrega (7-14 dias) depende exclusivamente do fornecimento pontual de todos os ativos (logos, acessos, textos) por parte do cliente. Atrasos na entrega de materiais resultarão em extensão proporcional do prazo final.'
    },
    {
      title: '03. Revisões e Refações',
      content: 'O design "Impeccable" segue nosso padrão de excelência. Projetos incluem até 2 (duas) rodadas de ajustes pontuais na fase de design. Refações completas de estrutura conceitual após a aprovação do wireframe não estão incluídas.'
    },
    {
      title: '04. Propriedade Intelectual',
      content: 'Após a quitação integral do projeto, todo o código-fonte, design e direitos de uso da Landing Page são transferidos integralmente para você. Nós retemos apenas o direito de exibir o projeto em nosso portfólio e cases de sucesso.'
    },
    {
      title: '05. Garantias de Performance',
      content: 'Garantimos notas superiores a 90+ no Google PageSpeed Insights e ausência de falhas técnicas. No entanto, não garantimos um número fixo de vendas ou leads, visto que conversão depende do seu tráfego, do seu produto e da força da sua oferta.'
    }
  ]
};

export default function Terms() {
  return (
    <motion.div 
      className="app-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container section" style={{ minHeight: '80vh', paddingTop: 'var(--space-8)' }}>
        <Link to="/" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--fg-muted)', marginBottom: 'var(--space-4)', textDecoration: 'none', transition: 'color 0.2s' }}>
          <ArrowLeft size={20} /> VOLTAR PARA HOME
        </Link>
        
        <div className="legal-hero" style={{ borderBottom: '1px solid var(--border-base)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 1, marginBottom: 'var(--space-2)' }}>{termosData.title}</h1>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Última atualização: {termosData.lastUpdate}
          </p>
        </div>

        <div className="legal-layout">
          <aside className="legal-sidebar">
            <div className="sticky-nav">
              <h3 style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Índice</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {termosData.sections.map((sec, idx) => (
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
            {termosData.sections.map((sec, idx) => (
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
