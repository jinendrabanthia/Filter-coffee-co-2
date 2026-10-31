import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Footer() {
  const navLinks = [
    { label: 'Work', to: '/work' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Clients', to: '/clients' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  const socials = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/filtercoffeeco/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/filtercoffeeco/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white relative z-10 overflow-hidden -mt-px">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 pt-14 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12 sm:mb-16">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <Link to="/" className="select-none mb-4 group inline-block">
              <Logo
                size="text-2xl md:text-3xl"
                className="text-white group-hover:text-[#BFE9FF] transition-colors"
              />
            </Link>
            <p className="text-white/60 text-sm md:text-base max-w-sm leading-relaxed font-medium">
              YOUR BRAND WAS NEVER MEANT TO FIT IN.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4">
            <p className="text-[0.68rem] font-bold tracking-[0.22em] uppercase text-white/40 mb-4">
              NAVIGATION
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs sm:text-sm font-semibold text-white/70 hover:text-white transition-colors py-1 inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <div>
              <p className="text-[0.68rem] font-bold tracking-[0.22em] uppercase text-white/40 mb-4 md:text-right">
                CONNECT
              </p>
              <div className="flex items-center gap-3 mb-6">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, backgroundColor: '#2563EB', color: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-white/60 hover:text-white transition-colors py-2"
            >
              <span>BACK TO TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/40">
            © 2026 FILTER COFFEE co. • INDEPENDENT CREATIVE & MARKETING AGENCY
          </p>
          <p className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/40">
            WE MAKE BRANDS ADDICTIVE.
          </p>
        </div>
      </div>
    </footer>
  );
}
