import { useEffect } from 'react';
import PageHead from '../../components/layout/PageHead';
import Reveal from '../../components/common/Reveal';
import Eyebrow from '../../components/common/Eyebrow';
import Button from '../../components/common/Button';
import EnquiryForm from '../../components/forms/EnquiryForm';
import ContactInfo from '../../components/sections/ContactInfo';
import OfficesGrid from '../../components/sections/OfficesGrid';
import FAQSection from '../../components/sections/FAQSection';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useSection, useSettings } from '../../hooks/useContent';

const HEAD = {
  title: "Let's map your route out.",
  lead: 'Fill the form and a counsellor calls you back within one working day — or just phone the office. Counselling is free and there is no obligation to sign up for anything.',
};
const FORM = { eyebrow: 'Enquiry form', title: 'Tell us about your plan' };
const CTA = {
  eyebrow: 'Prefer WhatsApp?',
  title: "Message us and we'll call back at a time you pick",
  lead: "Drop your number here, tell us when you're free, and a counsellor will call. If you'd rather have everything in writing, say so — we'll email instead.",
};

export default function Contact() {
  const settings = useSettings();
  const head = useSection('contact.head', HEAD);
  const form = useSection('contact.form', FORM);
  const cta = useSection('contact.cta', CTA);

  useEffect(() => {
    document.title = `Contact · ${settings.brand}`;
  }, [settings.brand]);

  return (
    <>
      <PageHead
        crumb="Contact"
        title={head.title}
        lead={head.lead}
      />

      <div className="section">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <Eyebrow>{form.eyebrow}</Eyebrow>
              <h2 className="h2" style={{ marginBottom: 26 }}>
                {form.title}
              </h2>
              <EnquiryForm variant="full" />
            </Reveal>

            <ContactInfo />
          </div>
        </div>
      </div>

      <OfficesGrid />
      <FAQSection />

      <EnquiryBand
        eyebrow={cta.eyebrow}
        title={cta.title}
        lead={cta.lead}
        extra={
          <div className="hero-actions">
            <Button variant="ghost" size="lg" href={`tel:${String(settings.phonePrimary || '').replace(/\s/g, '')}`}>
              📞 {settings.phonePrimary}
            </Button>
          </div>
        }
      />
    </>
  );
}
