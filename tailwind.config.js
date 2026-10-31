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
        black:  '#280049',
        ink:    '#ffffff',
        chalk:  '#0a0a0a',
        smoke:  'rgba(40, 0, 73, 0.85)',
        ash:    '#280049',
        border: 'rgba(41, 0, 75, 0.12)',
        // Brand Palette: Funky, Elegant & Minimalist
        'brand-orange': '#F94500', // Vibrant Filter Coffee Orange
        'brand-vermilion': '#F94500',
        'brand-amber':  '#FAA533', // Sunburst Golden Amber
        'brand-cream':  '#EBEBEB', // Minimalist Off-White Canvas
        'brand-blue':   '#0BA6DF', // Electric Sky Cyan Pop
        'brand-yellow': '#FAA533', // Mapped to Sunburst Amber for existing components
        'brand-navy':   '#280049', // Deep Midnight Purple text
        'brand-indigo': '#280049',
        'brand-purple': '#280049',
        'brand-light':  '#EBEBEB', // Off-White
        'brand-theme':  '#F94500', // Primary Theme Lavender Orchid
        'brand-dark': '#280049',
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
