import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Filter Coffee Co. — 6-Second Mobile-First Logo Loader
 *
 * SPECIFICATIONS:
 * 1. Background: Pure White (#FFFFFF).
 * 2. Artwork: Exact official trademark logo (2048 x 220 high-res master).
 * 3. Outline: Crisp black (#111111), thin stroke, inside of letters pure white.
 * 4. Fill animation: Exactly 6.0 seconds total, word-by-word ink rise from bottom to top:
 *    - 00–02s: FILTER fills with solid black (#111111); COFFEE and co. remain outline.
 *    - 02–04s: FILTER solid black; COFFEE fills with solid black; co. remains outline.
 *    - 04–06s: FILTER and COFFEE solid black; co. fills with solid black.
 *    - At 6.0s: All three words are completely solid black.
 * 5. Completion:
 *    - Full black logo held briefly (0.6s).
 *    - White loader fades out smoothly (0.8s) via AnimatePresence.
 *    - Reveals the Stage One Closed Box Introduction.
 * 6. Mobile-first:
 *    - Centered horizontally and vertically in 100dvh viewport.
 *    - Width: clamp(250px, 80vw, 680px) preserving exact 2048:220 aspect ratio.
 *    - Zero horizontal overflow, no extra decorative graphics, spinners, or progress bars.
 * 7. Accessibility & Session:
 *    - Shown once per browser session via sessionStorage.
 *    - Immediate full logo reveal for prefers-reduced-motion.
 */
// Module-scoped session flag:
// - Automatically resets to false on hard refresh (Ctrl+F5), soft refresh, or fresh visit
// - Stays true during internal React Router client navigation between pages
let hasLoadedInSession = false;

export default function LogoLoader({ onComplete, forceShow = false }) {
  // Synchronous initialization so the pure white overlay renders on frame 0 with ZERO flicker
  const [shouldRender, setShouldRender] = useState(() => {
    if (forceShow) return true;
    return !hasLoadedInSession;
  });
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Clear legacy sessionStorage flag if any
    try {
      sessionStorage.removeItem('fcc_loader_seen');
    } catch (e) {}

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // If already loaded in this SPA session and not forced, complete immediately
    if (hasLoadedInSession && !forceShow) {
      onComplete?.();
      return;
    }

    // Mark as loaded for subsequent client-side route navigations
    hasLoadedInSession = true;
  }, [forceShow, onComplete]);

  useEffect(() => {
    if (!shouldRender) return;

    if (prefersReducedMotion) {
      // Reduced motion: show completed logo for 0.8s, then fade out
      const holdTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 800);
      const exitTimer = setTimeout(() => {
        setShouldRender(false);
        onComplete?.();
      }, 1600);
      return () => {
        clearTimeout(holdTimer);
        clearTimeout(exitTimer);
      };
    }

    // Normal 6.0s animation + 0.6s hold = 6.6s start fadeout
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 6600);

    // Fade duration 0.8s -> unmount at 7.4s
    const exitTimer = setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, 7400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(exitTimer);
    };
  }, [shouldRender, prefersReducedMotion, onComplete]);

  // Support replaying the loader via custom event if desired
  useEffect(() => {
    const handleReplay = () => {
      setIsFadingOut(false);
      setShouldRender(true);
    };
    window.addEventListener('fcc_replay_loader', handleReplay);
    return () => window.removeEventListener('fcc_replay_loader', handleReplay);
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          key="fcc-logo-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[99999] bg-[#FFFFFF] flex items-center justify-center select-none overflow-hidden touch-none p-4"
          aria-label="Filter Coffee Co. Loading"
          role="status"
        >
          {/* Responsive Logo Container: 78% of viewport width on mobile, capped at 680px on desktop */}
          <div
            className="relative mx-auto flex items-center justify-center flex-shrink-0"
            style={{
              width: '78vw',
              maxWidth: '680px',
            }}
          >
            {/* 1. BASE OUTLINE LAYER (Visible from 0.0s onward: thin black outline with pure white inside; establishes natural dimensions) */}
            <img
              src="/images/fcc-trademark-outline-2x.png"
              alt=""
              className="block w-full h-auto pointer-events-none select-none z-10"
              draggable={false}
            />

            {/* 2. RISING FILL LAYERS (Ink filling from bottom to top, word by word) */}
            {!prefersReducedMotion ? (
              <>
                {/* WORD 1: FILTER (fills 00s – 02s, remains 100% black thereafter) */}
                <img
                  src="/images/fcc-trademark-logo-2x.png"
                  alt=""
                  className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 fcc-anim-filter"
                  draggable={false}
                />

                {/* WORD 2: COFFEE (outline 00–02s, fills 02s – 04s, remains 100% black thereafter) */}
                <img
                  src="/images/fcc-trademark-logo-2x.png"
                  alt=""
                  className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 fcc-anim-coffee"
                  draggable={false}
                />

                {/* WORD 3: co. (outline 00–04s, fills 04s – 06s, solid black at 06s) */}
                <img
                  src="/images/fcc-trademark-logo-2x.png"
                  alt=""
                  className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 fcc-anim-co"
                  draggable={false}
                />
              </>
            ) : (
              /* Reduced motion: instant solid black logo */
              <img
                src="/images/fcc-trademark-logo-2x.png"
                alt="Filter Coffee Co."
                className="absolute inset-0 w-full h-full pointer-events-none select-none z-20"
                draggable={false}
              />
            )}

            {/* 3. TOP OUTLINE LAYER (Guarantees the thin black outline stays visible and sharp at all times) */}
            <img
              src="/images/fcc-trademark-outline-2x.png"
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none select-none z-30"
              draggable={false}
            />
          </div>

          {/* Scoped CSS for the 6-second bottom-to-top ink animations */}
          <style>{`
            /* WORD 1: FILTER (x: 0% to 39.45%) */
            /* 0s to 2s: bottom-to-top fill (0% to 33.333% of 6s) */
            @keyframes fccFillFilter {
              0% {
                clip-path: inset(100% 60.55% 0% 0%);
              }
              33.333% {
                clip-path: inset(0% 60.55% 0% 0%);
              }
              100% {
                clip-path: inset(0% 60.55% 0% 0%);
              }
            }

            /* WORD 2: COFFEE (x: 39.45% to 86.03%) */
            /* 0s to 2s: empty; 2s to 4s: bottom-to-top fill (33.333% to 66.667% of 6s) */
            @keyframes fccFillCoffee {
              0%, 33.333% {
                clip-path: inset(100% 13.97% 0% 39.45%);
              }
              66.667% {
                clip-path: inset(0% 13.97% 0% 39.45%);
              }
              100% {
                clip-path: inset(0% 13.97% 0% 39.45%);
              }
            }

            /* WORD 3: co. (x: 86.03% to 100%) */
            /* 0s to 4s: empty; 4s to 6s: bottom-to-top fill (66.667% to 100% of 6s) */
            @keyframes fccFillCo {
              0%, 66.667% {
                clip-path: inset(100% 0% 0% 86.03%);
              }
              100% {
                clip-path: inset(0% 0% 0% 86.03%);
              }
            }

            .fcc-anim-filter {
              animation: fccFillFilter 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
              will-change: clip-path;
            }

            .fcc-anim-coffee {
              animation: fccFillCoffee 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
              will-change: clip-path;
            }

            .fcc-anim-co {
              animation: fccFillCo 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
              will-change: clip-path;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
