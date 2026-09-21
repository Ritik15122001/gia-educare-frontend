import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home/Home';
import Destinations from './pages/Destinations/Destinations';
import DestinationDetail from './pages/Destinations/DestinationDetail';
import Exams from './pages/Exams/Exams';
import ExamDetail from './pages/Exams/ExamDetail';
import Courses from './pages/Courses/Courses';
import CourseDetail from './pages/Courses/CourseDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Enquiry from './pages/Enquiry/Enquiry';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import Legal from './pages/Legal/Legal';
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
          <Route path="/exams" element={<Exams />} />
          <Route path="/exams/:slug" element={<ExamDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile-evaluation" element={<Enquiry />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<Legal doc="privacy" />} />
          <Route path="/terms-of-service" element={<Legal doc="terms" />} />
          <Route path="/refund-policy" element={<Legal doc="refund" />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
