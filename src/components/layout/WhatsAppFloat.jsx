import SocialIcon from '../common/SocialIcon';
import { useSettings } from '../../hooks/useContent';
import { whatsappHref } from '../../utils/contact';

const MESSAGE = "Hi GIA Educare, I'd like to know more about studying abroad.";

// Floating "chat on WhatsApp" button on every page. Uses the WhatsApp link from
// Settings → Social links, falling back to the primary phone number.
export default function WhatsAppFloat() {
  const settings = useSettings();
  const configured = settings.socials?.whatsapp || '';
  const number = configured.match(/wa\.me\/(\d+)/)?.[1] || configured || settings.phonePrimary;
  const href = whatsappHref(number, MESSAGE);

  if (!href) return null;

  return (
    <a className="wa-float" href={href} target="_blank" rel="noreferrer noopener" aria-label="Chat with us on WhatsApp">
      <SocialIcon name="whatsapp" size={28} />
      <span className="wa-float-label">Chat with us</span>
    </a>
  );
}
