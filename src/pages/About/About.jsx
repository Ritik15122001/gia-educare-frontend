import { useEffect } from 'react';
import PageHead from '../../components/layout/PageHead';
import Reveal from '../../components/common/Reveal';
import Eyebrow from '../../components/common/Eyebrow';
import Button from '../../components/common/Button';
import SectionHeader from '../../components/common/SectionHeader';
import Chk from '../../components/common/Chk';
import LeadershipTeam from '../../components/sections/LeadershipTeam';
import TeamGrid from '../../components/sections/TeamGrid';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { useSection, useSettings, splitAccent } from '../../hooks/useContent';

const HEAD = {
  title: 'Your Trusted Partner for |Global Education',
  lead: 'Choosing to study abroad is one of the most important decisions a student can make for their academic and professional future.',
};
const WHO = { eyebrow: 'Who we are', title: 'Counselling built around the student, not the destination' };
const MISSION = { eyebrow: 'Our mission', title: 'Making Global Education Simple, Transparent & Accessible' };
const VISION = { eyebrow: 'Our vision', title: 'Empowering Students to Build a Global Future' };
const HELP = { eyebrow: 'What we help you with', title: 'Support at every stage of the journey' };
const JOURNEY = { eyebrow: 'Our student journey', title: 'From Aspiration to Destination' };
const WHY = { eyebrow: 'Why choose GIA Educare?', title: 'Guidance Designed Around You' };
const VALUES = { eyebrow: 'Our core values', title: 'What we hold ourselves to' };
const COMMITMENT = { eyebrow: 'Our commitment', title: 'Our Commitment to Students & Parents' };
const CTA = {
  eyebrow: 'Start your global education journey',
  title: 'Your Future Begins With the Right Decision',
  lead: 'Whether you are exploring your first study-abroad option or already have a destination in mind, our team is here to help you understand your opportunities and plan your next steps.',
};

const INTRO = [
  'At GIA Educare, we help students and families navigate the journey of studying abroad with personalised counselling, informed guidance and end-to-end support. From choosing the right course and university to completing applications, visa guidance and preparing for life abroad, we aim to make the entire process simpler, clearer and more transparent.',
  "Our approach is centred around understanding each student's academic background, career aspirations, financial considerations and long-term goals before recommending suitable study options.",
];

const WHO_PARAS = [
  'GIA Educare is a study abroad counselling and education support platform dedicated to helping students explore international education opportunities.',
  'We believe that every student has a different ambition and there is no single destination, university or course that is right for everyone.',
  'Our counsellors work closely with students to understand their individual goals and help them explore suitable courses, universities and study destinations. We provide structured guidance throughout the application journey while keeping students and their families informed at every important stage.',
  "From the first counselling session to the student's departure, our objective is to provide reliable guidance and personalised support at every step.",
];

const MISSION_PARAS = [
  'Our mission is to help students make informed decisions about their international education journey.',
  'We aim to simplify the complexities of studying abroad by providing personalised counselling, practical guidance and structured support — allowing students to focus on their academic and career aspirations.',
];

const VISION_PARAS = [
  'Our vision is to become a trusted education partner for students aspiring to study internationally.',
  'We strive to build long-term relationships with students and families by combining personalised guidance, transparency and professional support throughout their global education journey.',
];

const HELP_ITEMS = [
  { icon: '🎓', title: 'Career & Education Counselling', text: 'Understand your academic profile, interests and career goals and explore suitable international education pathways.' },
  { icon: '🏫', title: 'University & Course Selection', text: 'Get guidance in identifying suitable courses, universities and programmes based on your academic profile and future goals.' },
  { icon: '🌍', title: 'Study Destination Guidance', text: 'Explore international study destinations and understand their education systems, admission requirements, costs and opportunities.' },
  { icon: '📄', title: 'Application Assistance', text: 'Receive support throughout the university application process, including documentation and application coordination.' },
  { icon: '🛂', title: 'Visa Guidance', text: 'Get structured guidance on documentation and the visa application process for your selected study destination.' },
  { icon: '✈️', title: 'Pre-Departure Support', text: 'Prepare for your journey abroad with guidance on essential pre-departure requirements and practical considerations.' },
];

