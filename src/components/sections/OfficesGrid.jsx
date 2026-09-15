import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { useSettings, useSection } from '../../hooks/useContent';

const DEFAULTS = { eyebrow: 'Walk in', title: 'Three offices, one standard' };

export default function OfficesGrid() {
  const settings = useSettings();
  const section = useSection('contact.offices', DEFAULTS);
  const offices = settings.offices || [];

  if (!offices.length) return null;

  return (
    <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        {/* A single office sits centred rather than alone in a three-column row. */}
        <div className={`grid ${offices.length === 1 ? 'offices-single' : offices.length === 2 ? 'cols-2' : 'cols-3'}`}>
          {offices.map((office, i) => (
            <Reveal as="article" key={office.id || office.name} delay={i} className="card">
              <h3 className="h4">{office.name}</h3>
              <p>
                {office.address}
                <br />
                <br />
                <b style={{ color: 'var(--ink)' }}>{office.phone}</b>
                <br />
                {office.hours || 'Mon–Sat · 10am–7pm'}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
