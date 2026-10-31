'use client';

/**
 * BackgroundShapes – subtle, premium decorative shapes
 * 
 * Renders different SVG shape compositions depending on the `variant` prop.
 * All shapes use the website's brand palette at very low opacity so they
 * enhance depth without competing with content.
 *
 * Usage:  <BackgroundShapes variant="hero" />
 *         Place inside a `position: relative; overflow: hidden` container.
 */

const shapeConfigs = {
  /* ── Hero section: large soft circle + thin ring ── */
  hero: (
    <>
      {/* Large blurred circle — top right */}
      <svg className="absolute -top-[15%] -right-[12%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-[0.045]" viewBox="0 0 600 600" fill="none">
        <circle cx="300" cy="300" r="280" fill="#111111" />
      </svg>
      {/* Thin ring — bottom left */}
      <svg className="absolute -bottom-[8%] -left-[6%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] opacity-[0.04]" viewBox="0 0 500 500" fill="none">
        <circle cx="250" cy="250" r="200" stroke="#111111" strokeWidth="1.5" fill="none" />
      </svg>
      {/* Small dot cluster — mid left */}
      <svg className="absolute top-[40%] left-[5%] w-[80px] h-[80px] opacity-[0.05]" viewBox="0 0 80 80" fill="none">
        <circle cx="20" cy="20" r="4" fill="#111111" />
        <circle cx="50" cy="30" r="3" fill="#111111" />
        <circle cx="35" cy="55" r="5" fill="#111111" />
        <circle cx="65" cy="60" r="3" fill="#111111" />
      </svg>
    </>
  ),

  /* ── Blurb / dark sections: light shapes ── */
  blurb: (
    <>
      {/* Soft oval — top right */}
      <svg className="absolute -top-[10%] -right-[8%] w-[400px] h-[300px] md:w-[600px] md:h-[400px] opacity-[0.03]" viewBox="0 0 600 400" fill="none">
        <ellipse cx="300" cy="200" rx="260" ry="170" fill="#FAFAFA" />
      </svg>
      {/* Small ring — bottom left */}
      <svg className="absolute bottom-[10%] left-[8%] w-[180px] h-[180px] opacity-[0.04]" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="70" stroke="#FAFAFA" strokeWidth="1" fill="none" />
      </svg>
    </>
  ),

  /* ── Work section: diagonal ovals + dot grid ── */
  work: (
    <>
      {/* Large oval — top left, rotated warm coffee accent */}
      <svg className="absolute -top-[6%] -left-[10%] w-[500px] h-[400px] md:w-[700px] md:h-[500px] opacity-[0.065]" viewBox="0 0 700 500" fill="none">
        <ellipse cx="350" cy="250" rx="300" ry="180" fill="#EF7722" transform="rotate(-12 350 250)" />
      </svg>
      {/* Small dots — right side amber */}
      <svg className="absolute top-[30%] right-[4%] w-[100px] h-[160px] opacity-[0.09]" viewBox="0 0 100 160" fill="none">
        <circle cx="20" cy="20" r="3" fill="#FAA533" />
        <circle cx="60" cy="50" r="2.5" fill="#FAA533" />
        <circle cx="30" cy="80" r="4" fill="#FAA533" />
        <circle cx="70" cy="110" r="3" fill="#FAA533" />
        <circle cx="40" cy="140" r="2" fill="#FAA533" />
      </svg>
      {/* Thin arc — bottom right electric blue */}
      <svg className="absolute -bottom-[4%] -right-[5%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] opacity-[0.14]" viewBox="0 0 450 450" fill="none">
        <path d="M 400 225 A 175 175 0 0 1 225 400" stroke="#0BA6DF" strokeWidth="2" fill="none" />
      </svg>
    </>
  ),

  /* ── Services section: concentric rings + pill shape ── */
  services: (
    <>
      {/* Concentric rings — center right (Electric Blue & Amber) */}
      <svg className="absolute top-[20%] -right-[8%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] opacity-[0.14]" viewBox="0 0 500 500" fill="none">
        <circle cx="250" cy="250" r="200" stroke="#0BA6DF" strokeWidth="1.5" fill="none" />
        <circle cx="250" cy="250" r="140" stroke="#FAA533" strokeWidth="1.5" fill="none" />
        <circle cx="250" cy="250" r="80" stroke="#EF7722" strokeWidth="1.5" fill="none" />
      </svg>
      {/* Rounded rectangle / pill — bottom left */}
      <svg className="absolute bottom-[8%] -left-[3%] w-[200px] h-[80px] md:w-[300px] md:h-[100px] opacity-[0.08]" viewBox="0 0 300 100" fill="none">
        <rect x="10" y="10" width="280" height="80" rx="40" fill="#FAA533" />
      </svg>
    </>
  ),

  /* ── About section: large ring + soft blob ── */
  about: (
    <>
      {/* Large ring — center left warm orange */}
      <svg className="absolute top-[15%] -left-[12%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] opacity-[0.12]" viewBox="0 0 650 650" fill="none">
        <circle cx="325" cy="325" r="280" stroke="#EF7722" strokeWidth="2" fill="none" />
      </svg>
      {/* Small filled circle — top right electric cyan */}
      <svg className="absolute top-[8%] right-[10%] w-[120px] h-[120px] opacity-[0.09]" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="50" fill="#0BA6DF" />
      </svg>
      {/* Oval — bottom right golden amber */}
      <svg className="absolute -bottom-[5%] -right-[6%] w-[350px] h-[250px] md:w-[500px] md:h-[350px] opacity-[0.065]" viewBox="0 0 500 350" fill="none">
        <ellipse cx="250" cy="175" rx="220" ry="150" fill="#FAA533" transform="rotate(8 250 175)" />
      </svg>
    </>
  ),

  /* ── Team section: scattered circles + arc ── */
  team: (
    <>
      {/* Arc — top electric cyan */}
      <svg className="absolute -top-[5%] left-[20%] w-[400px] h-[200px] md:w-[600px] md:h-[300px] opacity-[0.12]" viewBox="0 0 600 300" fill="none">
        <path d="M 50 280 Q 300 -50 550 280" stroke="#0BA6DF" strokeWidth="2" fill="none" />
      </svg>
      {/* Dot grid — right warm orange */}
      <svg className="absolute top-[35%] right-[3%] w-[120px] h-[120px] opacity-[0.09]" viewBox="0 0 120 120" fill="none">
        <circle cx="20" cy="20" r="3" fill="#EF7722" />
        <circle cx="60" cy="20" r="3" fill="#EF7722" />
        <circle cx="100" cy="20" r="3" fill="#EF7722" />
        <circle cx="20" cy="60" r="3" fill="#EF7722" />
        <circle cx="60" cy="60" r="3" fill="#FAA533" />
        <circle cx="100" cy="60" r="3" fill="#EF7722" />
        <circle cx="20" cy="100" r="3" fill="#EF7722" />
        <circle cx="60" cy="100" r="3" fill="#EF7722" />
        <circle cx="100" cy="100" r="3" fill="#EF7722" />
      </svg>
      {/* Ring — bottom left golden amber */}
      <svg className="absolute -bottom-[4%] -left-[4%] w-[250px] h-[250px] opacity-[0.11]" viewBox="0 0 250 250" fill="none">
        <circle cx="125" cy="125" r="100" stroke="#FAA533" strokeWidth="1.5" fill="none" />
      </svg>
    </>
  ),

  /* ── Contact section: capsule + cross dots ── */
  contact: (
    <>
      {/* Capsule — top right electric cyan */}
      <svg className="absolute -top-[3%] -right-[5%] w-[250px] h-[100px] md:w-[400px] md:h-[120px] opacity-[0.12]" viewBox="0 0 400 120" fill="none">
        <rect x="10" y="10" width="380" height="100" rx="50" stroke="#0BA6DF" strokeWidth="2" fill="none" />
      </svg>
      {/* Soft circle — bottom left warm orange */}
      <svg className="absolute -bottom-[10%] -left-[8%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] opacity-[0.065]" viewBox="0 0 500 500" fill="none">
        <circle cx="250" cy="250" r="220" fill="#EF7722" />
      </svg>
    </>
  ),

  /* ── Gallery page: rounded squares + oval ── */
  gallery: (
    <>
      {/* Rounded square — top left electric cyan */}
      <svg className="absolute -top-[5%] -left-[5%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] opacity-[0.12]" viewBox="0 0 450 450" fill="none">
        <rect x="50" y="50" width="350" height="350" rx="60" stroke="#0BA6DF" strokeWidth="1.8" fill="none" />
      </svg>
      {/* Large oval — bottom right warm orange */}
      <svg className="absolute -bottom-[8%] -right-[10%] w-[400px] h-[300px] md:w-[600px] md:h-[400px] opacity-[0.06]" viewBox="0 0 600 400" fill="none">
        <ellipse cx="300" cy="200" rx="270" ry="170" fill="#EF7722" transform="rotate(-6 300 200)" />
      </svg>
      {/* Dot trio — mid right amber */}
      <svg className="absolute top-[45%] right-[6%] w-[60px] h-[100px] opacity-[0.12]" viewBox="0 0 60 100" fill="none">
        <circle cx="30" cy="15" r="5" fill="#FAA533" />
        <circle cx="30" cy="50" r="4" fill="#FAA533" />
        <circle cx="30" cy="85" r="3" fill="#FAA533" />
      </svg>
    </>
  ),

  /* ── Clients page: subtle geometric rings ── */
  clients: (
    <>
      <svg className="absolute -top-[5%] -right-[5%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-[0.04]" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="180" stroke="#111111" strokeWidth="1" fill="none" />
      </svg>
      <svg className="absolute -bottom-[6%] -left-[6%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] opacity-[0.04]" viewBox="0 0 500 500" fill="none">
        <circle cx="250" cy="250" r="200" stroke="#111111" strokeWidth="1" fill="none" />
      </svg>
    </>
  ),

  /* ── Project detail page: wavy arc + dots ── */
  project: (
    <>
      {/* Wavy arc — top electric cyan */}
      <svg className="absolute -top-[3%] left-[10%] w-[500px] h-[200px] md:w-[800px] md:h-[300px] opacity-[0.12]" viewBox="0 0 800 300" fill="none">
        <path d="M 0 200 Q 200 50 400 200 Q 600 350 800 200" stroke="#0BA6DF" strokeWidth="2" fill="none" />
      </svg>
      {/* Filled ellipse — bottom right warm orange */}
      <svg className="absolute -bottom-[8%] -right-[8%] w-[350px] h-[250px] md:w-[500px] md:h-[350px] opacity-[0.065]" viewBox="0 0 500 350" fill="none">
        <ellipse cx="250" cy="175" rx="230" ry="150" fill="#EF7722" />
      </svg>
    </>
  ),
};

export default function BackgroundShapes({ variant = 'hero' }) {
  const shapes = shapeConfigs[variant];
  return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
      {shapes}
    </div>
  );
}
