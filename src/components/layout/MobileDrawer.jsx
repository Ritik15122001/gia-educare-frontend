import { NavLink } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { useSettings } from '../../hooks/useContent';
import { useUiStore } from '../../store/uiStore';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/destinations', label: 'Destinations' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function MobileDrawer() {
  const closeMobileMenu = useUiStore((s) => s.closeMobileMenu);
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const openEnquiry = useOpenEnquiry();
  const settings = useSettings();

  return (
    <>
      <div className="scrim" onClick={closeMobileMenu} aria-hidden="true"></div>
      <aside className="drawer" aria-label="Mobile menu" aria-hidden={!mobileMenuOpen}>
        <div className="d-top">
          <Logo inverted size="sm" />
          <button
            className="burger"
            style={{ display: 'grid', background: 'transparent', borderColor: 'rgba(255,255,255,.2)' }}
            aria-label="Close menu"
            onClick={closeMobileMenu}
          >
            <span style={{ background: '#fff' }}></span>
          </button>
        </div>

        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className="d-link">
            {item.label} <span>→</span>
          </NavLink>
        ))}

        <Button
          block
          style={{ marginTop: 22 }}
          onClick={() => {
            closeMobileMenu();
            openEnquiry();
          }}
        >
          Book free counselling
        </Button>

        <div className="d-foot">
          <b style={{ color: '#fff' }}>Talk to a counsellor</b>
          <br />
          <a href={`tel:${String(settings.phonePrimary || '').replace(/\s/g, '')}`}>{settings.phonePrimary}</a>
          <br />
          <a href={`mailto:${settings.emailPrimary}`}>{settings.emailPrimary}</a>
        </div>
      </aside>
    </>
  );
}