const JOURNEY_STEPS = [
  { num: '01', title: 'Understand', text: 'We begin by understanding your academic background, interests, career aspirations and study-abroad goals.' },
  { num: '02', title: 'Explore', text: 'We help you explore suitable countries, courses and universities based on your individual profile.' },
  { num: '03', title: 'Shortlist', text: 'Together, we identify suitable study options that align with your academic and career objectives.' },
  { num: '04', title: 'Apply', text: 'Our team supports you through the application process and helps you stay organised with the required documentation.' },
  { num: '05', title: 'Prepare', text: 'Once your admission journey progresses, we provide guidance for the next stages, including visa and pre-departure preparation.' },
  { num: '06', title: 'Begin Your Global Journey', text: 'With the necessary preparation completed, you are ready to begin your international education journey.' },
];

const WHY_ITEMS = [
  { title: 'Personalised Counselling', text: 'Every student is different. Our counselling approach focuses on your individual academic and career goals.' },
  { title: 'Student-Centric Approach', text: "We put the student's interests and long-term objectives at the centre of the counselling process." },
  { title: 'Transparent Guidance', text: 'We believe students and parents should have clarity about their options, requirements and the overall process.' },
  { title: 'End-to-End Support', text: 'From initial counselling to application, visa guidance and pre-departure preparation, we support students throughout their journey.' },
  { title: 'Global Opportunities', text: 'We help students explore international education opportunities across multiple study destinations and academic disciplines.' },
  { title: 'Long-Term Relationship', text: 'Our relationship with students does not end with an application. We aim to remain a trusted education partner throughout their journey.' },
];

const CORE_VALUES = [
  { title: 'Integrity', text: 'We believe in honest, responsible and transparent guidance.' },
  { title: 'Student First', text: "Every recommendation should begin with the student's goals and aspirations." },
  { title: 'Transparency', text: 'We believe students and parents deserve clear information before making important decisions.' },
  { title: 'Personalisation', text: "We understand that every student's academic profile and career journey is different." },
  { title: 'Excellence', text: 'We continuously strive to improve the quality of our counselling and student support.' },
  { title: 'Trust', text: 'We aim to build relationships based on reliability, communication and long-term support.' },
];

const COMMITMENT_PARAS = [
  'Studying abroad involves significant academic, financial and personal decisions.',
  'At GIA Educare, we believe students and parents should have access to clear information and professional guidance before making these decisions.',
  'Our commitment is to provide a structured and personalised experience — helping students understand their options, prepare their applications and move confidently through each stage of their international education journey.',
];

