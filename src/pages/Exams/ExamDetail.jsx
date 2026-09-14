import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../../components/common/Reveal';
import Pill from '../../components/common/Pill';
import Button from '../../components/common/Button';
import Eyebrow from '../../components/common/Eyebrow';
import SectionHeader from '../../components/common/SectionHeader';
import ExamCard from '../../components/cards/ExamCard';
import PostCard from '../../components/cards/PostCard';
import CollegeFinder from '../../components/sections/CollegeFinder';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useDestinations, useExams, usePosts, useSettings } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

export default function ExamDetail() {
  const { slug } = useParams();
  const exams = useExams();
  const posts = usePosts();
  const destinations = useDestinations();
  const settings = useSettings();
  const openEnquiry = useOpenEnquiry();

  const exam = exams.find((e) => e.slug === slug);

  useEffect(() => {
    document.title = exam ? `${exam.name} exam · ${settings.brand}` : `Exam not found · ${settings.brand}`;
  }, [exam, settings.brand]);

  if (!exam) {
    return (
      <div className="section">
        <div className="wrap center" style={{ maxWidth: 620 }}>
          <h1 className="h2">We don't have a page for that exam yet.</h1>
          <p className="lead" style={{ marginTop: 14 }}>
            See every exam we cover, or ask a counsellor which test your course needs.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
            <Button to="/exams" arrow>
              All exams
            </Button>
            <Button variant="outline" onClick={() => openEnquiry({ test: 'Preparing now' }, 'full')}>
              Ask a counsellor
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const prepPrefill = { test: 'Preparing now', message: `I would like help preparing for the ${exam.name}.` };
  const byName = Object.fromEntries(destinations.map((d) => [d.name, d]));
  // Articles about this exam first, then the general exam doubts.
  const related = [
    ...posts.filter((p) => p.exam === exam.slug),
    ...posts.filter((p) => p.category === 'exam-doubts' && p.exam !== exam.slug),
  ].slice(0, 6);
  const others = exams.filter((e) => e.slug !== exam.slug).slice(0, 4);

  return (
    <>
      <div className="exam-hero">
        <div className="wrap">
          <div className="crumb">
            <Link to="/">Home</Link>
            <i>/</i>
            <Link to="/exams">Exams</Link>
            <i>/</i>
            <span>{exam.name}</span>
          </div>
          {exam.kind && <Pill variant="light">{exam.kind}</Pill>}
          <h1 className="display">{exam.name}</h1>
          {exam.fullName && exam.fullName !== exam.name && <p className="exam-hero-full">{exam.fullName}</p>}
          {exam.summary && <p className="lead">{exam.summary}</p>}
          <div className="hero-actions">
            <Button size="lg" arrow onClick={() => openEnquiry(prepPrefill, 'full')}>
              Get a free {exam.name} prep plan
            </Button>
            <Button to={`/exams/${exam.slug}#colleges`} variant="ghost" size="lg">
              Find colleges by {exam.name} score
            </Button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <Eyebrow>About the {exam.name}</Eyebrow>
              <h2 className="h2">What the {exam.name} is and who needs it</h2>
              {exam.description && (
                <p className="lead" style={{ marginTop: 16 }}>
                  {exam.description}
                </p>
              )}
              {exam.usedFor && (
                <p className="exam-usedfor">
                  <b>Used for:</b> {exam.usedFor}
                </p>
              )}
            </Reveal>

            <Reveal delay={2} className="fact-card" id="facts">
              <h3 className="h4">Pattern, scores & fees</h3>
              <dl className="dl">
                {(exam.facts || []).map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="fact-note">
                Fees and formats change often — always confirm before booking.
                {exam.officialUrl && (
                  <>
                    {' '}
                    <a href={exam.officialUrl} target="_blank" rel="noreferrer noopener">
                      Official {exam.name} website ↗
                    </a>
                  </>
                )}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {Boolean(exam.acceptedIn?.length) && (
        <div className="section section--tight" id="accepted" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <SectionHeader eyebrow="Where it's accepted" title={`Countries that accept the ${exam.name}`} lead="Acceptance varies by university and visa type — we check every university on your shortlist." />
            <div className="accepted-grid">
              {exam.acceptedIn.map((name, i) => {
                const d = byName[name];
                return d ? (
                  <Reveal as={Link} key={name} to={`/destinations/${d.slug}`} delay={i % 4} className="accepted-chip">
                    <span className="accepted-flag" aria-hidden="true">{d.flag}</span>
                    <span>
                      <b>{d.name}</b>
                      <small>Study in {d.name} →</small>
                    </span>
                  </Reveal>
                ) : (
                  <Reveal key={name} delay={i % 4} className="accepted-chip">
                    <span>
                      <b>{name}</b>
                    </span>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="section" id="colleges">
        <div className="wrap">
          <SectionHeader eyebrow="Find colleges by exam" title={`Find colleges for your ${exam.name} score`} lead="Tell us your score and preferred country — a counsellor will send universities that match it, with fees in INR." />
          <CollegeFinder exams={exams} preset={exam} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <SectionHeader eyebrow="Read before you book" title={`${exam.name} guides and exam doubts`} />
            <div className="grid cols-3">
              {related.map((p, i) => (
                <PostCard key={p.id} post={p} delay={i % 3} />
              ))}
            </div>
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div className="section section--tight">
          <div className="wrap">
            <SectionHeader eyebrow="Compare" title="Other exams students consider" />
            <div className="grid cols-4">
              {others.map((e, i) => (
                <ExamCard key={e.id} exam={e} delay={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      <EnquiryBand
        eyebrow={`${exam.name} prep`}
        title={`Aim for the right ${exam.name} score the first time`}
        lead={`A diagnostic, a realistic target for your shortlist and a prep plan — so you only pay the ${exam.name} fee once.`}
        formVariant="full"
        prefill={prepPrefill}
        items={[
          { bold: 'Target score', text: 'mapped to the universities you want.' },
          { bold: 'Weekly mocks', text: 'with band-by-band feedback.' },
          { bold: 'Free counselling.', text: 'No obligation.' },
        ]}
      />
    </>
  );
}
