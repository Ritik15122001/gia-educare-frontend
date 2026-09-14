import { Link } from 'react-router-dom';
import MegaMenu, { PanelArticles, PanelLinks } from './MegaMenu';
import { useExams, usePosts } from '../../../hooks/useContent';

const GLANCE = /score scale|fee|validity|duration/i;

export default function ExamsMenu({ id, onNavigate }) {
  const exams = useExams();
  const posts = usePosts();

  return (
    <MegaMenu
      id={id}
      onNavigate={onNavigate}
      doubts={{
        key: 'exam-doubts',
        to: '/blog?category=exam-doubts',
        label: 'Beginner Doubts',
        kicker: 'Not sure where to start?',
        title: 'Questions students ask about exams',
        posts: posts.filter((p) => p.category === 'exam-doubts'),
        allLabel: 'All exam doubts',
      }}
      items={exams.map((e) => ({ key: e.slug, to: `/exams/${e.slug}`, label: e.name, exam: e }))}
      footer={{ to: '/exams#colleges', label: 'Find Colleges By Exam' }}
      renderPanel={({ exam }) => (
        <div className="mega-country">
          <div>
            <p className="mega-kicker">{exam.kind || 'Exam'}</p>
            <h3 className="mega-title">
              {exam.name}
              {exam.fullName && exam.fullName !== exam.name && <span className="mega-title-sub">{exam.fullName}</span>}
            </h3>
            <div className="mega-cols">
              <PanelLinks
                title="Explore"
                onNavigate={onNavigate}
                links={[
                  [`/exams/${exam.slug}`, `About the ${exam.name}`],
                  [`/exams/${exam.slug}#facts`, 'Pattern, scores & fees'],
                  [`/exams/${exam.slug}#accepted`, `Where ${exam.name} is accepted`],
                  [`/exams/${exam.slug}#colleges`, `Find colleges by ${exam.name} score`],
                ]}
              />
              <PanelArticles
                onNavigate={onNavigate}
                posts={posts.filter((p) => p.exam === exam.slug)}
                empty={`No ${exam.name} articles yet — a counsellor can answer your questions directly.`}
              />
            </div>
          </div>
          <Link to={`/exams/${exam.slug}#facts`} className="mega-glance" onClick={onNavigate} tabIndex={-1} aria-hidden="true">
            <b>{exam.name} at a glance</b>
            <dl>
              {(exam.facts || []).filter((f) => GLANCE.test(f.label)).slice(0, 4).map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            {exam.summary && <span>{exam.summary}</span>}
          </Link>
        </div>
      )}
    />
  );
}
