import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import Pill from '../common/Pill';

// Home-page country card: photo on the top half, copy on the bottom half.
export default function DestinationCard({ destination, delay = 0 }) {
  return (
    <Reveal as={Link} to={`/destinations/${destination.slug}`} delay={delay} className="dest">
      <div className="dest-media" style={{ background: destination.bg }}>
        {destination.imageUrl && <img src={destination.imageUrl} alt={`${destination.name}`} loading="lazy" />}
        <span className="flag" aria-hidden="true">{destination.flag}</span>
        {destination.tag && (
          <Pill variant="light" className="tagchip">
            {destination.tag}
          </Pill>
        )}
      </div>
      <div className="dest-body">
        <h3>{destination.name}</h3>
        <p>{destination.blurb}</p>
        <div className="meta">
          {(destination.meta || []).map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <span className="dest-cta">
          Explore {destination.name} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Reveal>
  );
}
