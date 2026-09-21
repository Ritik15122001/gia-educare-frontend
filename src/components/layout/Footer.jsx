import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';
import SocialIcon from '../common/SocialIcon';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { waTarget } from '../../utils/contact';
import { useSettings } from '../../hooks/useContent';

const EXPLORE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/exams', label: 'Exams' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const SERVICE_LINKS = [
  { to: '/contact', label: 'Profile evaluation' },
  { to: '/courses', label: 'University shortlisting' },
  { to: '/contact', label: 'SOP & LOR editing' },
  { to: '/contact', label: 'IELTS / GRE prep' },
  { to: '/contact', label: 'Visa & documentation' },
  { to: '/contact', label: 'Loans & scholarships' },
];

const SOCIALS = ['facebook', 'instagram', 'linkedin', 'youtube', 'whatsapp'];

const LEGAL_LINKS = [
  ['privacy', 'Privacy policy', '/privacy-policy'],
  ['terms', 'Terms of service', '/terms-of-service'],
  ['refund', 'Refund policy', '/refund-policy'],
];

/**
 * The policy pages now live on this site, but a settings row may still hold the
 * absolute https://giaeducare.com/... link the defaults used to ship with. Both
 * of those should route client-side; only a link to somewhere else opens in a
 * new tab. Returns the in-app path, or null when the link is genuinely external.
 */
function internalPath(href, fallback) {
  if (!href) return fallback;
  if (href.startsWith('/')) return href;
  try {
    const url = new URL(href, window.location.origin);
    const here = window.location.hostname.replace(/^www\./, '');
    const there = url.hostname.replace(/^www\./, '');
    if (there === here || there === 'giaeducare.com') return `${url.pathname}${url.hash}`;
  } catch {
    return fallback;
  }
  return null;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const openEnquiry = useOpenEnquiry();
  const settings = useSettings();
  const socials = settings.socials || {};

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <Logo inverted size="lg" />
            <p>{settings.footerBlurb}</p>
            <div className="socials">
              {SOCIALS.filter((name) => socials[name]).map((name) => (
                <a href={socials[name]} key={name} aria-label={name} target={name === 'whatsapp' ? waTarget() : '_blank'} rel="noreferrer noopener">
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="fnav">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul className="fnav">
              {SERVICE_LINKS.map((l, i) => (
                <li key={i}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="fcta">
              <b>Free counselling</b>
              <p>No fee, no obligation. Get an honest read on your profile this week.</p>
              <Button block arrow onClick={() => openEnquiry()}>
                Book my slot
              </Button>
            </div>
            <div style={{ marginTop: 20, fontSize: '.88rem' }}>
              <a href={`tel:${String(settings.phonePrimary || '').replace(/\s/g, '')}`}>{settings.phonePrimary}</a>
              <br />
              <a href={`mailto:${settings.emailPrimary}`}>{settings.emailPrimary}</a>
              <br />
              <span style={{ opacity: 0.75 }}>{settings.addressLine}</span>
            </div>
          </div>
        </div>

        <div className="fbot">
          <span>
            © {year} {settings.brand}
            {settings.legalEntity ? ` | ${settings.legalEntity}` : ''}. All Rights Reserved.
          </span>
          <ul>
            {LEGAL_LINKS.map(([key, label, path]) => {
              const href = settings.legalLinks?.[key];
              const to = internalPath(href, path);
              return (
                <li key={key}>
                  {to ? (
                    <Link to={to}>{label}</Link>
                  ) : (
                    <a href={href} target="_blank" rel="noreferrer noopener">
                      {label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
