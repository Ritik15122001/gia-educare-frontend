import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home/Home';
import Destinations from './pages/Destinations/Destinations';
import Courses from './pages/Courses/Courses';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { useContentStore } from './store/contentStore';

export default function App() {
  const hydrate = useContentStore((s) => s.hydrate);

  // One request on boot fills every section; until it lands the bundled
  // fallback content is on screen, so there is no loading flash.
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
