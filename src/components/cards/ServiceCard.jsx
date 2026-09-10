import Reveal from '../common/Reveal';
import Icon from '../common/Icon';

export default function ServiceCard({ service, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="card">
      <div className="ico">
        <Icon name={service.icon} />
      </div>
      <h3 className="h4">{service.title}</h3>
      <p>{service.description}</p>
    </Reveal>
  );
}
