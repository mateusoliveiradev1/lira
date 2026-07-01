import './Marquee.css';

const items = [
  'ALTA CONVERSÃO',
  'DESIGN PREMIUM',
  'PERFORMANCE EXTREMA',
  'CÓDIGO SOB MEDIDA',
  'SEO DOMINANTE',
  'RESULTADOS REAIS',
];

export default function Marquee() {
  // Duplicate array for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((text, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-diamond">✦</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
