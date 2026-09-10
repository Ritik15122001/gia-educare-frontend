import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { useProcessSteps, useSection } from '../../hooks/useContent';

const DEFAULTS = { eyebrow: 'The process', title: 'Five steps. Nine to twelve months.' };

export default function ProcessSteps() {
  const processSteps = useProcessSteps();
  const section = useSection('home.process', DEFAULTS);

  return (
    <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <div className="steps">
          {processSteps.map((step, i) => (
            <Reveal as="div" key={step.id || step.num} delay={i} className="step">
              <div className="dot">{step.num}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
