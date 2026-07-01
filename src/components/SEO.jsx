import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  image = 'https://liraconversao.com.br/og-banner.png', 
  url = 'https://liraconversao.com.br/',
  children
}) {
  const fullTitle = `${title} | LIRA. Studio`;

  return (
    <Helmet>
      {/* Padrão */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / WhatsApp / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Outros metadados (como Schema JSON-LD) */}
      {children}
    </Helmet>
  );
}
