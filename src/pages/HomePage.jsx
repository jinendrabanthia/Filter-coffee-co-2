import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import Logo from '../components/Logo';

const FEATURED_CLIENTS = [
  { name: "P&G", logo: "/images/clients/pg.png" },
  { name: "L'ORÉAL PARIS", logo: "/images/clients/loreal.png" },
  { name: "SEPHORA", logo: "/images/clients/sephora.png" },
  { name: "Starbucks", logo: "/images/clients/starbucks.png" },
  { name: "Cetaphil", logo: "/images/clients/cetaphil.png" },
  { name: "ESTÉE LAUDER", logo: "/images/clients/esteelauder.png" },
];

const SERVICES_PREVIEW = [
  {
    num: '01',
    title: 'Brand Strategy',
    desc: 'Uncovering the authentic tension and positioning that makes your brand stand out from day one.',
  },
  {
    num: '02',
    title: 'Creative Content & Design',
    desc: 'Social-first assets, visual identity, and thumb-stopping campaigns built for real engagement.',
  },
  {
    num: '03',
    title: 'Digital Marketing & Growth',
    desc: 'Data-informed distribution, influencer collaboration, and performance creative that converts.',
  },
];

export default function HomePage() {
  const outletCtx = useOutletContext();
  const setIsHomeIntro = outletCtx?.setIsHomeIntro;

  // Default to 'open' so all pages and full homepage content are immediately accessible without intro delay
  const [heroStage, setHeroStage] = useState('open');

  useEffect(() => {
    const handleReplayIntro = () => {
      setHeroStage('intro');
      setIsHomeIntro?.(true);
    };
    window.addEventListener('fcc_replay_intro', handleReplayIntro);
    return () => window.removeEventListener('fcc_replay_intro', handleReplayIntro);
  }, [setIsHomeIntro]);

  const handleStageChange = (newStage) => {
    setHeroStage(newStage);
    setIsHomeIntro?.(newStage === 'intro');
  };

  const isUnlocked = heroStage === 'open' || heroStage === 'opening';

  return (
    <main className="bg-[#BFE9FF] overflow-hidden">
      {/* 1. HERO (Interactive Box Intro -> Continuous Morphing Opening -> Stage Three Hero) */}
      <Hero onStageChange={handleStageChange} />

      {/* REMAINDER OF HOMEPAGE (Unlocked upon box opening) */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            key="homepage-unlocked-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: heroStage === 'opening' ? 4.8 : 0 }}
          >
            {/* 2. TRANSITION STRIP */}
            <section className="bg-[#111111] py-14 px-6 md:px-12 text-center relative z-10 border-y border-[#111111]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <p className="text-[#BFE9FF] text-[0.7rem] font-bold tracking-[0.24em] uppercase mb-3">
                  WHAT COMES NEXT
                </p>
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
                  BUT A GOOD IDEA IS ONLY THE BEGINNING.
                </h2>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 text-white border-b-2 border-[#2563EB] hover:text-[#BFE9FF] hover:border-[#BFE9FF] text-[0.78rem] font-bold tracking-[0.16em] uppercase pb-1 transition-colors"
                >
                  <span>EXPLORE OUR WORK</span>
                  <span className="text-sm">↗</span>
                </Link>
              </motion.div>
            </section>

            {/* 3. CLIENT SHOWCASE */}
            <section className="bg-[#F7F5EF] py-16 sm:py-20 px-4 sm:px-6 md:px-12 border-b border-[#111111]/10">
              <div className="max-w-[1360px] mx-auto text-center">
                <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#111111]/60 mb-8 sm:mb-12">
                  GOOD COMPANY. BRANDS WE'VE WORKED WITH.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 items-center">
                  {FEATURED_CLIENTS.map((client) => (
                    <motion.div
                      key={client.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-[#111111]/10 rounded-xl p-3 sm:p-4 h-24 sm:h-28 flex items-center justify-center shadow-sm hover:border-[#2563EB] hover:shadow-md transition-all group overflow-hidden"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        className="w-full h-full max-h-[60%] max-w-[70%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'block';
                        }}
                      />
                      <span className="hidden text-xs font-bold uppercase tracking-wider text-[#111111]/70 group-hover:text-[#2563EB]">
                        {client.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 sm:mt-12">
                  <Link
                    to="/clients"
                    className="inline-flex items-center gap-2 text-[0.74rem] font-bold tracking-[0.18em] uppercase text-[#111111] hover:text-[#2563EB] transition-colors py-2"
                  >
                    <span>VIEW ALL 52 CLIENT BRANDS</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* 4. CONCISE SERVICES INTRO */}
            <section className="bg-[#BFE9FF] py-16 sm:py-24 px-4 sm:px-6 md:px-12 border-b border-[#111111]/10">
              <div className="max-w-[1360px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
                  <div>
                    <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#111111]/60 mb-3 sm:mb-4">
                      OUR TOOLKIT
                    </p>
                    <h2
                      className="font-black text-[#111111] leading-[0.94] tracking-[-0.03em] uppercase"
                      style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
                    >
                      BIG IDEAS NEED<br />MORE THAN JUST<br />GOOD INTENTIONS.
                    </h2>
                  </div>
                  <Link
                    to="/services"
                    className="shrink-0 inline-flex items-center gap-2 bg-[#111111] hover:bg-[#2563EB] text-white text-[0.75rem] font-bold tracking-[0.16em] uppercase px-7 py-3.5 rounded-full transition-all shadow-md hover:scale-[1.02] w-fit"
                  >
                    <span>VIEW ALL SERVICES</span>
                    <span>↗</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {SERVICES_PREVIEW.map((s) => (
                    <motion.div
                      key={s.num}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white/80 border border-[#111111]/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-sm hover:border-[#2563EB] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[#2563EB] font-black text-sm tracking-[0.2em] block mb-3 sm:mb-4">
                          {s.num}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#111111] mb-2 sm:mb-3 leading-snug">
                          {s.title}
                        </h3>
                        <p className="text-[#111111]/75 text-sm md:text-base leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. SHORT ABOUT INTRO */}
            <section className="bg-[#F7F5EF] py-16 sm:py-24 px-4 sm:px-6 md:px-12 border-b border-[#111111]/10">
              <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-8">
                  <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#111111]/60 mb-3 sm:mb-4">
                    THE PHILOSOPHY
                  </p>
                  <h2
                    className="font-black text-[#111111] leading-[0.94] tracking-[-0.03em] uppercase mb-4 sm:mb-6"
                    style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
                  >
                    A LITTLE DIFFERENT.<br />THAT'S THE WHOLE POINT.
                  </h2>
                  <p className="text-[#111111]/80 text-base md:text-lg max-w-2xl font-medium leading-relaxed mb-6 sm:mb-8">
                    We're a creative marketing agency that enjoys challenging the ordinary,
                    finding unexpected ideas and building brands with something to say.
                    We don't believe every brand should look or sound the same.
                  </p>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 border-2 border-[#111111] hover:border-[#2563EB] text-[#111111] hover:text-[#2563EB] text-[0.75rem] font-black tracking-[0.16em] uppercase px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] w-fit"
                  >
                    <span>MEET THE TEAM & BELIEFS</span>
                    <span>↗</span>
                  </Link>
                </div>

                <div className="md:col-span-4 flex justify-center md:justify-end">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-3xl bg-[#2563EB] flex flex-col items-center justify-center p-6 text-white text-center shadow-xl rotate-2 hover:rotate-0 transition-transform duration-300">
                    <span className="text-3xl sm:text-4xl mb-2 font-black">✳</span>
                    <Logo size="text-xs sm:text-sm md:text-base" textColor="#FFFFFF" className="mb-1" />
                    <span className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-white/80 font-mono mt-1">EST. MUMBAI</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. CONTACT CTA — pure black text on electric blue */}
            <section className="bg-[#2563EB] py-16 sm:py-24 px-4 sm:px-6 md:px-12 text-center text-[#111111] relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <p className="text-[#111111] text-[0.72rem] font-black tracking-[0.24em] uppercase mb-3 sm:mb-4">
                  START A CONVERSATION
                </p>
                <h2
                  className="font-black text-[#111111] leading-[0.92] tracking-[-0.03em] uppercase mb-6 sm:mb-8"
                  style={{ fontSize: 'clamp(2.3rem, 6vw, 5.5rem)' }}
                >
                  READY TO START<br />SOMETHING?
                </h2>
                <p className="text-[#111111] text-base md:text-lg mb-8 sm:mb-10 max-w-xl mx-auto font-semibold">
                  Have an idea, a business or a brand ready for something different? We're listening.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#111111] text-white hover:bg-white hover:text-[#111111] text-[0.8rem] font-black tracking-[0.16em] uppercase px-8 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <span>GET IN TOUCH</span>
                  <span className="text-sm">↗</span>
                </Link>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
