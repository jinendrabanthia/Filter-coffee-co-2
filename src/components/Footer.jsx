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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{ fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}
      className="bg-[#F94500] text-[#280049] relative z-10 overflow-hidden border-t border-[#280049]/10"
    >
      {/* ── Signature Brand Accent Hairline (#280049 -> #FFA02E -> #F94500) ── */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#280049] via-[#FFA02E] to-[#F94500]" />

      {/* ── Ambient Glows ── */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(41,0,75,0.25) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,160,46,0.3) 0%, transparent 70%)',
        }}
      />

      {/* ── Top Pill Badge ── */}
      <div className="flex justify-center pt-14 pb-4 px-4">
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#280049]/20 bg-white/90 hover:bg-[#280049] hover:text-[#F94500] text-[#280049] text-[11px] font-bold tracking-widest uppercase backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span>FILTER COFFEE CO.</span>
          <span className="text-xs">↗</span>
        </button>
      </div>

      {/* ── 3-Line Stacked Wordmark in #280049 on #F94500 ── */}
      <div className="overflow-hidden px-4 md:px-8 pt-2 pb-8 select-none">
        <div
          className="font-black leading-[0.82] tracking-[-0.04em] text-[#280049] w-full text-center flex flex-col items-center justify-center uppercase select-none"
          style={{
            fontSize: 'clamp(5rem, 18vw, 19rem)',
            fontWeight: 900,
          }}
        >
          <span className="block transform hover:scale-[1.01] transition-transform duration-300">
            FILTER
          </span>
          <span className="block transform hover:scale-[1.01] transition-transform duration-300">
            COFFEE
          </span>
          <span className="block transform hover:scale-[1.01] transition-transform duration-300">
            CO.
          </span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-[#280049]/15 mx-6 md:mx-12" />

      {/* ── Bottom Bar: Socials & Brand Copyright ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-12 py-6">
        <p className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#280049]/80 order-2 sm:order-1">
          © 2026 FILTER COFFEE CO. • WE MAKE BRANDS ADDICTIVE
        </p>

        <div className="flex items-center gap-4 order-1 sm:order-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-[#280049] hover:text-[#F94500] hover:bg-[#280049] p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
