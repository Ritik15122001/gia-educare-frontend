import Button from '../common/Button';
import Pill from '../common/Pill';
import Tick from '../common/Tick';
import Chk from '../common/Chk';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { useSection, useStats, splitAccent } from '../../hooks/useContent';

const TEASER_ITEMS = [
  { title: 'Profile evaluation', description: 'Where you stand today, honestly.' },
  { title: 'Country & course shortlist', description: 'Three to five options that fit your budget and marks.' },
  { title: 'Next steps mapped out', description: "Tests, timeline and documents you'll need." },
];

const DEFAULTS = {
  eyebrow: '🌍 25+ countries · 850+ partner universities',
  title: 'Your degree abroad, |guided end to end.',
  lead: 'From shortlisting the right university to stamping your visa — GIA Educare gives you one counsellor, one plan and zero guesswork. Start with a free profile evaluation.',
  ctaLabel: 'Get free counselling',
};

export default function Hero() {
  const openEnquiry = useOpenEnquiry();
  const section = useSection('home.hero', DEFAULTS);
  const stats = useStats();
  const { before, accent } = splitAccent(section.title);

  // The hero's trust row mirrors the first three stats so it stays in sync.
  const trust = stats.slice(0, 3);

  return (
    <div className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <Pill variant="light">{section.eyebrow}</Pill>
            <h1 className="display" style={{ marginTop: 20 }}>
              {before}
              {accent && (
                <>
                  <br />
                  <em>{accent}</em>
                </>
              )}
            </h1>
            <p className="lead">{section.lead}</p>
            <div className="hero-actions">
              <Button size="lg" arrow onClick={() => openEnquiry()}>
                {section.ctaLabel || 'Get free counselling'}
              </Button>
              <Button to="/destinations" variant="ghost" size="lg">
                Explore destinations
              </Button>
            </div>
            <div className="hero-trust">
              {trust.map((stat) => (
                <div className="t" key={stat.id}>
                  <Tick />
                  <b>
                    {stat.value.toLocaleString('en-IN')}
                    {stat.suffix}
                  </b>{' '}
                  {stat.label.toLowerCase()}
                </div>
              ))}
            </div>
          </div>

          <div className="enq enq--onDark">
            <span className="enq-badge">100% free</span>
            <div className="enq-head">
              <h3>Book your free counselling call</h3>
              <p>Takes 40 seconds to request. A senior counsellor replies within one working day.</p>
            </div>
            <ul className="checklist" style={{ marginTop: 4 }}>
              {TEASER_ITEMS.map((item) => (
                <li key={item.title}>
                  <Chk />
                  <div>
                    <b>{item.title}</b>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="enq-foot">
              <Button block size="lg" arrow onClick={() => openEnquiry()}>
                Request my free callback
              </Button>
              <p className="enq-note">🔒 We never sell your data or share it with universities without your consent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
