import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TopBar from './TopBar';
import Header from './Header';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';
import StickyCta from './StickyCta';
import ScrollToTopButton from './ScrollToTopButton';
import WhatsAppFloat from './WhatsAppFloat';
import { useScrollTracking } from '../../hooks/useScrollTracking';
import { useMobileMenuBehavior } from '../../hooks/useMobileMenuBehavior';

// New page → top. A #hash (e.g. /destinations/uk#costs from the country menu)
// → that section, once the page has rendered it.
function ScrollRestoration() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'auto' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export default function RootLayout() {
  useScrollTracking();
  useMobileMenuBehavior();
  const location = useLocation();

  return (
    <>
      <ScrollRestoration />
      <TopBar />
      <Header />
      <MobileDrawer />
      <main id="main">
        <div className="page" key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <StickyCta />
      <ScrollToTopButton />
      <WhatsAppFloat />
    </>
  );
}
