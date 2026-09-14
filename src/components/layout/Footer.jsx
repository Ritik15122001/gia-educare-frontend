import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';
import SocialIcon from '../common/SocialIcon';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { useSettings } from '../../hooks/useContent';

const EXPLORE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
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

const SOCIALS = ['instagram', 'linkedin', 'youtube', 'whatsapp'];

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
                <a href={socials[name]} key={name} aria-label={name} target="_blank" rel="noreferrer noopener">
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
            © <span>{year}</span> {settings.brand} Education Services. All rights reserved.
          </span>
          <ul>
            <li>
              <Link to="/contact">Privacy policy</Link>
            </li>
            <li>
              <Link to="/contact">Terms of service</Link>
            </li>
            <li>
              <Link to="/contact">Refund policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
