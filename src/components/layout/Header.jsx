import { NavLink } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { useNavigationStore } from '../../store/navigationStore';
import { useUiStore } from '../../store/uiStore';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/destinations', label: 'Destinations' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const isHeaderStuck = useNavigationStore((s) => s.isHeaderStuck);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const openEnquiry = useOpenEnquiry();

  return (
    <header className={cn('site-header', isHeaderStuck && 'is-stuck')}>
      <div className="wrap">
        <nav className="nav">
          <Logo />

          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={({ isActive }) => cn(isActive && 'active')}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <Button arrow onClick={() => openEnquiry()}>
              Free Counselling
            </Button>
            <button
              className="burger"
              id="burger"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
