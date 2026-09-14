import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import Pill from '../common/Pill';

// Destinations-page card: photo on the top half, the key facts on the bottom half.
export default function DestinationDetailCard({ destination, delay = 0 }) {
  const facts = (destination.facts || []).slice(0, 3);

  return (
    <Reveal as="article" delay={delay} className="dcard">
      <Link to={`/destinations/${destination.slug}`} className="dcard-media" style={{ background: destination.bg }} tabIndex={-1} aria-hidden="true">
        {destination.imageUrl && <img src={destination.imageUrl} alt="" loading="lazy" />}
        <span className="dcard-title">
          <span className="fl">{destination.flag}</span>
          <span className="dcard-name">{destination.name}</span>
        </span>
      </Link>
      <div className="body">
        <h3 className="sr-only">{destination.name}</h3>
        <p className="dcard-desc">{destination.description}</p>
        <dl className="dl">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="tags">
          {(destination.tags || []).slice(0, 3).map((t) => (
            <Pill variant="plain" key={t}>
              {t}
            </Pill>
          ))}
        </div>
        <Link to={`/destinations/${destination.slug}`} className="link-arrow link-arrow--gold dcard-more">
          <span>Study in {destination.name}</span>
          <span>→</span>
        </Link>
      </div>
    </Reveal>
  );
}
