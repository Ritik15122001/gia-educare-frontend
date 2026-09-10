import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import Icon from '../common/Icon';
import { useValues, useSection } from '../../hooks/useContent';

const DEFAULTS = { eyebrow: 'What we hold to', title: "Four rules we don't bend" };

export default function ValuesGrid() {
  const values = useValues();
  const section = useSection('about.values', DEFAULTS);

  return (
    <div className="section" style={{ background: 'var(--ink)', color: '#fff' }}>
      <div className="wrap">
        <SectionHeader
          center
          eyebrow={section.eyebrow}
          title={<span style={{ color: '#fff' }}>{section.title}</span>}
        />
        <div className="grid cols-4 vgrid">
          {values.map((v, i) => (
            <Reveal as="article" key={v.id} delay={i} className="card">
              <div className="ico">
                <Icon name={v.icon} />
              </div>
              <h3 className="h4">{v.title}</h3>
              <p>{v.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
