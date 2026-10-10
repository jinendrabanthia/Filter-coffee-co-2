import { Routes, Route } from 'react-router-dom';
import Layout       from './pages/Layout';
import HomePage     from './pages/HomePage';
import WorkPage     from './pages/WorkPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage  from './pages/GalleryPage';
import AboutPage    from './pages/AboutPage';
import ClientsPage  from './pages/ClientsPage';
import ContactPage  from './pages/ContactPage';
import ProjectPage  from './pages/ProjectPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"         element={<HomePage />} />
        <Route path="/work"     element={<WorkPage />} />
        <Route path="/work/:slug" element={<WorkPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery"  element={<GalleryPage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/clients"  element={<ClientsPage />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
