import Reveal from '../common/Reveal';
import Eyebrow from '../common/Eyebrow';
import Chk from '../common/Chk';
import Button from '../common/Button';

const CHECKLIST = [
  {
    title: 'One counsellor, start to finish',
    description: 'The person who evaluates your profile is the person who preps you for the visa interview.',
  },
  {
    title: 'Transparent shortlists',
    description: 'Every recommendation comes with ranking, total cost of attendance, intake deadline and graduate outcome data.',
  },
  {
    title: 'Application tracker you can see',
    description: 'Live status for every university — submitted, under review, offer, deposit, CAS/I-20.',
  },
  {
    title: 'Support after you land',
    description: 'Accommodation, bank account, SIM, part-time work rules and an alumni group in every major city.',
  },
];

const VISUAL_CARDS = [
  { i: '1', title: 'Profile score: 7.8 / 10', small: 'Strong for Canada & Ireland · stretch for US top-30' },
  { i: '2', title: '9 universities shortlisted', small: '3 ambitious · 4 moderate · 2 safe' },
  { i: '3', title: '4 offers received', small: '2 with partial scholarships' },
  { i: '✓', title: 'Visa approved', small: 'Departure: 24 August' },
];

export default function WhyUsSplit() {
  return (
    <div className="section">
      <div className="wrap">
        <div className="split">
          <Reveal>
            <Eyebrow>Why GIA Educare</Eyebrow>
            <h2 className="h2">We are paid to get you admitted — not to fill a university's seats</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Most consultancies push whichever campus pays the highest commission. We publish our shortlisting
              criteria, show you the trade-offs, and let you decide.
            </p>
            <ul className="checklist">
              {CHECKLIST.map((item) => (
                <li key={item.title}>
                  <Chk />
                  <div>
                    <b>{item.title}</b>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button to="/about" variant="dark" arrow style={{ marginTop: 30 }}>
              Our story
            </Button>
          </Reveal>

          <Reveal delay={2} className="visual visual--steps">
            <div className="visual-inner">
              <div className="visual-label">
                <span>A typical GIA journey</span>
                <small>Profile to departure</small>
              </div>
              {VISUAL_CARDS.map((c, i) => (
                <div className={i === VISUAL_CARDS.length - 1 ? 'vcard vcard--done' : 'vcard'} key={c.title}>
                  <span className="vi">{c.i}</span>
                  <div>
                    <b>{c.title}</b>
                    <small>{c.small}</small>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
