import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUiStore } from '../store/uiStore';

// Keeps body.menu-open in sync with the store (the drawer/scrim CSS keys off
// that class), closes the drawer on Escape, and on every route change.
export function useMobileMenuBehavior() {
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const closeMobileMenu = useUiStore((s) => s.closeMobileMenu);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeMobileMenu]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);
}
