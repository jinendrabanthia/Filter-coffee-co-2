import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollFloat from './ScrollFloat';

/* ─── Culture Episodes Data ──────────────────────────────────────────────── */
const CULTURE_ITEMS = [
  {
    id: 1,
    episode: 'EP 01',
    tag: 'STUDIO VIBES',
    title: 'The Core Energy',
    desc: 'Good vibes, banter, and creative camaraderie at our Mumbai headquarters.',
    // Warm sunny wall with team smiling and gesturing (inspired directly by screenshot)
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85&auto=format&fit=crop',
    hasCustomGraphic: false,
    duration: '0:48',
    videoSrc: '/videos/homepage/bg-video-optimized.mp4',
  },
  {
    id: 2,
    episode: 'EP 02',
    tag: 'STUDIO EDIT',
    title: 'Where Magic Cuts Happen',
    desc: 'Behind the timeline: our editors and motion artists sculpting 4K brand reels.',
    // Editor in studio with bold graphic text overlay matching screenshot 1
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=85&auto=format&fit=crop',
    hasCustomGraphic: true,
    graphicText: 'STUDIO EDIT',
    duration: '1:14',
    videoSrc: '/videos/homepage/bg-video-optimized.mp4',
  },
  {
    id: 3,
    episode: 'EP 03',
    tag: 'CREATIVE JAM',
    title: 'Ideas Over Strong Brews',
    desc: 'Collaborative brainstorms where strategy, cultural insights, and wild ideas collide.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85&auto=format&fit=crop',
    hasCustomGraphic: false,
    duration: '0:56',
    videoSrc: '/videos/homepage/bg-video-optimized.mp4',
  },
  {
    id: 4,
    episode: 'EP 04',
    tag: 'ON SET',
    title: 'Lighting, Angles & Action',
    desc: 'Shooting brand films and high-impact campaigns on location and in studio.',
    image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=900&q=85&auto=format&fit=crop',
    hasCustomGraphic: false,
    duration: '1:32',
    videoSrc: '/videos/homepage/bg-video-optimized.mp4',
  },
  {
    id: 5,
    episode: 'EP 05',
    tag: 'COLOR & CRAFT',
    title: 'Pixel-Perfect Polish',
    desc: 'Color grading, typography refinement, and high-fidelity motion graphics.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&q=85&auto=format&fit=crop',
    hasCustomGraphic: false,
    duration: '0:42',
    videoSrc: '/videos/homepage/bg-video-optimized.mp4',
  },
  {
    id: 6,
    episode: 'EP 06',
    tag: 'COFFEE & CULTURE',
    title: 'Celebrations & Milestones',
    desc: 'Celebrating viral campaign drops and building deep bonds with our team.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=85&auto=format&fit=crop',
    hasCustomGraphic: false,
    duration: '1:05',
    videoSrc: '/videos/homepage/bg-video-optimized.mp4',
  },
];

export default function LifeAndCulture() {
  const scrollRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to toggle navigation indicators
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 380;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative z-10 w-full overflow-hidden my-12 md:my-16">
      {/* ── Main Vibrant Section Container matching Screenshot 1 ── */}
      <div
        className="w-full relative py-16 md:py-24 px-4 sm:px-8 md:px-12"
        style={{
          background: '#F94500',
        }}
      >
        {/* Subtle Ambient Radial Glows */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(41, 0, 75, 0.4) 0%, transparent 70%)',
          }}
        />

        {/* ── Header ── */}
        <div className="max-w-[1000px] mx-auto text-center mb-10 md:mb-14 relative z-10">
          <ScrollFloat
            containerClassName="text-center"
            textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.04em] text-[#280049] mb-4"
            animationDuration={1.8}
            stagger={0.03}
          >
            LIFE AND CULTURE
          </ScrollFloat>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-[#280049]/90 max-w-3xl mx-auto font-medium leading-relaxed px-4"
          >
            Welcome to the pulsating core of creativity in our series that explores the dynamic
            world of Filter Coffee Co., capturing the stories and pursuits of the passionate
            members as they craft extraordinary campaigns for top brands.
          </motion.p>
        </div>

        {/* ── Carousel Wrapper with Arrow Navigation ── */}
        <div className="relative max-w-[1400px] mx-auto">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              aria-label="Previous culture stories"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white text-black shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Right Arrow Button (Styled like the white chevron in screenshot 1) */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              aria-label="Next culture stories"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white text-black shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* ── Scrollable Track ── */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-2 px-2"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {CULTURE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setActiveVideo(item)}
                className="group relative flex-shrink-0 w-[260px] sm:w-[310px] md:w-[350px] aspect-[9/14] rounded-3xl overflow-hidden cursor-pointer bg-black shadow-2xl transition-all duration-500 hover:-translate-y-2 select-none"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle dark gradient for readability & depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:from-black/70 transition-all duration-300" />

                {/* Graphic Typography Overlay for EP 02 (Matches "STUDIO EDIT" in Screenshot 1) */}
                {item.hasCustomGraphic && (
                  <div className="absolute inset-x-0 top-16 flex items-center justify-center pointer-events-none z-10 px-4">
                    <span
                      className="font-black text-4xl sm:text-5xl md:text-6xl text-[#FAA533] uppercase tracking-tighter opacity-90 select-none text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                      style={{
                        WebkitTextStroke: '1px rgba(0,0,0,0.2)',
                      }}
                    >
                      {item.graphicText}
                    </span>
                  </div>
                )}

                {/* Top Pill: Episode & Tag */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {item.episode} • {item.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium text-white/90 bg-black/40 backdrop-blur-md">
                    {item.duration}
                  </span>
                </div>

                {/* Central Play Button matching Screenshot 1 */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black/40 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-115 group-hover:bg-[#280049] group-hover:border-white">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF"
                      className="ml-1 text-white group-hover:fill-white group-hover:text-white transition-colors duration-200"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-20 text-white">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1 group-hover:text-pink-100 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/75 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Drag & swipe hint on mobile */}
          <div className="flex items-center justify-center gap-2 mt-6 text-[#0A1E3F]/70 text-xs font-semibold tracking-wider uppercase select-none">
            <span>Scroll or drag to explore</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* ── Interactive Culture Reel Video Modal ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md sm:max-w-lg aspect-[9/16] max-h-[88vh] rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 border border-white/20"
              >
                ✕
              </button>

              {/* Video Player */}
              <video
                src={activeVideo.videoSrc}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Modal Overlay Header info */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {activeVideo.episode} • {activeVideo.tag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
