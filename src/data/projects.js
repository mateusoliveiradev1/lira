export const projects = [
  { 
    slug: 'validade-zero',
    name: 'Validade Zero', 
    url: null,
    category: 'App Mobile',
    badge: 'EM BREVE',
    img: '/images/vz-web.webp',
    gallery: ['/images/vz-web.webp', '/images/vz-mobile-1.webp', '/images/vz-mobile-2.webp'],
    stack: ['React Native', 'Node.js', 'API REST', 'Push Notifications'],
    challenge: 'Supermercados e mercados perdem milhares de reais por mês com produtos vencidos na área de venda. O controle é feito em planilhas ou papel, as verificações são manuais e inconsistentes, e quando o fiscal encontra um produto vencido na gôndola, o prejuízo já está feito — tanto financeiro quanto de reputação.',
    solution: 'Desenvolvi o Validade Zero — um app mobile com leitura de código de barras para cadastro instantâneo de produtos, alertas inteligentes por proximidade de vencimento e notificações push automáticas para a equipe de reposição. Um painel admin web dá visão geral ao gerente com relatórios de perdas e ações preventivas. Zero produto vencido, zero multa, zero desperdício.',
    metrics: [
      { label: 'Tipo', value: 'Produto Próprio' },
      { label: 'Fase', value: 'Em Desenvolvimento' },
      { label: 'Plataforma', value: 'Mobile + API + Admin' }
    ]
  },
  { 
    slug: 'frescari',
    name: 'Frescari', 
    url: 'https://frescari.com.br/', 
    category: 'Marketplace B2B', 
    img: '/images/frescari.webp',
    stack: ['Next.js', 'tRPC', 'Neon', 'Tailwind CSS'],
    challenge: 'Restaurantes e varejos compram hortifruti pelo WhatsApp. O produtor manda uma lista em PDF, o comprador responde com "quero 3 caixas de tomate". Zero rastreabilidade, zero catálogo visual, zero agilidade. Eu trabalho perto desse mercado e vi que ninguém tinha resolvido isso de forma digital e acessível.',
    solution: 'Desenhei e codifiquei o Frescari do zero — um marketplace B2B com catálogo vivo atualizado pelo produtor, compra por kg/caixa/unidade e raio local para conectar quem planta com quem cozinha. A interface foi pensada para quem tem pressa: leitura rápida, pedido em poucos toques, sem cadastro burocrático.',
    metrics: [
      { label: 'Tipo', value: 'Produto Próprio' },
      { label: 'Fase', value: 'Early Traction' },
      { label: 'Modelo', value: 'B2B SaaS' }
    ]
  },
  { 
    slug: 'propfreela',
    name: 'Propfreela', 
    url: 'https://www.propfreela.com.br/', 
    category: 'SaaS', 
    img: '/images/propfreela.webp',
    stack: ['Next.js', 'IA Generativa', 'Neon', 'Tailwind CSS'],
    challenge: 'Eu cansei de perder projeto porque minha proposta era um Google Docs mal formatado. O cliente olhava aquilo e pensava "esse cara não é profissional". Pesquisei ferramentas no mercado e todas eram caras, complexas ou em inglês. Então construí a minha.',
    solution: 'O Propfreela gera propostas comerciais em PDF com visual premium em menos de 2 minutos. O freelancer preenche o briefing e a IA gera o escopo completo automaticamente — serviços, entregáveis e estimativas. O cliente recebe um link de aprovação e assina digitalmente. Sem Word, sem Canva, sem gambiarras.',
    metrics: [
      { label: 'Geração de Proposta', value: '< 2 min' },
      { label: 'Tipo', value: 'Produto Próprio' },
      { label: 'Fase', value: 'Early Traction' }
    ]
  },
  { 
    slug: 'kl-vistorias',
    name: 'KL Vistorias', 
    url: 'https://www.klvistorias.com.br/', 
    category: 'Serviços', 
    img: '/images/klvistorias.webp',
    stack: ['Next.js', 'Neon', 'Tailwind CSS'],
    challenge: 'Vistoria veicular é um serviço que depende de confiança absoluta. O cliente está prestes a comprar um carro e precisa ter certeza de que não está levando um veículo batido ou adulterado. A KL Vistorias precisava de um site que transmitisse essa autoridade técnica desde o primeiro segundo — e que transformasse visitas em agendamentos reais.',
    solution: 'Construí uma landing page em dark mode com estética automotiva de alto padrão. O foco foi colocar o checklist técnico visível logo de cara, integrar o botão de WhatsApp como funil principal com rastreamento de cliques, e criar páginas SEO para cada cidade de atendimento na região de Goiânia.',
    metrics: [
      { label: 'Taxa de Conversão', value: '3.85%' },
      { label: 'Cliques no WhatsApp', value: '12' },
      { label: 'Eventos Rastreados', value: '81' }
    ]
  },
  { 
    slug: 'queue',
    name: 'Queue', 
    url: 'https://queue-2.vercel.app/', 
    category: 'App Web', 
    img: '/images/queue.webp',
    stack: ['Next.js', 'Neon', 'Tailwind CSS'],
    challenge: 'Jogar coop com um amigo deveria ser simples: escolher o próximo jogo, sortear, jogar. Mas a gente sempre ficava empacado na mesma discussão: "qual jogo agora?". Queria algo funcional, rápido e com a cara de quem joga.',
    solution: 'Criei o Queue/2 — um app web para duplas organizarem seu backlog de jogos coop, sortearem o próximo e registrarem cada zerada como memória compartilhada. Interface escura com acento neon, tipografia pesada e zero fricção: criar conta, montar lista, sortear.',
    metrics: [
      { label: 'Tipo', value: 'Produto Próprio' },
      { label: 'Funcionalidade Core', value: 'Sortear + Backlog' },
      { label: 'Plataforma', value: 'Web App' }
    ]
  },
  { 
    slug: 'ai-mindset',
    name: 'AI Mindset', 
    url: 'https://www.aimindset.com.br/', 
    category: 'Portal de Conteúdo', 
    img: '/images/aimindset.webp',
    stack: ['Next.js', 'Neon', 'Tailwind CSS'],
    challenge: 'O mundo da inteligência artificial está explodindo, mas a maioria do conteúdo em português é raso ou copiado do ChatGPT. Faltava um portal com curadoria real, visual futurista e que fizesse o leitor sentir que está à frente da curva.',
    solution: 'Desenvolvi o AI Mindset — um portal de conteúdo sobre IA, produtividade e tecnologia emergente. Design com gradientes escuros e toques de roxo/verde que remetem à estética tech. Estrutura pensada para SEO com categorias claras, newsletter integrada e navegação que incentiva a exploração.',
    metrics: [
      { label: 'Leitores', value: '100+' },
      { label: 'Tipo', value: 'Produto Próprio' },
      { label: 'Foco', value: 'SEO + Newsletter' }
    ]
  },
  { 
    slug: 'resenha-web',
    name: 'Resenha Web', 
    url: 'https://resenha-web.vercel.app/', 
    category: 'Plataforma Esportiva', 
    img: '/images/resenha.webp',
    stack: ['Next.js', 'Neon', 'Tailwind CSS'],
    challenge: 'Clubes de futebol amador e semi-profissional não têm presença digital decente. Tudo fica perdido em grupos de WhatsApp. Faltava uma plataforma onde o clube tivesse sua identidade visual, seu calendário e sua memória registrada de forma organizada.',
    solution: 'Construí o Resenha Web — um portal esportivo onde cada clube tem seu espaço: diário do clube, notícias, memória visual e calendário. Interface escura inspirada em portais esportivos internacionais, com a identidade do clube (escudo, cores) integrada nativamente na experiência.',
    metrics: [
      { label: 'Tipo', value: 'Produto Próprio' },
      { label: 'Módulos', value: 'Diário + Galeria' },
      { label: 'Plataforma', value: 'Web App' }
    ]
  }
];
