import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import BackgroundShapes from './BackgroundShapes';
import ScrollFloat from './ScrollFloat';

const teamRoles = [
  'Strategists.',
  'Copywriters.',
  'Designers.',
  'Social media managers.',
  'Content creators.',
  'And professional tab-hoarders.',
];

const teamCards = [
  {
    role: 'Strategist',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=80&auto=format&fit=crop',
  },
  {
    role: 'Copywriter',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80&auto=format&fit=crop',
  },
  {
    role: 'Designer',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80&auto=format&fit=crop',
  },
  {
    role: 'Social Media Manager',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80&auto=format&fit=crop',
  },
  {
    role: 'Content Creator',
    img: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400&q=80&auto=format&fit=crop',
  },
  {
    role: 'Tab-Hoarder',
    img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80&auto=format&fit=crop',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.88, rotateX: 8 },
  visible: {
    opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function TeamCard({ role, img }) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center rounded-2xl overflow-hidden group cursor-none"
      style={{
        background: 'rgba(255, 210, 190, 0.18)',
        border: '1px solid rgba(40, 0, 73, 0.12)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="w-full aspect-square relative overflow-hidden">
        <img
          src={img}
          alt={role}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-400" />
      </div>
      <span className="text-[0.6rem] font-black tracking-[0.2em] uppercase text-[#280049] py-4 px-2 text-center">
        {role}
      </span>
    </motion.div>
  );
}

export default function Team() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-80px 0px' });

  return (
    <section id="team" className="py-[120px] border-b border-[#280049]/15 bg-transparent relative z-10">
      <BackgroundShapes variant="team" />
      <div className="max-w-[1360px] mx-auto px-8 md:px-12">

        {/* Team Intro */}
        <div className="text-center mb-16">
          <ScrollFloat
            containerClassName="text-center"
            textClassName="text-[clamp(2.8rem,5.5vw,5.5rem)] font-black leading-[0.98] tracking-[-0.035em] uppercase text-[#280049]"
            animationDuration={1.8}
            stagger={0.03}
          >
            MEET THE TEAM
          </ScrollFloat>

          <div className="flex flex-wrap justify-center gap-1 mt-8 mb-6 max-w-4xl mx-auto">
            {teamRoles.map((r, i) => (
              <motion.span
                key={r}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`text-[clamp(1.05rem,1.9vw,1.7rem)] font-light tracking-tight
                  ${i === teamRoles.length - 1 ? 'italic font-bold text-[#280049]' : 'text-[#280049]/70'} px-2`}
              >
                {r}
              </motion.span>
            ))}
          </div>
          <p className="text-[#280049]/70 text-base md:text-lg max-w-lg mx-auto leading-relaxed font-medium">
            Different roles. Different playlists. Different coffee orders.<br />
            <strong className="text-[#280049] font-semibold">One shared obsession: making good work.</strong>
          </p>
        </div>

        {/* Team Cards — staggered scroll-reveal */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {teamCards.map(({ role, img }) => (
            <TeamCard key={role} role={role} img={img} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
