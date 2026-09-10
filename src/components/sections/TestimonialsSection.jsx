import SectionHeader from '../common/SectionHeader';
import TestimonialCard from '../cards/TestimonialCard';
import { useTestimonials, useSection } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: 'Student stories',
  title: 'Admits, in their own words',
  lead: "Sample testimonials — swap these for your own students' quotes before launch.",
};

export default function TestimonialsSection() {
  const testimonials = useTestimonials();
  const section = useSection('home.testimonials', DEFAULTS);

  if (!testimonials.length) return null;

  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <div className="grid cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
