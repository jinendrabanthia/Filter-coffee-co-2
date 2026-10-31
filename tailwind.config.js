/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SF Pro Display"', '"SF Pro Text"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"SF Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        display: ['Nighty', 'cursive', 'sans-serif'],
      },
      colors: {
        white:  '#ffffff',
        black:  '#111111',
        ink:    '#111111',
        chalk:  '#F7F5EF',
        smoke:  'rgba(17, 17, 17, 0.75)',
        ash:    '#111111',
        border: 'rgba(17, 17, 17, 0.12)',
        // Approved Electric Blue palette & accents
        'brand-blue':     '#2563EB', // Cobalt Blue Accent
        'brand-cobalt':   '#2563EB',
        'brand-sky':      '#BFE9FF', // Sky Blue Primary BG
        'brand-ivory':    '#F7F5EF', // Ivory Secondary BG
        'brand-orange':   '#FF6B35', // Tangerine accent
        'brand-tangerine':'#FF6B35',
        'brand-lime':     '#D5F45B', // Acid Lime accent
        'brand-lavender': '#C7B8FF', // Lavender accent
        'brand-cherry':   '#E63935', // Cherry Red accent
        'brand-navy':     '#111111', // Almost Black
        'brand-indigo':   '#2563EB',
        'brand-purple':   '#2563EB',
        'brand-dark':     '#111111',
        'brand-theme':    '#BFE9FF',
        'brand-cream':    '#F7F5EF',
        'brand-light':    '#F7F5EF',
        'brand-amber':    '#FF6B35',
        'brand-yellow':   '#D5F45B',
        'brand-vermilion':'#FF6B35',
      },
      letterSpacing: {
        widest2: '0.22em',
        widest3: '0.28em',
      },
      animation: {
        ticker:     'ticker 28s linear infinite',
        drift:      'drift 18s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
        pulse2:     'pulse2 3s ease-in-out infinite',
        glitch:     'glitch 3s infinite',
        marquee:    'marquee 25s linear infinite',
        'marquee-rev': 'marquee-rev 25s linear infinite',
        float:      'float 6s ease-in-out infinite',
        scanline:   'scanline 8s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%':   { transform: 'translateY(0px) rotate(-1deg)' },
          '100%': { transform: 'translateY(-24px) rotate(1deg)' },
        },
        pulse2: {
          '0%, 100%': { opacity: 0.3 },
          '50%':      { opacity: 0.8 },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)', clipPath: 'none' },
          '91%':           { transform: 'translate(-3px, 1px)', clipPath: 'polygon(0 20%, 100% 20%, 100% 30%, 0 30%)' },
          '93%':           { transform: 'translate(3px, -1px)', clipPath: 'polygon(0 60%, 100% 60%, 100% 70%, 0 70%)' },
          '95%':           { transform: 'translate(-2px, 2px)', clipPath: 'none' },
          '97%':           { transform: 'translate(2px, -2px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
      },
    },
  },
  plugins: [],
};
