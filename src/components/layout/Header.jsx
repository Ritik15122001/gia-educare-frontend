import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../common/Button';
import CountriesMenu from './nav/CountriesMenu';
import ExamsMenu from './nav/ExamsMenu';
import CategoryMenu from './nav/CategoryMenu';
import { useNavigationStore } from '../../store/navigationStore';
import { useUiStore } from '../../store/uiStore';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';
import { usePostCategories } from '../../hooks/useContent';
import { cn } from '../../utils/cn';

const CLOSE_DELAY = 160;

export default function Header() {
  const isHeaderStuck = useNavigationStore((s) => s.isHeaderStuck);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const openEnquiry = useOpenEnquiry();
  const navCategories = usePostCategories().filter((c) => c.showInNav);
  const { pathname, search } = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const closeTimer = useRef(null);
  const navRef = useRef(null);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const open = (key) => {
    cancelClose();
    setOpenMenu(key);
  };
  // A short delay lets the pointer cross the gap between trigger and panel.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };
  const closeNow = () => {
    cancelClose();
    setOpenMenu(null);
  };

  // Close on Escape and on clicks outside the nav. Links inside a menu close it
  // themselves through `onNavigate`.
  useEffect(() => {
    if (!openMenu) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeNow();
        navRef.current?.querySelector(`[data-menu="${openMenu}"]`)?.focus();
      }
    };
    const onPointer = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) closeNow();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [openMenu]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const trigger = (key, label, isActive) => (
    <button
      type="button"
      data-menu={key}
      className={cn('nav-trigger', isActive && 'active', openMenu === key && 'open')}
      aria-expanded={openMenu === key}
      aria-controls={`menu-${key}`}
      onClick={() => (openMenu === key ? closeNow() : open(key))}
    >
      {label}
      <span className="caret" aria-hidden="true" />
    </button>
  );

  const hoverProps = (key) => ({ onMouseEnter: () => open(key), onMouseLeave: scheduleClose });
  const categoryParam = new URLSearchParams(search).get('category');

  return (
    <header className={cn('site-header', isHeaderStuck && 'is-stuck', openMenu && 'menu-shown')}>
      <div className="wrap">
        <nav className="nav" ref={navRef} aria-label="Main">
          <Logo />

          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => cn(isActive && 'active')}>
                Home
              </NavLink>
            </li>

            <li className="has-mega" {...hoverProps('countries')}>
              {trigger('countries', 'Countries', pathname.startsWith('/destinations') || categoryParam === 'beginner-doubts')}
              {openMenu === 'countries' && <CountriesMenu id="menu-countries" onNavigate={closeNow} />}
            </li>

            <li className="has-mega" {...hoverProps('exams')}>
              {trigger('exams', 'Exams', pathname.startsWith('/exams') || categoryParam === 'exam-doubts')}
              {openMenu === 'exams' && <ExamsMenu id="menu-exams" onNavigate={closeNow} />}
            </li>

            <li>
              <NavLink to="/courses" className={({ isActive }) => cn(isActive && 'active')}>
                Courses
              </NavLink>
            </li>

            {navCategories.map((cat) => {
              const key = `cat-${cat.key}`;
              return (
                <li key={cat.key} className="has-dropdown" {...hoverProps(key)}>
                  {trigger(key, cat.label, categoryParam === cat.key)}
                  {openMenu === key && <CategoryMenu id={`menu-${key}`} category={cat} onNavigate={closeNow} />}
                </li>
              );
            })}

            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) => cn(isActive && !navCategories.some((c) => c.key === categoryParam) && !['beginner-doubts', 'exam-doubts'].includes(categoryParam) && 'active')}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => cn(isActive && 'active')}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => cn(isActive && 'active')}>
                Contact
              </NavLink>
            </li>
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
