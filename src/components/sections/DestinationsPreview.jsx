import Reveal from '../common/Reveal';
import Eyebrow from '../common/Eyebrow';
import LinkArrow from '../common/LinkArrow';
import DestinationCard from '../cards/DestinationCard';
import { useHomeDestinations, useSection } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: 'Where you can go',
  title: 'Six destinations our students pick most',
  lead: 'Each one has a different sweet spot — cost, duration, work rights or PR pathway. We help you pick on evidence, not on trends.',
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

        <div className="grid cols-3">
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} delay={i % 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
