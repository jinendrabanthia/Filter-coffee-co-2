import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Cursor   from '../components/Cursor';
import Navbar   from '../components/Navbar';
import Footer   from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="grain bg-transparent text-[#280049] min-h-screen relative selection:bg-[#280049] selection:text-[#F94500]">
      <AnimatedBackground />

      <Cursor />
      <Navbar />
      <Outlet />
      <Footer key={pathname} />
    </div>
  );
}
