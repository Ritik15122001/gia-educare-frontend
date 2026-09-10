import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { useStudyLevels, useSection } from '../../hooks/useContent';

const DEFAULTS = { eyebrow: 'Study levels', title: 'We support every stage' };

export default function LevelsGrid() {
  const studyLevels = useStudyLevels();
  const section = useSection('courses.levels', DEFAULTS);

  return (
    <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <div className="grid cols-4">
          {studyLevels.map((level, i) => (
            <Reveal as="article" key={level.id || level.num} delay={i} className="card">
              <span className="card-num">{level.num}</span>
              <h3 className="h4">{level.title}</h3>
              <p>{level.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
