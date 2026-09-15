import SectionHeader from '../common/SectionHeader';
import ServiceCard from '../cards/ServiceCard';
import Button from '../common/Button';
import Reveal from '../common/Reveal';
import { useServices, useSection, splitAccent } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: "What we do",
  title: "From Your First Question to |Your Flight| — We're With You.",
  lead: "One dedicated counsellor supports you through every stage — from profile evaluation and university selection to applications, visa and pre-departure guidance.",
};

export default function ServicesSection() {
  const services = useServices();
  const section = useSection('home.services', DEFAULTS);
  const { before, accent, after } = splitAccent(section.title);

  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader
          center
          eyebrow={section.eyebrow}
          title={
            accent ? (
              <>
                {before}
                <span className="serif-i gold-text">{accent}</span>
                {after}
              </>
            ) : (
              before
            )
          }
          lead={section.lead}
        />

        <div className="grid cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i % 3} />
          ))}
        </div>

        <Reveal className="center" style={{ marginTop: 38 }}>
          <Button to="/courses" variant="outline" arrow>
            See all programs we support
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
