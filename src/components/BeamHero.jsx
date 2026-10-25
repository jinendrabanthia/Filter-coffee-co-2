import { useEffect, useRef, useState, useCallback } from 'react';
import ParticleText from './ParticleText';

/**
 * BeamHero — Generative Spectral Prism Light Beam Hero for Filter Coffee Co.
 *
 * Cinematic Choreographed Intro Sequence (5–7 seconds total):
 * 1. 0.0s – 1.6s: "filter coffee co." slides in from the left side of the window (-120vw).
 * 2. 1.8s – 3.0s: Tagline "Creativity looks different from here." glides up & reveals beneath it.
 * 3. 2.8s – 3.8s: The glowing chromatic origin circle blooms and fades in on the dot.
 * 4. 3.6s – 6.0s: The spectral prism beam projects out of the circle from left to right (fading in simultaneously).
 * 5. 5.4s – 6.4s: Floating controls and scroll indicator smoothly fade into view.
 *
 * Performance Optimizations:
 * - Zero forced-layout thrashing via cached origin dot calculations.
 * - IntersectionObserver pauses the RAF loop (0% CPU/GPU) when scrolled out of view.
 * - Page Visibility API pauses rendering when tab is hidden.
 * - Hardware-accelerated canvas compositing and DPR clamping.
 */

const PALETTES = [
  // 0: Cyber Sunrise (Cyan, Hot Pink, Sunset Orange, Amber Gold)
  [[20, 207, 233], [247, 49, 165], [255, 119, 61], [255, 209, 83]],
  // 1: Electric Prism (Royal Indigo, Sky Aqua, Rose Magenta, Tangerine)
  [[106, 110, 255], [42, 215, 229], [255, 66, 163], [255, 162, 72]],
  // 2: Sunset Neon (Deep Pink, Coral, Warm Sun, Electric Mint)
  [[255, 66, 140], [255, 102, 77], [255, 213, 93], [76, 220, 236]]
];

