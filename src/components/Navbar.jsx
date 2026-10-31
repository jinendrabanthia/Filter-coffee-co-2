import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const links = [
  { label: 'Work',     to: '/work' },
  { label: 'About',    to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Clients',  to: '/clients' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogoClick = () => {
    window.dispatchEvent(new CustomEvent('fcc_replay_intro'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-[500] flex flex-col items-center pt-3 px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1200px]"
      >
        {/* ── Liquid Glass Pill ── */}
        <div
          className={`relative flex items-center justify-between px-5 md:px-8 transition-all duration-500 ${
            scrolled ? 'py-2.5 rounded-2xl' : 'py-4 rounded-[28px]'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.52) 0%, rgba(191,233,255,0.32) 50%, rgba(255,255,255,0.40) 100%)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            border: '1px solid rgba(255,255,255,0.60)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 6px rgba(37,99,235,0.06), inset 0 1.5px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(191,233,255,0.3)'
              : '0 4px 20px rgba(0,0,0,0.07), inset 0 1.5px 0 rgba(255,255,255,0.70)',
          }}
        >
          {/* Top gloss streak */}
          <div
            className="absolute inset-x-[8%] top-0 h-px rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 40%, rgba(255,255,255,1) 60%, transparent)',
            }}
          />
          {/* Bottom soft reflection */}
          <div
            className="absolute inset-x-[12%] bottom-0 h-px rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(191,233,255,0.55) 50%, transparent)',
            }}
          />

          {/* Brand Wordmark (Official Trademark Logo) */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="select-none group relative z-10 flex items-center whitespace-nowrap"
          >
            <Logo
              size="text-[1.05rem] md:text-[1.22rem]"
              className="text-[#111111] group-hover:text-[#2563EB] transition-colors"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 relative z-10">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#2563EB]'
                      : 'text-[#111111]/80 hover:text-[#2563EB]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger — 44px tap target */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-11 h-11 gap-[5px] focus:outline-none relative z-10 -mr-2"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span className={`block h-[2px] bg-[#111111] transition-all duration-300 ${open ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
            <span className={`block h-[2px] bg-[#111111] transition-all duration-300 ${open ? 'opacity-0' : 'w-4'}`} />
            <span className={`block h-[2px] bg-[#111111] transition-all duration-300 ${open ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
          </button>
        </div>

        {/* Mobile Dropdown — also liquid glass */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-1 overflow-hidden px-5 py-4 flex flex-col gap-1 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(191,233,255,0.65) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1px solid rgba(255,255,255,0.62)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10), inset 0 1.5px 0 rgba(255,255,255,0.80)',
              }}
            >
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`min-h-[44px] flex items-center text-sm font-bold tracking-[0.16em] uppercase transition-colors px-2 border-b border-[#111111]/8 last:border-b-0 ${
                      isActive ? 'text-[#2563EB]' : 'text-[#111111]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
