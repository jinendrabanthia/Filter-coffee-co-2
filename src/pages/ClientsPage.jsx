import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollReveal from '../components/ScrollReveal';
import BackgroundShapes from '../components/BackgroundShapes';

/* ─── All 52 Client Brands ─────────────────────────────────────────────────── */
const CLIENTS = [
  /* ── Positions 1-6: The 6 parent companies ── */
  { name: "P&G",                    logo: "/images/clients/pg.png" },
  { name: "L'ORÉAL PARIS",          logo: "/images/clients/loreal.png" },
  { name: "Galderma",               logo: "/images/clients/galderma.png" },
  { name: "SEPHORA",                logo: "/images/clients/sephora.png" },
  { name: "NYKAA",                  logo: "/images/clients/nykaa.png" },
  { name: "DR. REDDY'S",            logo: "/images/clients/dr-reddys.png" },

  /* ── P&G sub-brands ── */
  { name: "OLAY",                   logo: "/images/clients/olay.png" },
  { name: "ZzzQuil NATURA",         logo: "/images/clients/zzzquil.png" },

  /* ── L'ORÉAL sub-brands ── */
  { name: "KÉRASTASE PARIS",        logo: "/images/clients/kerastase.png" },
  { name: "Kiehl's",                logo: "/images/clients/kiehls.png" },
  { name: "MATRIX",                 logo: "/images/clients/matrix.png" },
  { name: "BIOLAGE",                logo: "/images/clients/biolage.png" },
  { name: "CHERYL'S COSMECEUTICALS",logo: "/images/clients/cheryl.png" },

  /* ── GALDERMA sub-brands ── */
  { name: "Cetaphil",               logo: "/images/clients/cetaphil.png" },
  { name: "BILUMA",                 logo: "/images/clients/biluma.png" },

  /* ── NYKAA sub-brands ── */
  { name: "NYKAA Beauty",           logo: "/images/clients/nykaa-beauty.png" },
  { name: "Kay Beauty",             logo: "/images/clients/kaybeauty.png" },

  /* 7. OTHER GLOBAL, PRESTIGE & D2C BRANDS */
  { name: "ESTÉE LAUDER",           logo: "/images/clients/esteelauder.png" },
  { name: "benefit",                logo: "/images/clients/benefit.png" },
  { name: "LACTO CALAMINE",         logo: "/images/clients/lactocalamine.png" },
  { name: "sebamed",                logo: "/images/clients/sebamed.png" },
  { name: "plum",                   logo: "/images/clients/plum.png" },
  { name: "FOREST ESSENTIALS",      logo: "/images/clients/forest-essentials.png" },
  { name: "L'OCCITANE EN PROVENCE", logo: "/images/clients/loccitane.png" },
  { name: "LANEIGE",                logo: "/images/clients/laneige.png" },
  { name: "POND'S",                 logo: "/images/clients/ponds.png" },
  { name: "TRESemmé",               logo: "/images/clients/tresemme.png" },
  { name: "PALMOLIVE",              logo: "/images/clients/palmolive.png" },
  { name: "Bioré",                  logo: "/images/clients/biore.png" },
  { name: "mustela",                logo: "/images/clients/mustela.png" },
  { name: "Starbucks",              logo: "/images/clients/starbucks.png" },
  { name: "Kellogg's",              logo: "/images/clients/kelloggs.png" },
  { name: "Yakult",                 logo: "/images/clients/yakult.png" },
  { name: "FOREVERMARK",            logo: "/images/clients/forevermark.png" },
  { name: "KIMIRICA",               logo: "/images/clients/kimirica.png" },
  { name: "Nature's Basket",        logo: "/images/clients/natures-basket.png" },
  { name: "belif",                  logo: "/images/clients/belif.png" },
  { name: "TRUEFITT & HILL",        logo: "/images/clients/truefitt-hill.png" },
  { name: "The Beauty Co.",         logo: "/images/clients/the-beauty-co.png" },
  { name: "PARCOS",                 logo: "/images/clients/parcos.png" },
  { name: "SEREKO",                 logo: "/images/clients/sereko.png" },
  { name: "VANITY wagon",           logo: "/images/clients/vanity-wagon.png" },
  { name: "flormar",                logo: "/images/clients/flormar.png" },
  { name: "aroma magic",            logo: "/images/clients/aroma-magic.png" },
  { name: "Bharat Vedica",          logo: "/images/clients/bharat-vedica.png" },
  { name: "Olivia",                 logo: "/images/clients/olivia.png" },
  { name: "AptaGrow",               logo: "/images/clients/aptagrow.png" },
  { name: "WAFFLE MILL",            logo: "/images/clients/waffle-mill.png" },
  { name: "Ora d'oro Beauty",       logo: "/images/clients/oradoro.png" },
  { name: "ACELABS",                logo: "/images/clients/acelabs.png" },
  { name: "GLOBAL BEAUTY SECRETS",  logo: "/images/clients/global-beauty-secrets.png" },
  { name: "LOVECHILD masaba",       logo: "/images/clients/lovechild.png" },
];

