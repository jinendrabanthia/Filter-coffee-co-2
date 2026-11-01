import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import ScrollFloat from '../components/ScrollFloat';
import ScrollReveal from '../components/ScrollReveal';
import FadeSlideSection from '../components/FadeSlideSection';

/* ─── All 52 Genuine Client Brands ─────────────────────────────────────────── */
const CLIENTS = [
  /* ── The 6 parent companies ── */
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

  /* ── OTHER GLOBAL, PRESTIGE & D2C BRANDS ── */
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

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Flat, Simple Logo Card (No 3D tilt per requirement) ──────────────────── */
function LogoCard({ brand }) {
  const [imgOk, setImgOk] = useState(!!brand.logo);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -3, borderColor: '#2563EB', backgroundColor: '#ffffff', boxShadow: '0 8px 24px rgba(37, 99, 235, 0.08)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white border border-[#111111]/10 rounded-xl p-3 sm:p-4 flex items-center justify-center aspect-[4/3] group transition-all duration-300 relative shadow-sm overflow-hidden"
    >
      {imgOk ? (
        <img
          src={brand.logo}
          alt={brand.name}
          onError={() => setImgOk(false)}
          loading="lazy"
          className="w-full h-full max-h-[60%] max-w-[70%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 pointer-events-none select-none"
        />
      ) : (
        <span className="text-sm font-bold uppercase tracking-wider text-[#111111]/70 text-center group-hover:text-[#2563EB] transition-colors">
          {brand.name}
        </span>
      )}
    </motion.div>
  );
}

function LogoGrid() {
  const [ref, inView] = useInView({ threshold: 0.02, rootMargin: '60px 0px', triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5"
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

export default function ClientsPage() {
  return (
    <div className="bg-[#F7F5EF] min-h-screen text-[#111111]">
      {/* Page Hero */}
      <FadeSlideSection className="relative pt-[140px] pb-[70px] overflow-hidden bg-[#F7F5EF] border-b border-[#111111]/10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-4">
              THE COMPANY WE KEEP
            </p>
            <ScrollFloat
              textClassName="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.96] tracking-[-0.03em] uppercase mb-8 text-[#111111]"
              animationDuration={1.6}
              stagger={0.02}
            >
              GOOD COMPANY. GOOD CREATIVE WORK.
            </ScrollFloat>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur
              baseRotation={0}
              blurStrength={2}
              textClassName="text-[#111111]/80 text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
            >
              From skincare shelves to social feeds, we've partnered with brands to keep conversations brewing.
            </ScrollReveal>
          </div>
        </div>
      </FadeSlideSection>

      {/* Flat Unified Clients Grid */}
      <FadeSlideSection className="py-20 md:py-24 bg-[#F7F5EF] relative z-10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12">
          <LogoGrid />
        </div>
      </FadeSlideSection>

      {/* Closing Transition Strip */}
      <FadeSlideSection className="bg-[#111111] py-16 px-6 md:px-12 text-center text-white border-t border-[#111111] relative z-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#BFE9FF] text-[0.7rem] font-bold tracking-[0.22em] uppercase mb-4">
            LET'S COLLABORATE
          </p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-8 !text-white" style={{ color: '#ffffff' }}>
            READY TO JOIN OUR ROSTER OF AMBITIOUS BRANDS?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-white hover:text-[#111111] text-white text-[0.78rem] font-black tracking-[0.16em] uppercase px-8 py-4 rounded-full transition-all shadow-md"
          >
            <span>START A PROJECT</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </FadeSlideSection>
    </div>
  );
}
