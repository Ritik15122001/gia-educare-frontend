import Pill from '../common/Pill';
import LinkArrow from '../common/LinkArrow';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

export default function CourseCard({ course }) {
  const openEnquiry = useOpenEnquiry();

  return (
    <article className="course rv in">
      <div className="ctop">
        <span className="cico">{course.icon}</span>
        <Pill>{course.badge}</Pill>
      </div>
      <h3>{course.title}</h3>
      <p className="desc">{course.description}</p>
      <div className="facts">
        <div>
          <span>Duration</span>
          <b>{course.duration}</b>
        </div>
        <div>
          <span>Level</span>
          <b>{course.level}</b>
        </div>
        <div>
          <span>Tuition / yr</span>
          <b>{course.tuition}</b>
        </div>
        <div>
          <span>Top picks</span>
          <b>{course.topPicks}</b>
        </div>
      </div>
      <div className="cfoot">
        <span className="tiny" style={{ color: 'var(--muted)' }}>
          {course.note}
        </span>
        <LinkArrow gold onClick={() => openEnquiry({ message: `Interested in: ${course.title}` }, 'full')}>
          Enquire
        </LinkArrow>
      </div>
    </article>
  );
}
