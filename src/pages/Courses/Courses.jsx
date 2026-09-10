import { useEffect } from 'react';
import PageHead from '../../components/layout/PageHead';
import Button from '../../components/common/Button';
import CourseFilterGrid from '../../components/sections/CourseFilterGrid';
import LevelsGrid from '../../components/sections/LevelsGrid';
import EnquiryBand from '../../components/sections/EnquiryBand';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { useSection, useSettings } from '../../hooks/useContent';

const HEAD = {
  title: 'Programs that pay for themselves.',
  lead: 'The most-applied-for programs across our destinations, with realistic duration, fee bands and where graduates actually end up. Filter by field, then ask us for a shortlist.',
};
const CTA = {
  eyebrow: 'Course shortlist',
  title: 'Get a shortlist built around your marks, not a brochure',
  lead: "Send your details and we'll come back with six to nine specific programs — ambitious, moderate and safe — with deadlines, fees and entry requirements against each.",
};

export default function Courses() {
  const openEnquiry = useOpenEnquiry();
  const settings = useSettings();
  const head = useSection('courses.head', HEAD);
  const cta = useSection('courses.cta', CTA);

  useEffect(() => {
    document.title = `Courses · ${settings.brand}`;
  }, [settings.brand]);

  return (
    <>
      <PageHead
        crumb="Courses"
        title={head.title}
        lead={head.lead}
      >
        <div className="hero-actions">
          <Button onClick={() => openEnquiry(null, 'full')}>Ask for a course shortlist</Button>
          <Button to="/destinations" variant="ghost">
            Compare countries
          </Button>
        </div>
      </PageHead>

      <CourseFilterGrid />
      <LevelsGrid />

      <EnquiryBand
        id="enq-course"
        eyebrow={cta.eyebrow}
        title={cta.title}
        lead={cta.lead}
        formVariant="full"
        ctaTitle="Get my course shortlist"
        ctaLabel="Send my details"
        items={[
          { bold: 'Delivered in 48 hours', text: 'as a shareable PDF.' },
          { bold: 'Scholarship column included', text: 'for every program listed.' },
          { bold: "No test scores yet? Fine.", text: 'We shortlist on predicted bands.' },
        ]}
      />
    </>
  );
}
