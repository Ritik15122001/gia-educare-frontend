import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import Accordion from '../common/Accordion';
import Button from '../common/Button';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { useFaqs, useSection } from '../../hooks/useContent';

const DEFAULTS = { eyebrow: 'FAQ', title: 'Questions we get every week' };

export default function FAQSection() {
  const faqs = useFaqs();
  const section = useSection('contact.faq', DEFAULTS);
  const openEnquiry = useOpenEnquiry();

  const items = faqs.map((f) => ({ id: f.id, q: f.question, a: f.answer }));

  if (!items.length) return null;

  return (
    <div className="section">
      <div className="wrap" style={{ maxWidth: 880 }}>
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} style={{ marginInline: 'auto' }} />

        <Reveal>
          <Accordion items={items} />
        </Reveal>

        <Reveal className="center" style={{ marginTop: 34 }}>
          <p className="lead" style={{ marginBottom: 18 }}>
            Still unsure about something?
          </p>
          <Button arrow onClick={() => openEnquiry()}>
            Ask a counsellor
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
