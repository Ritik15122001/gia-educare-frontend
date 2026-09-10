import { useEffect } from 'react';
import PageHead from '../../components/layout/PageHead';
import Reveal from '../../components/common/Reveal';
import Eyebrow from '../../components/common/Eyebrow';
import Button from '../../components/common/Button';
import Milestones from '../../components/sections/Milestones';
import ValuesGrid from '../../components/sections/ValuesGrid';
import TeamGrid from '../../components/sections/TeamGrid';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { useSection, useSettings, splitAccent } from '../../hooks/useContent';

const HEAD = {
  title: 'A counselling desk, |not a sales floor.',
  lead: "GIA Educare was started by three former international students who were mis-advised themselves. We built the practice we wish we'd had — small, senior, and straight with you about what your profile can and cannot do.",
};
const STORY = { eyebrow: 'Our story', title: "We lost two years to bad advice. You shouldn't have to." };
const CTA = {
  eyebrow: 'Say hello',
  title: 'Come in for a coffee, or just book the call',
  lead: 'Walk into any of our offices, or take the whole process remotely — most of our students never visit in person and it makes no difference to the outcome.',
};

export default function About() {
  const openEnquiry = useOpenEnquiry();
  const settings = useSettings();
  const head = useSection('about.head', HEAD);
  const story = useSection('about.story', STORY);
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

      <div className="section">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <h2 className="h2">{story.title}</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                One of us paid a consultancy that submitted the same generic statement of purpose to nine
                universities. Another was pushed toward a diploma with no work rights because it carried a higher
                commission. We opened GIA Educare in 2016 with a rule that hasn't moved since: the shortlist is built
                for the student, and we show our reasoning.
              </p>
              <p className="lead" style={{ marginTop: 14 }}>
                Today the team is small on purpose. Every counsellor handles a capped caseload so you get replies in
                hours, not weeks — and the person who reads your transcripts on day one is the person who preps you
                for the visa interview.
              </p>
              <div className="hero-actions" style={{ marginTop: 28 }}>
                <Button variant="dark" arrow onClick={() => openEnquiry()}>
                  Talk to a counsellor
                </Button>
                <Button to="/destinations" variant="outline">
                  See destinations
                </Button>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <Milestones />
            </Reveal>
          </div>
        </div>
      </div>

      <ValuesGrid />
      <TeamGrid />

      <EnquiryBand
        eyebrow={cta.eyebrow}
        title={cta.title}
        lead={cta.lead}
        items={[
          { bold: 'Gurugram · Bengaluru · Pune', text: '— walk-ins Mon–Sat, 10am to 7pm.' },
          { bold: 'Remote counselling', text: 'over video for students anywhere in India or abroad.' },
          { bold: 'Parents welcome', text: 'on the call — most of the budget questions come from them anyway.' },
        ]}
      />
    </>
  );
}
