import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';

const WorkPage            = lazy(() => import('./pages/WorkPage'));
const ServicesPage        = lazy(() => import('./pages/ServicesPage'));
const GalleryPage         = lazy(() => import('./pages/GalleryPage'));
const AboutPage           = lazy(() => import('./pages/AboutPage'));
const ClientsPage         = lazy(() => import('./pages/ClientsPage'));
const ContactPage         = lazy(() => import('./pages/ContactPage'));
const WorkRouteDispatcher = lazy(() => import('./pages/WorkRouteDispatcher'));

const PageLoader = () => <div className="min-h-[60vh] bg-[#BFE9FF]" />;

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"         element={<HomePage />} />
        <Route path="/work"     element={<Suspense fallback={<PageLoader />}><WorkPage /></Suspense>} />
        <Route path="/work/:slug" element={<Suspense fallback={<PageLoader />}><WorkRouteDispatcher /></Suspense>} />
        <Route path="/services" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
        <Route path="/gallery"  element={<Suspense fallback={<PageLoader />}><GalleryPage /></Suspense>} />
        <Route path="/about"    element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
        <Route path="/clients"  element={<Suspense fallback={<PageLoader />}><ClientsPage /></Suspense>} />
        <Route path="/contact"  element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
      </Route>
    </Routes>
  );
}
