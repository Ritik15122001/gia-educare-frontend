import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { useClients, useSection } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: "University network",
  title: "Universities Our Students Choose",
  lead: "Explore leading universities and business schools across the US, UK, Ireland, Germany, France and other popular study destinations.",
};

// One tile per institution: the logo when there is one, otherwise the name as a
// wordmark so the wall never shows a gap.
function ClientTile({ client, delay }) {
  const inner = client.logoUrl ? (
    <img src={client.logoUrl} alt={client.name} loading="lazy" />
  ) : (
    <span className="client-wordmark">{client.name}</span>
  );

  return (
    <Reveal
      as={client.websiteUrl ? 'a' : 'div'}
      delay={delay}
      className="client-tile"
      {...(client.websiteUrl
        ? { href: client.websiteUrl, target: '_blank', rel: 'noreferrer noopener', title: `${client.name} — opens their website` }
        : { title: client.name })}
    >
      {inner}
      {client.country && <span className="client-country">{client.country}</span>}
    </Reveal>
  );
}

export default function ClientsWall() {
  const clients = useClients();
  const section = useSection('home.clients', DEFAULTS);

  if (!clients.length) return null;

  return (
    <div className="section section--tight clients" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <div className="client-grid">
          {clients.map((c, i) => (
            <ClientTile key={c.id} client={c} delay={i % 4} />
          ))}
        </div>
      </div>
    </div>
  );
}
