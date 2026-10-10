import { Link } from 'react-router-dom';

export default function Footer() {
  const links = [
    { to: '/about',   label: 'About'       },
    { to: '/contact', label: 'Contact'     },
    { to: '/work',    label: 'Work'        },
    { to: '/clients', label: 'Our Clients' },
  ];

  const socials = [
    { label: 'LinkedIn', href: '#', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
    )},
    { label: 'Instagram', href: '#', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    )},
    { label: 'YouTube', href: '#', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    )},
  ];

  return (
    <footer
      style={{ fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}
      className="bg-black text-white relative z-10"
    >
      {/* Big wordmark */}
      <div className="overflow-hidden px-4 md:px-8 pt-16 pb-8 select-none">
        <p
          className="font-black leading-none tracking-tight text-white w-full text-center"
          style={{
            fontSize: 'clamp(4rem, 16vw, 18rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 0.88,
          }}
        >
          FILTER COFFEE CO.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mx-6 md:mx-10" />

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 md:px-10 py-6">
        {/* Socials */}
        <div className="flex items-center gap-4">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="text-white/50 hover:text-white transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[0.72rem] font-semibold tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right copy */}
        <div className="text-right">
          <p className="text-[0.65rem] font-medium text-white/40 leading-snug">
            Proudly created in India
          </p>
          <p className="text-[0.65rem] font-medium text-white/40 leading-snug">
            All Rights Reserved. All Wrong Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