/* ─── Stagger container ──────────────────────────────────────────────────────── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.9, rotateX: 8 },
  visible: {
    opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Size map: controls how large the logo image sits inside the card */
const SIZE_MAP = { small: '65%', default: '78%', large: '82%' };

/* ─── Single Logo Card — 3-D tilt + glow + shimmer ─────────────────────────── */
function LogoCard({ brand }) {
  const [imgOk, setImgOk] = useState(!!brand.logo);
  const cardRef = useRef(null);
  const imgSize = SIZE_MAP[brand.size] || SIZE_MAP.default;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]),  { stiffness: 280, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 280, damping: 24 });

  /* Glow background derived from mouse position */
  const glowBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.45) 0%, transparent 60%)`
  );

  function onMouseMove(e) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top)  / r.height);
  }
  function onMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover={{
        scale: 1.06,
        zIndex: 20,
        boxShadow: '0 16px 36px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.05)',
        borderColor: 'rgba(17,17,17,0.35)',
        backgroundColor: 'rgba(255,255,255,0.95)',
      }}
      whileTap={{ scale: 0.95 }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="client-logo-card group relative overflow-hidden"
    >
      {/* Cursor-tracked radial glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: glowBg }}
      />

      {/* Shimmer sweep */}
      <span className="client-logo-shimmer" />

      {/* Content */}
      {imgOk ? (
        <motion.img
          src={brand.logo}
          alt={brand.name}
          onError={() => setImgOk(false)}
          className="client-logo-img"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.35 }}
        />
      ) : (
        <motion.span
          className="client-logo-text"
          whileHover={{ letterSpacing: '0.13em', color: 'rgba(17,17,17,0.95)' }}
          transition={{ duration: 0.3 }}
        >
          {brand.name}
        </motion.span>
      )}
    </motion.div>
  );
}

/* ─── Single Unified Logo Grid ─────────────────────────────────────────────── */
function LogoGrid() {
  const [ref, inView] = useInView({ threshold: 0.02, rootMargin: '100px 0px', triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="client-logo-grid"
      variants={gridVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {CLIENTS.map((brand, i) => (
        <LogoCard key={brand.name + i} brand={brand} />
      ))}
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function ClientsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-[140px] pb-[80px] overflow-hidden bg-transparent">
        <BackgroundShapes variant="clients" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-[1360px] mx-auto px-8 md:px-12 relative z-10">
          <div className="flex items-center gap-4 text-[0.7rem] font-bold tracking-widest2 uppercase text-smoke mb-6">
            <span className="w-10 h-px bg-brand-navy/30 inline-block" />
            OUR CLIENTS
          </div>
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            textClassName="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.95] tracking-[-0.04em] mb-6 text-brand-navy"
          >
            OUR CLIENTS
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={0}
            blurStrength={2}
            textClassName="text-smoke text-lg max-w-xl leading-relaxed font-medium"
          >
            From skincare shelves to social feeds, we've partnered with brands to keep conversations brewing.
          </ScrollReveal>
        </div>
      </section>

      {/* Unified Clients Grid */}
      <section className="py-[60px] pb-[120px] border-b border-black/10 bg-transparent relative z-10">
        <div className="max-w-[1360px] mx-auto px-8 md:px-12">
          <LogoGrid />
        </div>
      </section>
    </>
  );
}
