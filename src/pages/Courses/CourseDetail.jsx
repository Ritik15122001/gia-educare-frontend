import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../../components/common/Reveal';
import Pill from '../../components/common/Pill';
import Button from '../../components/common/Button';
import Eyebrow from '../../components/common/Eyebrow';
import Chk from '../../components/common/Chk';
import Accordion from '../../components/common/Accordion';
import CourseCard from '../../components/cards/CourseCard';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useCourses, useCourseCategories, useSettings } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

/** A block only renders when the admin has filled it in. */
function Block({ title, lead, children }) {
  return (
    <div className="section section--tight" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="wrap" style={{ maxWidth: 900 }}>
        <h2 className="h3" style={{ marginBottom: lead ? 8 : 20 }}>{title}</h2>
        {lead && <p className="lead" style={{ marginBottom: 20 }}>{lead}</p>}
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="checklist" style={{ marginTop: 0 }}>
      {items.map((item) => (
        <li key={item}>
          <Chk />
          <div>
            <b style={{ fontWeight: 600 }}>{item}</b>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const courses = useCourses();
  const categories = useCourseCategories();
  const settings = useSettings();
  const openEnquiry = useOpenEnquiry();

  const course = courses.find((c) => c.slug === slug);

  useEffect(() => {
    if (course) document.title = `${course.title} · ${settings.brand}`;
  }, [course, settings.brand]);

  if (!course) {
    return (
      <div className="section">
        <div className="wrap center" style={{ maxWidth: 620 }}>
          <h1 className="h2">We don't have a page for that course yet.</h1>
          <p className="lead" style={{ marginTop: 14 }}>
            It may have been renamed or taken down. Browse everything we support instead.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 26 }}>
            <Button to="/courses">All courses</Button>
          </div>
        </div>
      </div>
    );
  }

  const enquire = () => openEnquiry({ message: `Interested in: ${course.title}` }, 'full');
  const categoryLabel = categories.find((c) => c.key === course.category)?.label;
  const related = courses.filter((c) => c.category === course.category && c.slug !== course.slug).slice(0, 3);

  const facts = [
    ['Duration', course.duration],
    ['Level', course.level],
    ['Tuition / year', course.tuition],
    ['Top destinations', course.topPicks],
  ].filter(([, v]) => v);

  return (
    <>
      {/* ---------- header ---------- */}
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link to="/">Home</Link>
            <i>/</i>
            <Link to="/courses">Courses</Link>
            <i>/</i>
            <span>{course.title}</span>
          </div>

          <div className="row-gap" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
            {course.badge && <Pill variant="light">{course.badge}</Pill>}
            {categoryLabel && <Pill variant="light">{categoryLabel}</Pill>}
          </div>

          <h1 className="display" style={{ maxWidth: '20ch' }}>
            <span style={{ marginRight: 12 }}>{course.icon}</span>
            {course.title}
          </h1>

          <p className="lead">{course.description}</p>

          <div className="hero-actions">
            <Button onClick={enquire}>Enquiry</Button>
            <Button to="/contact" variant="ghost">Talk to a counsellor</Button>
          </div>

          {facts.length > 0 && (
            <div className="hero-trust">
              {facts.map(([label, value]) => (
                <div className="t" key={label}>
                  <span style={{ opacity: 0.7 }}>{label}:</span>&nbsp;<b>{value}</b>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {course.imageUrl && (
        <div className="wrap" style={{ marginTop: -28, position: 'relative', zIndex: 3 }}>
          <img
            src={course.imageUrl}
            alt={course.title}
            style={{ width: '100%', height: 'clamp(180px,26vw,330px)', objectFit: 'cover', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-2)' }}
          />
        </div>
      )}

      {/* ---------- overview ---------- */}
      {(course.overview || course.highlights?.length > 0) && (
        <div className="section section--tight">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <Reveal>
              <Eyebrow>About this program</Eyebrow>
              {course.overview
                ? course.overview.split('\n').filter(Boolean).map((para, i) => (
                    <p className="lead" key={i} style={{ marginTop: i ? 14 : 0 }}>{para}</p>
                  ))
                : <p className="lead">{course.description}</p>}

              {course.highlights?.length > 0 && (
                <div className="row-gap" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
                  {course.highlights.map((h) => <Pill key={h}>{h}</Pill>)}
                </div>
              )}
            </Reveal>
          </div>
        </div>
      )}

      {/* ---------- curriculum ---------- */}
      {course.curriculum?.length > 0 && (
        <Block title="What you will study">
          <div className="grid cols-2">
            {course.curriculum.map((mod, i) => (
              <Reveal as="article" key={mod.label} delay={i % 2} className="card">
                <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h4">{mod.label}</h3>
                <p>{mod.value}</p>
              </Reveal>
            ))}
          </div>
        </Block>
      )}

      {/* ---------- eligibility + outcomes ---------- */}
      {(course.eligibility?.length > 0 || course.careerOutcomes?.length > 0) && (
        <Block title="Who it suits and where it leads">
          <div className="split" style={{ alignItems: 'start', gap: 'clamp(24px,4vw,48px)' }}>
            {course.eligibility?.length > 0 && (
              <Reveal>
                <Eyebrow>Eligibility</Eyebrow>
                <BulletList items={course.eligibility} />
              </Reveal>
            )}
            {course.careerOutcomes?.length > 0 && (
              <Reveal delay={2}>
                <Eyebrow>Career outcomes</Eyebrow>
                <div className="row-gap" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {course.careerOutcomes.map((role) => <Pill variant="plain" key={role}>{role}</Pill>)}
                </div>
              </Reveal>
            )}
          </div>
        </Block>
      )}

      {/* ---------- fees ---------- */}
      {course.feeBreakdown?.length > 0 && (
        <Block title="Fees & funding" lead="Indicative figures — we confirm live numbers for your shortlist on the call.">
          <Reveal className="tbl-wrap">
            <table className="cmp" style={{ minWidth: 0 }}>
              <tbody>
                {course.feeBreakdown.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Block>
      )}

      {/* ---------- universities ---------- */}
      {course.universities?.length > 0 && (
        <Block title="Universities we place students into">
          <div className="row-gap" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {course.universities.map((u) => <Pill variant="plain" key={u}>{u}</Pill>)}
          </div>
        </Block>
      )}

      {/* ---------- course FAQs ---------- */}
      {course.faqs?.length > 0 && (
        <Block title="Questions about this program">
          <Reveal>
            <Accordion items={course.faqs.map((f, i) => ({ id: `${course.slug}-faq-${i}`, q: f.label, a: f.value }))} />
          </Reveal>
        </Block>
      )}

      {/* ---------- related ---------- */}
      {related.length > 0 && (
        <Block title="Similar programs">
          <div className="grid courses-grid">
            {related.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </Block>
      )}

      <EnquiryBand
        eyebrow="Next step"
        title={`Ask us about ${course.title}`}
        lead="Send your marks and budget and a counsellor will come back with the universities you can realistically get into for this program."
        formVariant="full"
        prefill={{ message: `Interested in: ${course.title}` }}
        ctaTitle="Get my shortlist"
        ctaLabel="Send my details"
        items={[
          { bold: 'Delivered in 48 hours', text: 'as a shareable PDF.' },
          { bold: 'Scholarship column included', text: 'for every university listed.' },
          { bold: 'No test scores yet? Fine.', text: 'We shortlist on predicted bands.' },
        ]}
      />
    </>
  );
}
