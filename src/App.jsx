import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home/Home';
import Destinations from './pages/Destinations/Destinations';
import DestinationDetail from './pages/Destinations/DestinationDetail';
import Courses from './pages/Courses/Courses';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import { useContentStore } from './store/contentStore';
import { captureAttribution } from './utils/attribution';

export default function App() {
  const hydrate = useContentStore((s) => s.hydrate);

  // One request on boot fills every section; until it lands the bundled
  // fallback content is on screen, so there is no loading flash.
  useEffect(() => {
    captureAttribution();
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
