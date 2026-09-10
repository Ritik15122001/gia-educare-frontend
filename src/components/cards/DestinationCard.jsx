import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import Pill from '../common/Pill';

export default function DestinationCard({ destination, delay = 0 }) {
  return (
    <Reveal as={Link} to="/destinations" delay={delay} className="dest">
      <div className="bg" style={{ background: destination.bg }}></div>
      <span className="flag">{destination.flag}</span>
      {destination.tag && (
        <Pill variant="light" className="tagchip">
          {destination.tag}
        </Pill>
      )}
      <h3>{destination.name}</h3>
      <p>{destination.blurb}</p>
      <div className="meta">
        {(destination.meta || []).map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </Reveal>
  );
}
