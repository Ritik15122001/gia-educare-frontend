import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import TopBar from './TopBar';
import Header from './Header';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';
import StickyCta from './StickyCta';
import ScrollToTopButton from './ScrollToTopButton';
import WhatsAppFloat from './WhatsAppFloat';
import EnquiryModal from './EnquiryModal';
import { useScrollTracking } from '../../hooks/useScrollTracking';
import { useMobileMenuBehavior } from '../../hooks/useMobileMenuBehavior';

// New page → top. A #hash (e.g. /destinations/uk#costs from the country menu)
// → that section, once the page has rendered it.
//
// Getting to the top takes more care than one scrollTo. `behavior: 'auto'`
// means "use the CSS value", and `html` carries `scroll-behavior: smooth` for
// the in-page anchor links — so a route change used to *animate* the whole way
// up, visibly scrolling a long policy page from the bottom to the top over more
// than a second. `behavior: 'instant'` overrides the stylesheet and jumps.
// The browser also keeps the old scroll offset across an in-app navigation and
// re-adjusts it as the new page lays out, so turn its own restoration off and
// re-assert the top on the next two frames.
function ScrollRestoration() {
  // `key` changes on every navigation, including a click on the link for the
  // page you are already on — which should still take you back to the top.
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  useLayoutEffect(() => {
    if (hash) return undefined;

    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    toTop();
    let second;
    const first = requestAnimationFrame(() => {
      toTop();
      second = requestAnimationFrame(toTop);
    });
    return () => {
      cancelAnimationFrame(first);
      if (second) cancelAnimationFrame(second);
    };
  }, [pathname, hash, key]);

  useEffect(() => {
    if (!hash) return undefined;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

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
      <EnquiryModal />
    </>
  );
}
