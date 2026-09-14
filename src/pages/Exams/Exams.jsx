import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/layout/PageHead';
import Button from '../../components/common/Button';
import Reveal from '../../components/common/Reveal';
import SectionHeader from '../../components/common/SectionHeader';
import ExamCard from '../../components/cards/ExamCard';
import PostCard from '../../components/cards/PostCard';
import CollegeFinder from '../../components/sections/CollegeFinder';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useDestinations, useExams, usePosts, useSection, useSettings, splitAccent } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

const HEAD = {
  title: 'Pick the test |your course actually needs.',
  lead: 'English tests and admission exams, compared in plain language — scores, fees in INR, validity and where each one is accepted.',
};
const LIST = { eyebrow: 'Exams we prepare you for', title: 'English tests and admission exams' };
const COLLEGES = {
  eyebrow: 'Find colleges by exam',
  title: 'Where your score can take you',
  lead: 'Indicative scores most programs ask for. Share your score and a counsellor will send universities that match it.',
};

export default function Exams() {
  const exams = useExams();
  const posts = usePosts();
  const destinations = useDestinations();
  const settings = useSettings();
  const openEnquiry = useOpenEnquiry();
  const head = useSection('exams.head', HEAD);
  const list = useSection('exams.list', LIST);
  const colleges = useSection('exams.colleges', COLLEGES);
  const { before, accent } = splitAccent(head.title);

  useEffect(() => {
    document.title = `Exams · ${settings.brand}`;
  }, [settings.brand]);

  // Group by type in first-seen order, so admin ordering is respected.
  const groups = [];
  exams.forEach((e) => {
    const kind = e.kind || 'Other exams';
    let group = groups.find((g) => g.kind === kind);
    if (!group) groups.push((group = { kind, items: [] }));
    group.items.push(e);
  });
  const doubts = posts.filter((p) => p.category === 'exam-doubts');
  const bySlugName = Object.fromEntries(destinations.map((d) => [d.name, d]));

  return (
    <>
      <PageHead
        crumb="Exams"
        title={
          <>
            {before}
            {accent && <em className="serif-i gold-text">{accent}</em>}
          </>
        }
        lead={head.lead}
      >
        <div className="hero-actions">
          <Button onClick={() => openEnquiry({ test: 'Preparing now', message: 'I would like a test-prep plan.' }, 'full')}>
            Get a free test-prep plan
          </Button>
          <Button to="/exams#colleges" variant="ghost">
            Find colleges by exam
          </Button>
        </div>
      </PageHead>

      <div className="section">
        <div className="wrap">
          <SectionHeader eyebrow={list.eyebrow} title={list.title} lead={list.lead} />
          {groups.map((g) => (
            <div key={g.kind} className="exam-group">
              <h3 className="exam-group-title">{g.kind}</h3>
              <div className={`grid ${g.items.length >= 4 ? 'cols-4' : 'cols-3'}`}>
                {g.items.map((e, i) => (
                  <ExamCard key={e.id} exam={e} delay={i % 4} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section section--tight" id="colleges" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <SectionHeader eyebrow={colleges.eyebrow} title={colleges.title} lead={colleges.lead} />
          {exams.length > 0 && <CollegeFinder exams={exams} />}

          <Reveal className="tbl-wrap" style={{ marginTop: 34 }}>
            <table className="cmp">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Typical score asked</th>
                  <th>Accepted in</th>
                  <th>Used for</th>
                  <th aria-label="Action" />
                </tr>
              </thead>
              <tbody>
                {exams.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <Link to={`/exams/${e.slug}`}>{e.name}</Link>
                    </td>
                    <td>{e.typicalScore || '—'}</td>
                    <td className="cmp-countries">
                      {(e.acceptedIn || []).map((name) =>
                        bySlugName[name] ? (
                          <Link key={name} to={`/destinations/${bySlugName[name].slug}`} title={name}>
                            {bySlugName[name].flag} {name}
                          </Link>
                        ) : (
                          <span key={name}>{name}</span>
                        ),
                      )}
                    </td>
                    <td>{e.usedFor || '—'}</td>
                    <td>
                      <button
                        type="button"
                        className="link-arrow link-arrow--gold"
                        onClick={() => openEnquiry({ test: `${e.name} done`, message: `Please suggest colleges for my ${e.name} score: ` }, 'full')}
                      >
                        <span>Find colleges</span>
                        <span>→</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </div>

      {doubts.length > 0 && (
        <div className="section">
          <div className="wrap">
            <SectionHeader eyebrow="Beginner doubts" title="Exam questions, answered" />
            <div className="grid cols-3">
              {doubts.slice(0, 6).map((p, i) => (
                <PostCard key={p.id} post={p} delay={i % 3} />
              ))}
            </div>
          </div>
        </div>
      )}

      <EnquiryBand
        eyebrow="Test prep"
        title="Not sure which test to book? Ask before you pay the fee."
        lead="Tell us your course and countries and a counsellor will tell you exactly which tests you need, the score to aim for and a realistic prep timeline."
        formVariant="full"
        prefill={{ test: 'Preparing now', message: 'Which exams do I need for my course and countries?' }}
        items={[
          { bold: 'The right test the first time', text: '— checked against your shortlist and visa.' },
          { bold: 'Diagnostic and prep plan', text: 'with weekly mocks.' },
          { bold: 'Free counselling.', text: 'No obligation.' },
        ]}
      />
    </>
  );
}
