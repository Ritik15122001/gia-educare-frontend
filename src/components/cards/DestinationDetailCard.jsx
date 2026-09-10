import Reveal from '../common/Reveal';
import Pill from '../common/Pill';

export default function DestinationDetailCard({ destination, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="dcard">
      <div className="top" style={{ background: destination.bg }}>
        <span className="fl">{destination.flag}</span>
        <h3>{destination.name}</h3>
      </div>
      <div className="body">
        <p>{destination.description}</p>
        <dl className="dl">
          {(destination.facts || []).map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="tags">
          {(destination.tags || []).map((t) => (
            <Pill variant="plain" key={t}>
              {t}
            </Pill>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
