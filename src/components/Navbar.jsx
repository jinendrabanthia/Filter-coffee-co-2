import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'About',       to: '/about'    },
  { label: 'Work',        to: '/work'     },
  { label: 'Gallery',     to: '/gallery'  },
  { label: 'Our Clients', to: '/clients'  },
];

const smoothSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const ticking = useRef(false);
  const isHome = location.pathname === '/';

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      // Smooth hysteresis: scroll down past 80px activates logo, scroll back above 40px returns to links
      if (currentY > 80) {
        setIsScrolled(true);
        setOpen(false);
      } else if (currentY < 40) {
        setIsScrolled(false);
      }
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = () => {
    setOpen(false);
  };

  const handleLogoClick = (e) => {
    if (isScrolled) {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsScrolled(false);
    }
  };

  const showCenterLogo = isHome ? isScrolled : isScrolled;
  const showLinks = isHome ? !isScrolled : !isScrolled;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-[500] flex items-center justify-center px-4 md:px-8 pt-3 pointer-events-none"
    >
      {/* ── Glassmorphism Morphing Pill Container ── */}
      <motion.div
        layout
        transition={smoothSpring}
        className={`pointer-events-auto relative inline-flex items-center justify-center mx-auto ${
          showCenterLogo ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]' : ''
        }`}
        style={{
          borderRadius: 9999,
          background: showCenterLogo
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.86) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.78) 100%)',
          backdropFilter: 'blur(16px) saturate(150%)',
          WebkitBackdropFilter: 'blur(16px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.88)',
          boxShadow: showCenterLogo
            ? '0 16px 36px -10px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0,0,0,0.03), inset 0 1px 1px rgba(255, 255, 255, 0.95)'
            : '0 8px 28px -8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0,0,0,0.02), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
          paddingLeft: showCenterLogo ? '24px' : isHome ? '36px' : '28px',
          paddingRight: showCenterLogo ? '24px' : isHome ? '36px' : '28px',
          paddingTop: showCenterLogo ? '10px' : '12px',
          paddingBottom: showCenterLogo ? '10px' : '12px',
          width: 'auto',
          minWidth: showCenterLogo ? '240px' : 'auto',
        }}
      >
        <div className="flex items-center justify-center relative w-full">
          {/* Logo on Subpages when at the top */}
          {!isHome && !isScrolled && (
            <div className="flex items-center shrink-0 mr-8">
              <Link
                to="/"
                className="font-nunito font-black text-[1.28rem] tracking-[0.08em] text-black shrink-0 hover:opacity-75 transition-opacity flex items-center select-none"
              >
                <span>FILTER COFFEE</span>
                <span className="ml-1 text-[0.98rem] opacity-80">co.</span>
              </Link>
            </div>
          )}

          {/* Centered Logo — Originates directly from the exact center */}
          <AnimatePresence mode="popLayout" initial={false}>
            {showCenterLogo && (
              <motion.div
                key="center-logo"
                initial={{ opacity: 0, scale: 0.9, y: 0, x: 0, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, y: 0, x: 0, filter: 'blur(3px)' }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center select-none text-center mx-auto"
              >
                <Link
                  to="/"
                  onClick={handleLogoClick}
                  className="font-nunito font-black text-[1.24rem] tracking-[0.08em] text-black shrink-0 hover:opacity-75 transition-opacity flex items-center justify-center select-none"
                  title="Scroll to top"
                >
                  <span>FILTER COFFEE</span>
                  <span className="ml-1 text-[0.96rem] opacity-80">co.</span>
                  <span
                    className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-black/5 text-[9px] text-black/60 font-bold"
                  >
                    ↑
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centered Navigation Links — Centered without any horizontal shift */}
          <AnimatePresence mode="popLayout" initial={false}>
            {showLinks && (
              <motion.div
                key="nav-links"
                initial={{ opacity: 0, scale: 0.96, y: 0, x: 0, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, y: 0, x: 0, filter: 'blur(3px)' }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center mx-auto"
              >
                {/* Desktop Links (Center-aligned) */}
                <ul className="hidden md:flex items-center justify-center gap-7 lg:gap-9">
                  {links.map((l) => (
                    <li key={l.to} className="relative group/item">
                      <Link
                        to={l.to}
                        onClick={(e) => handleNavClick(e, l)}
                        className={`group flex items-center relative transition-opacity ${
                          location.pathname === l.to ? 'opacity-100 font-extrabold' : 'opacity-85 hover:opacity-100'
                        }`}
                      >
                        <span className="text-[0.74rem] font-sans font-bold text-brand-navy tracking-[0.18em] uppercase transition-colors group-hover/item:text-brand-yellow leading-tight whitespace-nowrap">
                          {l.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden flex items-center gap-2 px-1 py-0.5 text-[0.75rem] font-sans font-bold text-brand-navy tracking-[0.16em] uppercase"
                  onClick={() => setOpen((o) => !o)}
                  aria-label="Toggle navigation menu"
                >
                  <span>Menu</span>
                  <div className="flex flex-col gap-[3.5px]">
                    <span className={`block w-3.5 h-[1.5px] bg-black transition-all ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
                    <span className={`block w-3.5 h-[1.5px] bg-black transition-all ${open ? 'opacity-0' : ''}`} />
                    <span className={`block w-3.5 h-[1.5px] bg-black transition-all ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[calc(100%+10px)] inset-x-0 min-w-[240px] flex flex-col p-6 gap-4 md:hidden shadow-2xl"
              style={{
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(28px) saturate(180%)',
                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
              }}
            >
              {links.map((l) => (
                <div key={l.to} className="flex flex-col border-b border-black/8 pb-3">
                  <Link
                    to={l.to}
                    onClick={(e) => handleNavClick(e, l)}
                    className={`text-base font-semibold text-black transition-colors ${
                      location.pathname === l.to ? 'opacity-100 font-bold' : 'opacity-70'
                    }`}
                  >
                    {l.label}
                  </Link>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}
