import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ScrollFloat from '../components/ScrollFloat';
import LifeAndCulture from '../components/LifeAndCulture';
import DriftWall from '../components/DriftWall';

/* ─── Flat image list — all 30 shots fed into DriftWall ───────────────────── */
const GALLERY_ITEMS = [
  { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=82', title: 'Brand Campaign' },
  { image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=82', title: 'Fashion Shoot' },
  { image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=82', title: 'Lifestyle' },
  { image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=82', title: 'Product' },
  { image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=82', title: 'Beauty' },
  { image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=82', title: 'Style' },
  { image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=82', title: 'Creative Direction' },
  { image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=82', title: 'Art Direction' },
  { image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=82', title: 'Branding' },
  { image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=82', title: 'Campaign' },
  { image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=82', title: 'Content' },
  { image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&q=82', title: 'Digital' },
  { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=82', title: 'Influencer' },
  { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=82', title: 'Social' },
  { image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&q=82', title: 'Studio' },
  { image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&q=82', title: 'Portrait' },
  { image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=82', title: 'Talent' },
  { image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=82', title: 'Creative' },
  { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=82', title: 'Film' },
  { image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=82', title: 'Video' },
  { image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=82', title: 'Production' },
  { image: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?w=600&q=82', title: 'Platform' },
  { image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=82', title: 'Talent' },
  { image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=600&q=82', title: 'Events' },
  { image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=82', title: 'Fashion' },
  { image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=82', title: 'Beauty' },
  { image: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&q=82', title: 'Street' },
  { image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=82', title: 'Art' },
  { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=82', title: 'Life' },
  { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=82', title: 'Luxury' },
];

export default function GalleryPage() {
  const [columns, setColumns] = useState(6);
  const [tileDimensions, setTileDimensions] = useState({ w: 242, h: 186 });

  useEffect(() => {
    const updateSize = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      if (width < 640) {
        setColumns(3);
        setTileDimensions({ w: 125, h: 96 });
      } else if (width < 1024) {
        setColumns(4);
        setTileDimensions({ w: 180, h: 140 });
      } else {
        setColumns(6);
        setTileDimensions({ w: 242, h: 186 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5EF] relative overflow-hidden text-[#111111]">
      {/* Hero Header */}
      <section className="relative pt-[120px] sm:pt-[140px] pb-8 sm:pb-10 px-4 sm:px-6 md:px-12 z-10 border-b border-[#111111]/10">
        <div className="max-w-[1360px] mx-auto">
          <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-3 sm:mb-4">
            THE REEL
          </p>
          <ScrollFloat
            textClassName="text-[clamp(2.4rem,6vw,6rem)] font-black leading-[0.95] tracking-[-0.04em] mb-4 sm:mb-6 text-[#111111]"
            animationDuration={1.6}
            stagger={0.02}
          >
            OUR VISUAL REEL
          </ScrollFloat>
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur
            baseRotation={0}
            blurStrength={2}
            textClassName="text-[#111111]/80 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed font-medium"
          >
            A glimpse into the work, the craft, and the stories we help brands tell.
          </ScrollReveal>
        </div>
      </section>

      {/* DriftWall Gallery — responsive dark full-bleed */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative z-10 w-full bg-[#0a0a0a] overflow-hidden h-[70vh] sm:h-[80vh] md:h-screen"
      >
        <DriftWall
          items={GALLERY_ITEMS}
          columns={columns}
          tileWidth={tileDimensions.w}
          tileHeight={tileDimensions.h}
          gap={8}
          radius={12}
          tilt={12}
          turn={0}
          roll={0}
          perspective={950}
          depth={100}
          speed={40}
          direction="up"
          variance={0.35}
          parallax={0.5}
          pauseOnHover={false}
          lift={60}
          fade={0.05}
          dim={0.88}
          grayscale={false}
          overlayColor="#0a0a0a"
        />
      </motion.section>

      {/* Life and Culture Section */}
      <LifeAndCulture />
    </div>
  );
}