export default function About() {
  const openEnquiry = useOpenEnquiry();
  const settings = useSettings();
  const head = useSection('about.head', HEAD);
  const who = useSection('about.who', WHO);
  const mission = useSection('about.mission', MISSION);
  const vision = useSection('about.vision', VISION);
  const help = useSection('about.help', HELP);
  const journey = useSection('about.journey', JOURNEY);
  const why = useSection('about.why', WHY);
  const values = useSection('about.values', VALUES);
  const commitment = useSection('about.commitment', COMMITMENT);
  const cta = useSection('about.cta', CTA);
  const { before, accent } = splitAccent(head.title);

  useEffect(() => {
    document.title = `About · ${settings.brand}`;
  }, [settings.brand]);

  return (
    <>
      <PageHead
        crumb="About us"
        title={
          <>
            {before}
            {accent && <em className="serif-i gold-text">{accent}</em>}
          </>
        }
        lead={head.lead}
      />

      {/* Who we are */}
      <div className="section">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <Eyebrow>{who.eyebrow}</Eyebrow>
              <h2 className="h2">{who.title}</h2>
              {WHO_PARAS.map((p) => (
                <p className="lead" style={{ marginTop: 14 }} key={p.slice(0, 24)}>{p}</p>
              ))}
              <div className="hero-actions" style={{ marginTop: 28 }}>
                <Button variant="dark" arrow onClick={() => openEnquiry()}>Book a free counselling session</Button>
                <Button to="/destinations" variant="outline">Explore your study options</Button>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="card" style={{ padding: 'clamp(22px,2.4vw,30px)' }}>
                <Eyebrow>About GIA Educare</Eyebrow>
                {INTRO.map((p) => (
                  <p style={{ marginTop: 14, color: 'var(--muted)' }} key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Mission & vision */}
      <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="split">
            {[[mission, MISSION_PARAS], [vision, VISION_PARAS]].map(([s, paras]) => (
              <Reveal key={s.eyebrow}>
                <Eyebrow>{s.eyebrow}</Eyebrow>
                <h2 className="h3" style={{ marginTop: 6 }}>{s.title}</h2>
                {paras.map((p) => (
                  <p style={{ marginTop: 13, color: 'var(--muted)' }} key={p.slice(0, 24)}>{p}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* What we help you with */}
      <div className="section">
        <div className="wrap">
          <SectionHeader center eyebrow={help.eyebrow} title={help.title} />
          <div className="grid cols-3">
            {HELP_ITEMS.map((item, i) => (
              <Reveal as="article" key={item.title} delay={i} className="card">
                <div className="ico" aria-hidden="true" style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                <h3 className="h4">{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Student journey */}
      <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <SectionHeader center eyebrow={journey.eyebrow} title={journey.title} />
          <div className="steps">
            {JOURNEY_STEPS.map((step, i) => (
              <Reveal as="div" key={step.num} delay={i} className="step">
                <div className="dot">{step.num}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <div className="section">
        <div className="wrap">
          <SectionHeader center eyebrow={why.eyebrow} title={why.title} />
          <div className="grid cols-3">
            {WHY_ITEMS.map((item, i) => (
              <Reveal as="article" key={item.title} delay={i} className="card">
                <h3 className="h4">{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Core values */}
      <div className="section" style={{ background: 'var(--ink)', color: '#fff' }}>
        <div className="wrap">
          <SectionHeader center eyebrow={values.eyebrow} title={<span style={{ color: '#fff' }}>{values.title}</span>} />
          <div className="grid cols-3 vgrid">
            {CORE_VALUES.map((v, i) => (
              <Reveal as="article" key={v.title} delay={i} className="card">
                <h3 className="h4">{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <LeadershipTeam />
      <TeamGrid />

      {/* Commitment */}
      <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <Eyebrow>{commitment.eyebrow}</Eyebrow>
              <h2 className="h2">{commitment.title}</h2>
            </Reveal>
            <Reveal delay={1}>
              {COMMITMENT_PARAS.map((p) => (
                <p className="lead" style={{ marginTop: 14 }} key={p.slice(0, 24)}>{p}</p>
              ))}
              <ul className="checklist" style={{ marginTop: 20 }}>
                <li>
                  <Chk />
                  <div>
                    <b>Clear information first</b>
                    <p>Options, requirements and costs explained before any decision.</p>
                  </div>
                </li>
                <li>
                  <Chk />
                  <div>
                    <b>One counsellor, start to finish</b>
                    <p>The same person stays with you from first call to departure.</p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <EnquiryBand
        eyebrow={cta.eyebrow}
        title={cta.title}
        lead={cta.lead}
        items={[
          { bold: 'Book a free counselling session', text: '— talk through your profile with a senior counsellor.' },
          { bold: 'Explore your study options', text: 'across our destinations, courses and exams.' },
          { bold: 'Contact GIA Educare', text: 'by phone, email or WhatsApp — whichever suits you.' },
        ]}
      />
    </>
  );
}
