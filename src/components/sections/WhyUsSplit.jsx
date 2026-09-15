import Reveal from '../common/Reveal';
import Eyebrow from '../common/Eyebrow';
import Chk from '../common/Chk';
import Button from '../common/Button';
import { useSection } from '../../hooks/useContent';

// Heading and intro are editable in Admin → Section copy ("Home — why us");
// these are the fallbacks when a field is left blank.
const DEFAULTS = {
  eyebrow: "Why GIA Educare",
  title: "Your Goals Come First. Not a University Quota.",
  lead: "We recommend universities based on your profile, goals, budget and career plans—not simply because a particular option is available.",
};

const CHECKLIST = [
  {
    title: "One counsellor, start to finish",
    description: "The counsellor who understands your profile stays with you throughout your application and visa journey.",
  },
  {
    title: "Transparent shortlists",
    description: "Every recommendation is explained clearly, including tuition, entry requirements, deadlines, scholarships and relevant career outcomes.",
  },
  {
    title: "Application tracking",
    description: "Track the progress of your applications from submission and review to offer, deposit and visa documentation.",
  },
  {
    title: "Support beyond admission",
    description: "Get practical guidance for your next steps, including pre-departure preparation and settling into your destination.",
  },
];

const JOURNEY_LABEL = "An example GIA journey";
const JOURNEY_SUB = "From profile to departure";

const VISUAL_CARDS = [
  { i: "1", title: "Profile evaluated", small: "Strong fit for Canada & Ireland · Competitive for selected US universities" },
  { i: "2", title: "9 universities shortlisted", small: "3 ambitious · 4 target · 2 safer options" },
  { i: "3", title: "4 offers received", small: "2 included partial scholarships" },
  { i: "✓", title: "Ready for departure", small: "Visa documentation completed · Pre-departure guidance" },
];

export default function WhyUsSplit() {
  const section = useSection('home.why', DEFAULTS);

  return (
    <div className="section">
      <div className="wrap">
        <div className="split">
          <Reveal>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="h2">{section.title}</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              {section.lead}
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
                <span>{JOURNEY_LABEL}</span>
                <small>{JOURNEY_SUB}</small>
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
