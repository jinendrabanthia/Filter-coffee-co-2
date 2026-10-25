export default function Footer() {
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

      {/* Bottom bar — only Instagram & LinkedIn */}
      <div className="flex items-center justify-center gap-6 px-6 md:px-10 py-6">
        {socials.map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-white/60 hover:text-white transition-all duration-200 p-2 hover:scale-110"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
