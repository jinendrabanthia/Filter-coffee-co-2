import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import BackgroundShapes from '../components/BackgroundShapes';

/* ─── Image pool — 5 columns × 6 unique images each ───────────────────────── */
const COL_IMAGES = [
  /* Col 1 — scrolls UP */
  [
    { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', alt: 'Brand Campaign' },
    { src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80', alt: 'Fashion Shoot' },
    { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', alt: 'Lifestyle' },
    { src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80', alt: 'Product' },
    { src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80', alt: 'Beauty' },
    { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', alt: 'Style' },
  ],
  /* Col 2 — scrolls DOWN */
  [
    { src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80', alt: 'Creative Direction' },
    { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', alt: 'Art Direction' },
    { src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=80', alt: 'Branding' },
    { src: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=80', alt: 'Campaign' },
    { src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80', alt: 'Content' },
    { src: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&q=80', alt: 'Digital' },
  ],
  /* Col 3 — scrolls UP */
  [
    { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80', alt: 'Influencer' },
    { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', alt: 'Social' },
    { src: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&q=80', alt: 'Studio' },
    { src: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&q=80', alt: 'Portrait' },
    { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80', alt: 'Talent' },
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', alt: 'Creative' },
  ],
  /* Col 4 — scrolls DOWN */
  [
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', alt: 'Film' },
    { src: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80', alt: 'Video' },
    { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', alt: 'Production' },
    { src: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?w=600&q=80', alt: 'Platform' },
    { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', alt: 'Talent' },
    { src: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=600&q=80', alt: 'Events' },
  ],
  /* Col 5 — scrolls UP */
  [
    { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80', alt: 'Fashion' },
    { src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80', alt: 'Beauty' },
    { src: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&q=80', alt: 'Street' },
    { src: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=80', alt: 'Art' },
    { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80', alt: 'Life' },
    { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80', alt: 'Luxury' },
  ],
];

/* Direction per column: true = up, false = down */
const DIRECTIONS = [true, false, true, false, true];

/* Speed (seconds per loop) — slight variation for organic feel */
const SPEEDS = [28, 22, 32, 24, 30];

/* ─── Single Column ─────────────────────────────────────────────────────── */
function GalleryColumn({ images, goUp, speed }) {
  /* Duplicate images for seamless infinite loop */
  const doubled = [...images, ...images];

  return (
    <div className="relative flex-1 overflow-hidden" style={{ minWidth: 0 }}>
      <div
        className={`gallery-col ${goUp ? 'gallery-col--up' : 'gallery-col--down'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden flex-shrink-0"
            style={{ borderRadius: '16px', aspectRatio: i % 3 === 1 ? '3/4' : '2/3' }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />
            {/* Dark overlay for moody look */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.38) 100%)',
                borderRadius: '16px',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-brand-light relative overflow-hidden">
      <BackgroundShapes variant="gallery" />

      {/* ── Hero Header ── */}
      <section className="relative pt-[140px] pb-10 px-8 md:px-12 z-10">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex items-center gap-4 text-[0.7rem] font-bold tracking-widest2 uppercase text-smoke mb-6">
            <span className="w-10 h-px bg-brand-navy/30 inline-block" />
            Visual Identity
          </div>
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            textClassName="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.95] tracking-[-0.04em] mb-4 text-brand-navy"
          >
            Our Gallery
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={0}
            blurStrength={2}
            textClassName="text-smoke text-lg max-w-xl leading-relaxed font-medium"
          >
            A glimpse into the work, the craft, and the stories we help brands tell.
          </ScrollReveal>
        </div>
      </section>

      {/* ── Infinite Scroll Grid ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative z-10 w-full"
        style={{ height: '80vh' }}
      >
        {/* Fade edges top & bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20"
          style={{ height: '60px', background: 'linear-gradient(to bottom, #EAE9E6 0%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
          style={{ height: '80px', background: 'linear-gradient(to top, #EAE9E6 0%, transparent 100%)' }}
        />

        <div
          className="h-full flex gap-3 overflow-hidden"
          style={{ alignItems: 'flex-start', paddingLeft: '8px', paddingRight: '8px' }}
        >
          {COL_IMAGES.map((images, colIdx) => (
            <GalleryColumn
              key={colIdx}
              images={images}
              goUp={DIRECTIONS[colIdx]}
              speed={SPEEDS[colIdx]}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
