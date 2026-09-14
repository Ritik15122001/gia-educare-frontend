import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import Pill from '../common/Pill';

const GLANCE = /score scale|fee/i;

export default function ExamCard({ exam, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="exam-card">
      <div className="exam-card-top">
        <span className="exam-name">{exam.name}</span>
        {exam.kind && <Pill variant="plain">{exam.kind}</Pill>}
      </div>
      {exam.fullName && exam.fullName !== exam.name && <p className="exam-full">{exam.fullName}</p>}
      <p className="exam-summary">{exam.summary}</p>
      <dl className="dl">
        {(exam.facts || []).filter((f) => GLANCE.test(f.label)).map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      <Link to={`/exams/${exam.slug}`} className="link-arrow link-arrow--gold exam-more">
        <span>Explore {exam.name}</span>
        <span>→</span>
      </Link>
    </Reveal>
  );
}
