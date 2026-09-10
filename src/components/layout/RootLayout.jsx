import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TopBar from './TopBar';
import Header from './Header';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';
import StickyCta from './StickyCta';
import ScrollToTopButton from './ScrollToTopButton';
import EnquiryModal from './EnquiryModal';
import { useScrollTracking } from '../../hooks/useScrollTracking';
import { useMobileMenuBehavior } from '../../hooks/useMobileMenuBehavior';

function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
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
      <EnquiryModal />
    </>
  );
}
