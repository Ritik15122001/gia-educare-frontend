import { useEffect } from 'react';
import Hero from '../../components/sections/Hero';
import StatsBand from '../../components/sections/StatsBand';
import ServicesSection from '../../components/sections/ServicesSection';
import DestinationsPreview from '../../components/sections/DestinationsPreview';
import WhyUsSplit from '../../components/sections/WhyUsSplit';
import ProcessSteps from '../../components/sections/ProcessSteps';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useSection, useSettings } from '../../hooks/useContent';

const CTA = {
  eyebrow: 'Start here',
  title: 'Book a free 1:1 profile evaluation',
  lead: "Tell us where you are today. You'll get an honest read on your chances, a shortlist direction and a timeline — on the call itself, not after a sales pitch.",
};

export default function Home() {
  const settings = useSettings();
  const cta = useSection('home.cta', CTA);

  useEffect(() => {
    document.title = settings.seo?.title || `${settings.brand} – Study Abroad Consultants`;
  }, [settings]);

  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesSection />
      <DestinationsPreview />
      <WhyUsSplit />
      <ProcessSteps />
      <TestimonialsSection />
      <EnquiryBand
        eyebrow={cta.eyebrow}
        title={cta.title}
        lead={cta.lead}
        items={[
          { bold: 'No fee, no obligation.', text: 'Counselling is free whether or not you sign up.' },
          { bold: 'Reply within 24 hours', text: 'on working days, by call or WhatsApp — your choice.' },
          { bold: 'Your data stays with us.', text: 'Never sold, never shared with universities without consent.' },
        ]}
      />
    </>
  );
}
