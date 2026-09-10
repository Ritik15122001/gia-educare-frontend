import SectionHeader from '../common/SectionHeader';
import ServiceCard from '../cards/ServiceCard';
import Button from '../common/Button';
import Reveal from '../common/Reveal';
import { useServices, useSection, splitAccent } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: 'What we do',
  title: 'Everything between |"I want to study abroad"| and boarding the flight',
  lead: 'One dedicated counsellor stays with you through all seven stages. No handoffs, no chasing, no surprise fees.',
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
