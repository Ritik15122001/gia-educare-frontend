import Reveal from '../common/Reveal';
import Eyebrow from '../common/Eyebrow';
import Icon from '../common/Icon';
import SocialIcon from '../common/SocialIcon';
import { useSection, useSettings } from '../../hooks/useContent';
import { useImageOk } from '../../hooks/useImageOk';
import { mailHref, telHref, whatsappHref, waTarget } from '../../utils/contact';

const DEFAULTS = { eyebrow: 'Founder connect', title: 'A note from our founder' };

const SOCIALS = [
  ['linkedin', 'LinkedIn'],
  ['instagram', 'Instagram'],
  ['youtube', 'YouTube'],
  ['twitter', 'X'],
  ['facebook', 'Facebook'],
];

const initialsOf = (name = '') => name.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();

export default function FounderConnect() {
  const settings = useSettings();
  const section = useSection('home.founder', DEFAULTS);
  const founder = settings.founder;
  // Called before the early return below — hooks cannot be conditional.
  const [showPhoto, onPhotoError] = useImageOk(founder?.photoUrl);

  if (!founder?.enabled || !founder.name) return null;

  const firstName = founder.name.split(' ')[0];
  const email = mailHref(founder.email, `Hello ${firstName}`);
  const call = telHref(founder.phone);
  const whatsapp = whatsappHref(founder.whatsapp, `Hi ${firstName}, I'd like to talk about studying abroad.`);
  const socials = SOCIALS.filter(([key]) => founder[key]);

  return (
    <div className="section founder">
      <div className="wrap">
        <Reveal className="founder-card">
          <div className="founder-media">
            {showPhoto ? (
              <img src={founder.photoUrl} alt={founder.name} loading="lazy" onError={onPhotoError} />
            ) : (
              <span className="founder-initials" aria-hidden="true">
                {initialsOf(founder.name)}
              </span>
            )}
          </div>

          <div className="founder-body">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="h2">{section.title}</h2>
            {founder.message && <blockquote className="founder-message">{founder.message}</blockquote>}

            <div className="founder-sign">
              <div>
                <b>{founder.name}</b>
                {founder.title && <span>{founder.title}</span>}
              </div>
            </div>

            {(whatsapp || email || call) && (
              <div className="founder-actions">
                {whatsapp && (
                  <a className="btn btn--whatsapp" href={whatsapp} target={waTarget()} rel="noreferrer noopener">
                    <SocialIcon name="whatsapp" size={16} /> Message {firstName}
                  </a>
                )}
                {email && (
                  <a className="btn btn--ghost" href={email}>
                    <Icon name="mail" size={16} strokeWidth={2} /> Email
                  </a>
                )}
                {call && (
                  <a className="btn btn--ghost" href={call}>
                    <Icon name="phone" size={16} strokeWidth={2} /> Call
                  </a>
                )}
              </div>
            )}

            {socials.length > 0 && (
              <div className="founder-socials">
                <span>Follow {firstName}</span>
                {socials.map(([key, label]) => (
                  <a key={key} href={founder[key]} target={key === 'whatsapp' ? waTarget() : '_blank'} rel="noreferrer noopener" aria-label={`${founder.name} on ${label}`} title={label}>
                    <SocialIcon name={key} size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
