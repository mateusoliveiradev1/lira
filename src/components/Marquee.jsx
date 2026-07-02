import './Marquee.css';

const marqueeItems = [
  "DESIGN DE ELITE",
  "ULTRA CONVERSÃO",
  "UX/UI",
  "VENDAS 24/7",
  "PERFORMANCE ABSURDA",
  "LIRA STUDIO"
];

export default function Marquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {[...Array(3)].map((_, index) => (
          <span key={index} style={{ display: 'flex' }}>
            {marqueeItems.map((item, i) => (
              <span className="marquee-item" key={i}>
                <span className="marquee-diamond">✦</span>
                <span className="marquee-text">{item}</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
