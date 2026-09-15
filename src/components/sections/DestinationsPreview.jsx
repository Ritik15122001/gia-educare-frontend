import Reveal from '../common/Reveal';
import Eyebrow from '../common/Eyebrow';
import LinkArrow from '../common/LinkArrow';
import DestinationCard from '../cards/DestinationCard';
import { useHomeDestinations, useSection } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: "Where you can go",
  title: "Where Your Study Abroad Journey Can Take You",
  lead: "Explore leading study destinations based on your course, budget, career goals, post-study opportunities and long-term plans. We help you choose on evidence, not trends.",
};

export default function DestinationsPreview() {
  const destinations = useHomeDestinations();
  const section = useSection('home.destinations', DEFAULTS);

  return (
    <div className="section" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal
          className="sec-head"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, maxWidth: 'none', flexWrap: 'wrap' }}
        >
          <div style={{ maxWidth: 600 }}>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="h2">{section.title}</h2>
            <p className="lead">{section.lead}</p>
          </div>
          <LinkArrow to="/destinations">All destinations</LinkArrow>
        </Reveal>

        {/* Four across once there are more than six, so eight cards fill two rows. */}
        <div className={`grid ${destinations.length > 6 ? 'cols-4' : 'cols-3'}`}>
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} delay={i % 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
