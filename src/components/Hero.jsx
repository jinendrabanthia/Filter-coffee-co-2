import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveBox from './InteractiveBox';

/**
 * Hero Component — Interactive Box Introduction & Complete Homepage Experience
 *
 * STAGE ONE (Intro):
 * - Follows Image 1 layout with Image 2's Sky Blue (#BFE9FF) palette.
 * - Centered closed cardboard shipping box with cobalt tape & "Knock, knock! Who's dis?" tag.
 * - Headline: "THINK OUTSIDE THE BOX."
 * - Supporting copy: "Every great idea starts with a little curiosity."
 * - CTA: "OPEN THE BOX ↗" (and "GO ON. TAKE A LOOK." instruction).
 * - Box itself is clickable with interactive hover cues.
 * - "SKIP INTRO ↗" button provided.
 *
 * STAGE TWO (Opening):
 * - Continuous, smooth physical morph.
 * - Packaging tape separates.
 * - 4 top flaps unfold individually.
 * - Creative elements (Tangerine star, Acid Lime asterisk, Cobalt F, sparks) erupt from inside.
 * - Box glides from screen-center to the right side of desktop hero.
 * - Intro headline smoothly transitions away.
 * - Actual homepage headline ("YOUR BRAND WAS NEVER MEANT TO FIT IN.") appears on left.
 *
 * STAGE THREE (Final Homepage):
 * - Exactly matches Image 2 (Electric Blue direction).
 * - Left (~55%): Label, oversized headline, copy, "OUR WORK ↗", "LET'S TALK ↗".
 * - Right (~45%): The exact same open box with emerging creative shapes.
 * - Subtly allows replaying the intro via a "↺ REPLAY INTRO" trigger.
 */
export default function Hero({ onStageChange }) {
  // Default to 'open' so homepage is immediately visible and browsable
  const [stage, setStage] = useState('open');
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    onStageChange?.(stage);
  }, [stage, onStageChange]);

  // Listen for logo click from Navbar to reset to intro
  useEffect(() => {
    const handleReplayIntro = () => {
      setIsOpening(false);
      setStage('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('fcc_replay_intro', handleReplayIntro);
    return () => window.removeEventListener('fcc_replay_intro', handleReplayIntro);
  }, []);

  const handleOpen = () => {
    if (stage === 'open' || isOpening) return;
    setIsOpening(true);
    setStage('opening');

    // 5 seconds smooth travel time from middle to right side
    setTimeout(() => {
      setStage('open');
      setIsOpening(false);
    }, 5000);
  };

  const handleSkip = () => {
    setIsOpening(false);
    setStage('open');
  };

  const handleReplay = () => {
    setIsOpening(false);
    setStage('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isOpen = stage === 'open';
  const isIntro = stage === 'intro';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-[85px] sm:pt-[90px] pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#BFE9FF]"
    >
      <div className="max-w-[1360px] mx-auto w-full relative z-10">
        {/* ═══════════════════════════════════════════════════════════════════
            STAGE ONE: THE CLOSED BOX INTRODUCTION (Follows Image 1 Layout)
            ═══════════════════════════════════════════════════════════════════ */}
        {isIntro && (
          <motion.div
            key="stage-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25, transition: { duration: 0.8, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-2 sm:py-4 w-full"
          >
            {/* Centered Closed Cardboard Shipping Box (Enlarged) */}
            <motion.div
              layoutId="brand-box"
              transition={{ duration: 5.0, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 relative flex items-center justify-center w-full max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[540px]"
            >
              <InteractiveBox
                isOpen={false}
                isOpening={isOpening}
                onOpen={handleOpen}
              />
            </motion.div>

            {/* Stage One Headline: Fluid responsive scale, prevents overflow on 320px-360px */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-black text-[#111111] leading-none tracking-[-0.035em] uppercase mb-3 text-center w-full select-none"
              style={{ fontSize: 'clamp(1.2rem, 5.4vw, 4.4rem)' }}
            >
              <span className="inline-block sm:whitespace-nowrap">THINK OUTSIDE THE BOX.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[#111111]/85 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed mb-2 px-2"
            >
              Every great idea starts with a little curiosity.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#111111]/60 mb-6 px-2"
            >
              WE'RE A CREATIVE AGENCY. AND WE LIKE THINKING DIFFERENTLY.
            </motion.p>

            {/* Primary Interactive CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center gap-2.5"
            >
              <button
                onClick={handleOpen}
                className="group inline-flex items-center gap-3 bg-[#111111] hover:bg-[#2563EB] text-white text-[0.82rem] font-black tracking-[0.16em] uppercase px-8 sm:px-10 py-3.5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <span>OPEN THE BOX</span>
                <span className="text-base group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ↗
                </span>
              </button>

              <span className="text-[0.66rem] font-bold tracking-[0.18em] uppercase text-[#111111]/50">
                GO ON. TAKE A LOOK.
              </span>

              {/* Bouncing down indicator */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#111111]/40 mt-1"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            STAGE THREE: FINAL HOMEPAGE (Follows Image 2 Layout)
            ═══════════════════════════════════════════════════════════════════ */}
        {(isOpen || stage === 'opening') && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center py-4 sm:py-6 w-full">
            {/* Left Column: Homepage Headline & Content (~55%) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 2.8,
                delay: stage === 'opening' ? 1.8 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:col-span-7 lg:col-span-6 flex flex-col items-start justify-center text-left"
            >
              {/* Small Introductory Label */}
              <div className="flex items-center gap-3 text-[0.68rem] sm:text-[0.7rem] font-bold tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#111111]/70 mb-4 sm:mb-6">
                <span className="w-6 h-[2px] bg-[#2563EB]" />
                <span>INDEPENDENT CREATIVE & MARKETING AGENCY.</span>
              </div>

              {/* Main Homepage Headline */}
              <h1
                className="font-black text-[#111111] leading-[0.92] tracking-[-0.04em] uppercase mb-6 sm:mb-8"
                style={{ fontSize: 'clamp(2.1rem, 6.2vw, 5.8rem)' }}
              >
                YOUR BRAND WAS NEVER MEANT TO <span className="sm:whitespace-nowrap">FIT IN.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-[#111111]/85 text-base md:text-lg max-w-xl font-medium leading-relaxed mb-8 sm:mb-10">
                We find what makes your business different and turn it into a brand
                people notice, recognise and remember.
              </p>

              {/* Clean CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2563EB] text-white text-[0.78rem] font-black tracking-[0.14em] uppercase px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
                >
                  <span>OUR WORK</span>
                  <span className="text-sm">→</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#111111] hover:border-[#2563EB] text-[#111111] hover:text-[#2563EB] text-[0.78rem] font-black tracking-[0.14em] uppercase px-7 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
                >
                  <span>LET'S TALK</span>
                  <span className="text-sm">↗</span>
                </Link>

                {/* Replay Intro Trigger */}
                <button
                  onClick={handleReplay}
                  title="Replay interactive introduction"
                  className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#111111]/50 hover:text-[#2563EB] transition-colors py-2 mx-auto sm:ml-2 sm:mx-0"
                >
                  <span>↺</span>
                  <span>REPLAY INTRO</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: The Same Open Box Illustration (~45-50%) */}
            <motion.div
              layoutId="brand-box"
              transition={{ duration: 5.0, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 lg:col-span-6 flex items-center justify-center md:justify-end w-full mt-4 md:mt-0"
            >
              <div className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[540px]">
                <InteractiveBox
                  isOpen={isOpen}
                  isOpening={isOpening}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
