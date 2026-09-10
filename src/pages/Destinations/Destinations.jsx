import { useEffect } from 'react';
import PageHead from '../../components/layout/PageHead';
import Button from '../../components/common/Button';
import SectionHeader from '../../components/common/SectionHeader';
import DestinationDetailCard from '../../components/cards/DestinationDetailCard';
import ComparisonTable from '../../components/sections/ComparisonTable';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useDestinations, useSection, useSettings } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

const HEAD = {
  title: 'Pick the country before you pick the campus.',
  lead: 'Cost, course length, work rights and residency pathways differ enormously. Here is the honest comparison we walk every student through — no country is "the best", only the best fit for your profile.',
};
const LIST = {
  eyebrow: 'Top destinations',
  title: 'Where our students went last year',
  lead: 'Tuition figures are indicative annual ranges for international students and change every intake — we confirm live numbers on your call.',
};
const CTA = {
  eyebrow: 'Not sure which country?',
  title: "Tell us your budget and marks. We'll tell you where you'll actually get in.",
  lead: 'Fifteen minutes on a call is worth three weeks of forum reading. Share a few details and a counsellor will come back with two or three realistic country options and why.',
};

export default function Destinations() {
  const openEnquiry = useOpenEnquiry();
  const destinations = useDestinations();
  const settings = useSettings();
  const head = useSection('destinations.head', HEAD);
  const list = useSection('destinations.list', LIST);
  const cta = useSection('destinations.cta', CTA);

  useEffect(() => {
    document.title = `Destinations · ${settings.brand}`;
  }, [settings.brand]);

  return (
    <>
      <PageHead crumb="Destinations" title={head.title} lead={head.lead}>
        <div className="hero-actions">
          <Button onClick={() => openEnquiry()}>Get a country recommendation</Button>
          <Button to="/courses" variant="ghost">
            Browse courses
          </Button>
        </div>
      </PageHead>

      <div className="section">
        <div className="wrap">
          <SectionHeader eyebrow={list.eyebrow} title={list.title} lead={list.lead} />
          <div className="grid cols-3">
            {destinations.map((d, i) => (
              <DestinationDetailCard key={d.id} destination={d} delay={i % 3} />
            ))}
          </div>
        </div>
      </div>

      <ComparisonTable />

      <EnquiryBand
        id="enq-dest"
        eyebrow={cta.eyebrow}
        title={cta.title}
        lead={cta.lead}
        items={[
          { bold: 'Budget-first shortlisting', text: '— total cost of attendance, not just tuition.' },
          { bold: 'Backlogs and gaps welcome', text: '— we know which countries accept them.' },
          { bold: 'Loan and scholarship options', text: 'mapped to each country.' },
        ]}
      />
    </>
  );
}
