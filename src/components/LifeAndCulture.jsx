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
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full overflow-hidden my-12 md:my-16"
    >
      <div
        className="w-full relative py-16 md:py-24 px-4 sm:px-8 md:px-12 bg-[#F7F5EF] border-t border-b border-[#111111]/10"
      >
        {/* Header */}
        <div className="max-w-[1000px] mx-auto text-center mb-10 md:mb-14 relative z-10">
          <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-3">
            BEHIND THE SCENES
          </p>
          <ScrollFloat
            containerClassName="text-center"
            textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.02em] text-[#111111] mb-4"
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
            className="text-sm sm:text-base md:text-lg text-[#111111]/80 max-w-3xl mx-auto font-medium leading-relaxed px-4"
          >
            Welcome to the pulsating core of creativity. Explore the stories, shoots, and pursuits of Filter Coffee Co. as we craft campaigns for top brands.
          </motion.p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative max-w-[1400px] mx-auto">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              aria-label="Previous culture stories"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-white text-[#111111] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-[#111111]/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              aria-label="Next culture stories"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-white text-[#111111] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-[#111111]/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Scrollable Track */}
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
                className="group relative flex-shrink-0 w-[260px] sm:w-[310px] md:w-[350px] aspect-[9/14] rounded-3xl overflow-hidden cursor-pointer bg-black shadow-xl transition-all duration-500 hover:-translate-y-2 select-none border border-[#111111]/10"
                style={{ scrollSnapAlign: 'start' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 group-hover:from-black/75 transition-all duration-300" />

                {item.hasCustomGraphic && (
                  <div className="absolute inset-x-0 top-16 flex items-center justify-center pointer-events-none z-10 px-4">
                    <span
                      className="font-black text-4xl sm:text-5xl md:text-6xl text-[#D5F45B] uppercase tracking-tighter opacity-95 select-none text-center drop-shadow-md"
                    >
                      {item.graphicText}
                    </span>
                  </div>
                )}

                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {item.episode} • {item.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium text-white/90 bg-black/50 backdrop-blur-md">
                    {item.duration}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-115 group-hover:bg-[#2563EB] group-hover:border-transparent">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF"
                      className="ml-1 text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 z-20 text-white">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/75 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-[#111111]/60 text-xs font-semibold tracking-wider uppercase select-none">
            <span>Scroll or drag to explore</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
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
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 border border-white/20"
              >
                ✕
              </button>

              <video
                src={activeVideo.videoSrc}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {activeVideo.episode} • {activeVideo.tag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