export default function BeamHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const dotRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(0);

  // React state for DOM element choreographed animations
  const [introState, setIntroState] = useState({
    fccIn: false,
    taglineIn: false,
    circleIn: false,
    uiIn: false
  });

  // Mutable animation state references to avoid React re-renders in 60fps loop
  const animRef = useRef({
    rafId: null,
    isVisible: true,
    isTabActive: true,
    startTime: 0,
    lastTime: 0,
    t: 0,
    pulse: 0,
    paletteIdx: 0,
    origin: { x: 440, y: 270 },
    pointer: { x: 0, y: 0, currentY: 0, active: false },
    dpr: 1,
    width: 0,
    height: 0
  });

  // Recalculate cached origin dot position without calling it in the 60fps draw loop
  const updateCachedOrigin = useCallback(() => {
    if (!dotRef.current || !containerRef.current) return;
    const dotRect = dotRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const ox = dotRect.left - containerRect.left + dotRect.width / 2;
    const oy = dotRect.top - containerRect.top + dotRect.height / 2;

    // Only update if ox is on-screen (not during off-screen -120vw slide-in)
    if (ox > 100) {
      animRef.current.origin = { x: ox, y: oy };
    }
  }, []);

  // Cycle palette with chromatic burst pulse
  const triggerBurst = useCallback(() => {
    setPaletteIndex((prev) => {
      const next = (prev + 1) % PALETTES.length;
      animRef.current.paletteIdx = next;
      animRef.current.pulse = 1.0;
      return next;
    });
  }, []);

  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);

  const openCinemaModal = useCallback((e) => {
    e?.stopPropagation();
    setCinemaModalOpen(true);
  }, []);

  const closeCinemaModal = useCallback((e) => {
    e?.stopPropagation();
    setCinemaModalOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && cinemaModalOpen) {
        setCinemaModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cinemaModalOpen]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch {
      // Fallback if browser fullscreen policy blocks
    }
  }, []);

  // Smooth scroll down to next section
  const handleScrollClick = (e) => {
    e.preventDefault();
    const nextElem = document.getElementById('work') || document.querySelector('section:nth-of-type(2)');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      setTimeout(updateCachedOrigin, 150);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [updateCachedOrigin]);

  // Choreographed DOM Intro Timeline Trigger
  useEffect(() => {
    // 1. FCC slides in immediately from the left side of window (-120vw)
    const t1 = setTimeout(() => {
      setIntroState((s) => ({ ...s, fccIn: true }));
      // Re-cache origin as FCC arrives at its resting place
      setTimeout(updateCachedOrigin, 700);
      setTimeout(updateCachedOrigin, 1300);
      setTimeout(updateCachedOrigin, 1700);
    }, 100);

    // 2. Tagline reveals beneath FCC at 1.8s
    const t2 = setTimeout(() => {
      setIntroState((s) => ({ ...s, taglineIn: true }));
    }, 1800);

    // 3. Color circle blooms on dot at 2.8s
    const t3 = setTimeout(() => {
      setIntroState((s) => ({ ...s, circleIn: true }));
    }, 2800);

    // 4. UI Controls and scroll indicators reveal at 5.4s
    const t4 = setTimeout(() => {
      setIntroState((s) => ({ ...s, uiIn: true }));
    }, 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [updateCachedOrigin]);

  // Main Canvas Setup and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const state = animRef.current;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const W = rect.width || window.innerWidth;
      const H = rect.height || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      state.width = W;
      state.height = H;
      state.dpr = dpr;

      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!state.pointer.active) {
        state.pointer.x = W * 0.78;
        state.pointer.y = H * 0.5;
        state.pointer.currentY = H * 0.5;
      }

      updateCachedOrigin();
    };

    handleResize();

    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    // Core Animation Frame Loop
    const draw = (now) => {
      if (!state.isVisible || !state.isTabActive) {
        state.rafId = null;
        return;
      }

      if (state.startTime === 0) {
        state.startTime = now;
      }

      const elapsed = (now - state.startTime) / 1000;
      const dt = Math.min(0.05, (now - state.lastTime) / 1000);
      state.lastTime = now;
      state.t += dt;

      // Exponential decay for pulse
      state.pulse *= Math.pow(0.05, dt);

      const W = state.width;
      const H = state.height;

      ctx.clearRect(0, 0, W, H);

      const o = state.origin;
      const t = state.t;
      const pulse = state.pulse;
      const palette = PALETTES[state.paletteIdx];

      // --- CHOREOGRAPHY PROGRESSION CALCULATIONS ---
      // Step 3: Color circle on dot fades in from 2.8s to 3.8s (1.0s duration)
      const circleProgRaw = Math.min(1, Math.max(0, (elapsed - 2.8) / 1.0));
      const circleEase = circleProgRaw * circleProgRaw * (3 - 2 * circleProgRaw); // Smooth cubic

      // Step 4: Beam projects eastward from dot from 3.6s to 6.0s (2.4s duration)
      const beamProgRaw = Math.min(1, Math.max(0, (elapsed - 3.6) / 2.4));
      // Ease out cubic for cinematic beam forward thrust
      const beamEase = 1 - Math.pow(1 - beamProgRaw, 2.5);

      // Smooth pointer lerp
      const idleY = H * (0.48 + 0.04 * Math.sin(t * 0.55));
      const targetYGoal = state.pointer.active ? state.pointer.y : idleY;
      state.pointer.currentY += (targetYGoal - state.pointer.currentY) * 0.14;
      const targetY = state.pointer.currentY;

      const spread = H * (0.56 + 0.035 * Math.sin(t * 0.8) + pulse * 0.08);
      const xEnd = W + 30;
      const drift = (targetY - o.y) * 0.18;
      const topY = o.y - spread * 0.58 + drift;
      const botY = o.y + spread * 0.58 + drift;

      // 1. RENDER PROJECTED BEAM (Emerges from dot from left to right as beamEase > 0)
      if (beamEase > 0) {
        const currentXEnd = o.x + (xEnd - o.x) * beamEase;
        const beamAlpha = Math.min(1, beamEase * 1.5);

        ctx.save();
        // Project strictly from origin dot towards right edge by clipping the projection bounds
        ctx.beginPath();
        ctx.rect(o.x, 0, Math.max(0, currentXEnd - o.x + 30), H);
        ctx.clip();

        // 1A. Soft atmospheric base glow
        try {
          const glow = ctx.createRadialGradient(W * 0.82, targetY, 0, W * 0.82, targetY, Math.max(W, H) * 0.58);
          glow.addColorStop(0, `rgba(255,96,166,${0.14 * beamAlpha})`);
          glow.addColorStop(0.45, `rgba(255,185,86,${0.07 * beamAlpha})`);
          glow.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = glow;
          ctx.fillRect(0, 0, W, H);
        } catch {
          // Safe fallback
        }

        // 1B. Layered spectral ribbons
        const bands = [
          { c: palette[0], a: 0.78 * beamAlpha, y1: topY, y2: o.y - spread * 0.09 },
          { c: palette[3], a: 0.78 * beamAlpha, y1: o.y - spread * 0.28, y2: o.y + 0.02 * spread },
          { c: palette[2], a: 0.76 * beamAlpha, y1: o.y - spread * 0.06, y2: o.y + 0.20 * spread },
          { c: palette[1], a: 0.86 * beamAlpha, y1: o.y + 0.02 * spread, y2: botY },
          { c: palette[0], a: 0.52 * beamAlpha, y1: o.y + 0.22 * spread, y2: botY + spread * 0.14 }
        ];

        bands.forEach((b, i) => {
          const wobble = Math.sin(t * (0.7 + i * 0.11) + i * 1.8) * 18;
          ctx.save();
          if (ctx.filter !== undefined) {
            ctx.filter = 'blur(14px)';
          }
          ctx.beginPath();
          ctx.moveTo(o.x, o.y + wobble * 0.08);
          ctx.lineTo(xEnd, b.y1 + wobble);
          ctx.lineTo(xEnd, b.y2 + wobble * 0.6);
          ctx.closePath();

          try {
            const g = ctx.createLinearGradient(o.x, o.y, xEnd, targetY);
            g.addColorStop(0, rgba(b.c, 0.02));
            g.addColorStop(0.16, rgba(b.c, b.a * 0.9));
            g.addColorStop(0.58, rgba(b.c, b.a));
            g.addColorStop(1, rgba(b.c, b.a * 0.48));
            ctx.fillStyle = g;
            ctx.fill();
          } catch {
            // Safe fallback
          }
          ctx.restore();
        });

        // 1C. Brighter prismatic core
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        if (ctx.filter !== undefined) {
          ctx.filter = 'blur(7px)';
        }
        try {
          const core = ctx.createLinearGradient(o.x, o.y, W, targetY);
          core.addColorStop(0, `rgba(255,255,255,${0.95 * beamAlpha})`);
          core.addColorStop(0.12, `rgba(255,93,170,${0.85 * beamAlpha})`);
          core.addColorStop(0.38, `rgba(255,122,52,${0.58 * beamAlpha})`);
          core.addColorStop(0.72, `rgba(55,213,236,${0.4 * beamAlpha})`);
          core.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath();
          ctx.moveTo(o.x, o.y - 2);
          ctx.lineTo(xEnd, targetY - spread * 0.10);
          ctx.lineTo(xEnd, targetY + spread * 0.10);
          ctx.lineTo(o.x, o.y + 2);
          ctx.closePath();
          ctx.fillStyle = core;
          ctx.fill();
        } catch {
          // Safe fallback
        }
        ctx.restore();

        ctx.restore(); // Restore from clipping mask
      }

      // 2. RENDER ORIGIN SPARKLE / CHROMATIC CIRCLE BLOOM (Fades in from 2.8s onwards)
      if (circleEase > 0) {
        const rr = (8 + 2 * Math.sin(t * 2.1) + pulse * 7) * circleEase;
        try {
          const rg = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, rr * 3.7);
          rg.addColorStop(0, `rgba(255,255,255,${circleEase})`);
          rg.addColorStop(0.12, `rgba(255,205,82,${circleEase * 0.95})`);
          rg.addColorStop(0.34, `rgba(255,83,168,${circleEase * 0.85})`);
          rg.addColorStop(0.56, `rgba(45,217,238,${circleEase * 0.62})`);
          rg.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.arc(o.x, o.y, rr * 3.7, 0, Math.PI * 2);
          ctx.fill();
        } catch {
          // Fallback
        }
      }

      state.rafId = requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      if (!state.rafId && state.isVisible && state.isTabActive) {
        state.lastTime = performance.now();
        state.rafId = requestAnimationFrame(draw);
      }
    };

    const stopAnimation = () => {
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
        state.rafId = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        state.isVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateCachedOrigin();
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      state.isTabActive = !document.hidden;
      if (!document.hidden && state.isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      state.pointer.x = e.clientX - rect.left;
      state.pointer.y = e.clientY - rect.top;
      state.pointer.active = true;
    };

    const onPointerLeave = () => {
      state.pointer.active = false;
    };

    const onPointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      state.pointer.y = e.clientY - rect.top;
      state.pointer.active = true;
      state.pulse = 1.0;
    };

    const onPointerUp = () => {};

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
    canvas.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', updateCachedOrigin, { passive: true });

    const initTimer = setTimeout(() => {
      updateCachedOrigin();
      startAnimation();
    }, 40);

    return () => {
      clearTimeout(initTimer);
      stopAnimation();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateCachedOrigin);
    };
  }, [updateCachedOrigin]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden select-none"
      style={{
        background: '#fbfbfa',
        color: '#111318',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
      }}
    >


      {/* ── Interactive Prism Beam Canvas ── */}
      <canvas
        ref={canvasRef}
        id="beam"
        className="absolute inset-0 w-full h-full block touch-none z-[1]"
        style={{ touchAction: 'none' }}
      />

      {/* ── Micro-film grain overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E")`
        }}
      />

      {/* ── Choreographed Hero Content (Espresso Your Creativity -> Brand Story) ── */}
      <main className="absolute left-[6.5vw] md:left-[4.7vw] top-[24vh] md:top-[28vh] z-[2] max-w-[88vw] md:max-w-[780px] flex flex-col gap-4 md:gap-5 pointer-events-none">
        
        {/* Step 1: Espresso Your Creativity (Animated with ParticleText from React Bits) */}
        <div
          id="mark"
          onTransitionEnd={() => updateCachedOrigin()}
          style={{
            transform: introState.fccIn ? 'translateX(0)' : 'translateX(-120vw)',
            opacity: introState.fccIn ? 1 : 0,
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out'
          }}
          className="relative pointer-events-auto cursor-pointer group select-none w-full max-w-[760px]"
        >
          <div className="w-full h-[145px] sm:h-[165px] md:h-[195px] lg:h-[220px] relative">
            <ParticleText
              text={"Espresso Your\nCreativity"}
              align="left"
              fontSize="clamp(34px, 4.8vw, 70px)"
              fontWeight={800}
              fontFamily="'Outfit', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
              color="#111318"
              highlightColor="rgb(247, 49, 165)"
              highlightMode="motion"
              shape="circle"
              particleSize={2.4}
              density={2}
              scatter={160}
              gatherDuration={1500}
              stagger={380}
              pointerRepel={44}
              repelRadius={125}
              idleDrift={0.65}
              clickBurst={true}
              burstStrength={1.2}
              glow={true}
              trigger="hover"
            />
          </div>

          <span
            ref={dotRef}
            id="originDot"
            style={{
              boxShadow: introState.circleIn
                ? '0 0 24px rgba(247, 49, 165, 0.8), 0 0 12px rgba(20, 207, 233, 0.9)'
                : '0 0 0 rgba(0,0,0,0)',
              transition: 'box-shadow 1.0s ease-out'
            }}
            className="absolute left-[340px] sm:left-[390px] md:left-[450px] bottom-[12px] w-[9px] h-[9px] rounded-full bg-[#111318] transition-transform duration-300 ease-out group-hover:scale-125"
          />
        </div>

        {/* Step 2: Brand Story Copy (Fades & glides in smoothly after headline arrives) */}
        <div
          style={{
            transform: introState.taglineIn ? 'translateY(0)' : 'translateY(28px)',
            opacity: introState.taglineIn ? 1 : 0,
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="flex flex-col gap-1.5 md:gap-2.5 text-[clamp(16px,1.8vw,26px)] leading-[1.32] tracking-[-0.025em] text-[#111318]/90 font-medium pt-1"
        >
          <p className="m-0 text-[#111318]/90 font-semibold">
            Yes, our name is Filter Coffee Co.
          </p>
          <p className="m-0 text-[#111318]/60 font-normal">
            No, we don't make coffee.
          </p>
          <p className="m-0 text-[#111318] font-black text-[clamp(18px,2.1vw,30px)] tracking-[-0.03em] pt-1">
            We make brands addictive.
          </p>
        </div>
      </main>

      {/* ── Scroll Indicator (Fades in with UI) ── */}
      <a
        href="#work"
        onClick={handleScrollClick}
        aria-label="Scroll to explore"
        style={{
          opacity: introState.uiIn ? 1 : 0,
          transform: introState.uiIn ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 1.0s ease-out, transform 1.0s ease-out'
        }}
        className="absolute left-[6.5vw] md:left-[4.7vw] bottom-[5.4vh] md:bottom-[6.8vh] flex items-end gap-[18px] text-[#8d929a] hover:text-[#111318] transition-colors pointer-events-auto no-underline text-[clamp(11px,0.9vw,15px)] cursor-pointer group z-[2]"
      >
        <span className="relative h-[58px] w-[1px] bg-[#d4d7dc] transition-colors group-hover:bg-[#111318]">
          <span className="absolute -bottom-[22px] -left-[4px] text-[#111318] text-[16px] leading-none group-hover:translate-y-1 transition-transform">
            ↓
          </span>
        </span>
        <span className="font-medium tracking-tight">Scroll to explore</span>
      </a>

      {/* ── Interactive Floating Controls (Fades in with UI) ── */}
      <div
        style={{
          opacity: introState.uiIn ? 1 : 0,
          transform: introState.uiIn ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 1.0s ease-out, transform 1.0s ease-out'
        }}
        className="absolute right-[4.5vw] md:right-[2.7vw] top-[26%] md:top-[32%] -translate-y-1/2 flex flex-col gap-[14px] z-[5]"
      >
        {/* Fullscreen Expand/Exit Toggle */}
        <button
          id="expand"
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen (⤢)'}
          className="w-[50px] h-[50px] md:w-[62px] md:h-[62px] border-0 rounded-[18px] md:rounded-[20px] bg-white/60 hover:bg-white/80 active:scale-95 shadow-[0_10px_30px_rgba(70,25,80,0.1)] backdrop-blur-[18px] grid place-items-center text-[20px] md:text-[24px] text-[#111318] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
        >
          {isFullscreen ? '⤡' : '⤢'}
        </button>

        {/* Burst / Cycle Color Palette */}
        <button
          id="burst"
          type="button"
          onClick={triggerBurst}
          aria-label="Regenerate colour burst"
          title={`Cycle Color Palette (${paletteIndex + 1}/${PALETTES.length})`}
          className="w-[50px] h-[50px] md:w-[62px] md:h-[62px] border-0 rounded-[18px] md:rounded-[20px] bg-white/60 hover:bg-white/80 active:scale-95 shadow-[0_10px_30px_rgba(70,25,80,0.1)] backdrop-blur-[18px] grid place-items-center text-[20px] md:text-[24px] text-[#111318] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
        >
          ◔✦
        </button>
      </div>

      {/* ── Interactive Floating Showreel Video Card ── */}
      <div
        style={{
          opacity: introState.uiIn ? 1 : 0,
          transform: introState.uiIn ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="absolute right-[4.5vw] md:right-[2.7vw] bottom-[4vh] md:bottom-[4.8vh] z-[10] w-[270px] sm:w-[310px] md:w-[350px] lg:w-[380px] pointer-events-auto"
      >
        <div className="relative group rounded-2xl md:rounded-3xl p-2 md:p-2.5 bg-white/75 hover:bg-white/95 backdrop-blur-xl border border-white/85 shadow-[0_16px_40px_rgba(0,0,0,0.10),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-400 hover:shadow-[0_24px_55px_rgba(0,0,0,0.16)] hover:-translate-y-1">
          
          {/* Card Header Strip */}
          <div className="flex items-center justify-between px-2.5 py-1 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-yellow inline-block animate-pulse" />
              <span className="text-[0.62rem] font-black uppercase tracking-widest text-[#111318]">
                SHOWREEL '24
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Play / Expand button */}
              <button
                type="button"
                onClick={openCinemaModal}
                aria-label="Play showreel fullscreen"
                title="Watch Fullscreen"
                className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[10px] text-[#111318] transition-colors cursor-pointer"
              >
                ▶
              </button>
              <button
                type="button"
                onClick={openCinemaModal}
                aria-label="Expand cinema mode"
                title="Watch Fullscreen"
                className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[11px] text-[#111318] transition-colors cursor-pointer"
              >
                ⤢
              </button>
            </div>
          </div>

          {/* Video Preview Frame / Poster */}
          <div
            onClick={openCinemaModal}
            className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-black cursor-pointer group/vid shadow-inner"
          >
            <picture>
              <source srcSet="/images/showreel-poster.webp" type="image/webp" />
              <img
                src="/images/showreel-poster-thumb.jpg"
                alt="Filter Coffee Co. Showreel"
                width={380}
                height={214}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105"
              />
            </picture>

            {/* Centered play button overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover/vid:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-black/75 group-hover/vid:bg-black/95 backdrop-blur-md flex items-center justify-center text-white text-xs pl-0.5 border border-white/25 transition-transform group-hover/vid:scale-110 shadow-lg">
                ▶
              </span>
            </div>

            {/* Hover overlay teaser */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/vid:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none whitespace-nowrap">
              <span className="glass-pill px-3 py-1 rounded-full text-[0.62rem] font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <span>Click to Expand</span>
              </span>
            </div>
          </div>

          {/* Card Sub-caption */}
          <div className="px-2.5 pt-2 pb-0.5 flex items-center justify-between text-[0.62rem] text-[#8d929a] font-medium">
            <span className="truncate max-w-[200px]">Filter Coffee Co. Showcase</span>
            <button
              type="button"
              className="text-[0.6rem] font-bold uppercase text-[#111318] cursor-pointer hover:underline bg-transparent border-0 p-0"
              onClick={openCinemaModal}
            >
              EXPAND ↗
            </button>
          </div>
        </div>
      </div>

      {/* ── Interactive Hint (Fades in with UI) ── */}
      <div
        style={{
          opacity: introState.uiIn ? 1 : 0,
          transition: 'opacity 1.0s ease-out'
        }}
        className="hidden lg:block absolute left-[220px] bottom-[5.8vh] text-[11px] text-[#848891] z-[4] tracking-[0.01em] pointer-events-none select-none font-medium"
      >
        Move your cursor through the colour
      </div>

      {/* ── Full Cinema Modal Overlay ── */}
      {cinemaModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={closeCinemaModal}
        >
          <div
            className="relative w-full max-w-[1100px] aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeCinemaModal}
              aria-label="Close cinema mode"
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/25 backdrop-blur-md flex items-center justify-center text-lg font-bold transition-all hover:scale-105 cursor-pointer"
            >
              ✕
            </button>

            {/* Cinema Video Player with native controls */}
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/showreel-2024.mp4" type="video/mp4" />
              <source src="/videos/Filter%20Coffee%20Co.%20Showreel%202024.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
