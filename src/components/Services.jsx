import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from './ScrollFloat';

const services = [
  {
    num: '01',
    title: 'BRAND STRATEGY',
    tagline: 'Build the foundation every great brand needs.',
    desc: 'Before we create, we decode. We uncover your distinctive brand truth, competitive advantage, and customer tension to build an unshakeable strategy.',
    tags: ['Audience Architecture', 'Brand Positioning', 'Core Messaging', 'Cultural Intelligence'],
  },
  {
    num: '02',
    title: 'BRANDING & DESIGN',
    tagline: 'Visual identities that are impossible to ignore.',
    desc: 'From custom typographic systems to iconic brand packaging, we craft comprehensive visual universes that stop thumbs and command attention.',
    tags: ['Identity Systems', 'Typography & Style Guides', 'Packaging Design', 'Motion Guidelines'],
  },
  {
    num: '03',
    title: 'CREATIVE CONTENT',
    tagline: 'Content built for the feed, not the filing cabinet.',
    desc: 'High-velocity creative engineered for social culture. Reels, photography, kinetic graphics, and episodic content crafted to be saved, shared, and celebrated.',
    tags: ['Short-Form Video', 'High-Aesthetic Photography', 'Motion Design', 'Trend Jacking'],
  },
  {
    num: '04',
    title: 'DIGITAL MARKETING',
    tagline: 'Getting the right message to the right people.',
    desc: 'Performance meets creativity. We deploy targeted multi-channel campaigns with creative testing feedback loops that turn interest into sustained revenue.',
    tags: ['Paid Media Strategy', 'Full-Funnel Creative', 'Creator Whitelisting', 'Analytics & Growth'],
  },
  {
    num: '05',
    title: 'CAMPAIGNS & ACTIVATIONS',
    tagline: 'Ideas that move from the brief into culture.',
    desc: 'Integrated campaign moments, product launches, influencer matchmaking, and experiential stunts that spark real-world conversation.',
    tags: ['Product Launches', 'Influencer Seeding', 'Experiential Drops', 'Integrated Activations'],
  },
];

function ServiceRow({ svc, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-[#111111]/15 py-6 sm:py-8 md:py-10 transition-colors group cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-4 md:gap-8">
        {/* Left: Number + Title */}
        <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10">
          <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#2563EB] tracking-widest shrink-0">
            {svc.num}
          </span>
          <div>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-[#111111] uppercase tracking-tight group-hover:text-[#2563EB] transition-colors">
              {svc.title}
            </h3>
            <p className="text-[#111111]/70 text-xs sm:text-sm md:text-base font-medium mt-1">
              {svc.tagline}
            </p>
          </div>
        </div>

        {/* Right: Expand Toggle Indicator */}
        <div className="flex items-center gap-4 self-end md:self-auto mt-2 md:mt-0">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#111111]/50 group-hover:text-[#2563EB]">
            {expanded ? 'LESS —' : 'MORE +'}
          </span>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden pt-6 pl-0 md:pl-16"
          >
            <p className="text-base text-[#111111]/80 max-w-2xl leading-relaxed mb-6 font-medium">
              {svc.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {svc.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white border border-[#111111]/10 text-[#111111] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services({ hideHeader = false }) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="services" className="py-16 md:py-24 bg-[#BFE9FF] relative z-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12">
        {!hideHeader && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#111111]/15 pb-8"
          >
            <div>
              <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-3">
                CAPABILITIES
              </p>
              <div className="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.96] tracking-[-0.03em] uppercase">
                <ScrollFloat textClassName="text-[#111111] font-black" animationDuration={1.6} stagger={0.02}>
                  WHAT WE DO BEST
                </ScrollFloat>
              </div>
            </div>
            <p className="text-[#111111]/75 text-base md:text-lg max-w-md font-medium">
              From the first thought to the final execution, we bring ideas to life through strategy, design and marketing.
            </p>
          </motion.div>
        )}

        {/* Numbered Services Accordion List */}
        <div className="border-t border-[#111111]/15 mb-16">
          {services.map((s, i) => (
            <ServiceRow key={s.num} svc={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center pt-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#2563EB] text-white text-[0.78rem] font-black tracking-[0.16em] uppercase px-9 py-4 rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <span>LET'S TALK ABOUT YOUR PROJECT</span>
            <span className="text-sm">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
