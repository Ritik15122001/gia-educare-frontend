import { useEffect } from 'react';
import { useNavigationStore } from '../store/navigationStore';

// Drives the sticky-header shadow and the back-to-top button visibility.
export function useScrollTracking() {
  const setScrollState = useNavigationStore((s) => s.setScrollState);

  useEffect(() => {
    const onScroll = () => setScrollState(window.scrollY || window.pageYOffset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setScrollState]);
}
