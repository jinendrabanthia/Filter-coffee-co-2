import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Layout() {
  const { pathname } = useLocation();
  // Always true on fresh visit to '/' so footer stays hidden during intro
  const [isHomeIntro, setIsHomeIntro] = useState(pathname === '/');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (pathname === '/') {
      setIsHomeIntro(true);
    } else {
      setIsHomeIntro(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleReplayIntro = () => {
      if (pathname === '/') {
        setIsHomeIntro(true);
      }
    };
    window.addEventListener('fcc_replay_intro', handleReplayIntro);
    return () => window.removeEventListener('fcc_replay_intro', handleReplayIntro);
  }, [pathname]);

  return (
    <div className="grain bg-transparent text-[#111111] min-h-screen relative selection:bg-[#111111] selection:text-[#BFE9FF]">
      <AnimatedBackground />
      <Navbar />
      <Outlet context={{ isHomeIntro, setIsHomeIntro }} />
      {(!isHomeIntro || pathname !== '/') && <Footer key={pathname} />}
    </div>
  );
}
