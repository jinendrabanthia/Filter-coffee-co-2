import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  hidden: { opacity: 0, y: 70, scale: 0.9, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

function TeamCard({ role, img }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(37,99,235,0.12)', borderColor: '#2563EB' }}
      className="flex flex-col items-center rounded-2xl overflow-hidden group bg-white border border-[#111111]/10 shadow-sm transition-all duration-300"
    >
      <div className="w-full aspect-square relative overflow-hidden bg-[#F7F5EF]">
        <img
          src={img}
          alt={role}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-400" />
      </div>
      <span className="text-[0.62rem] font-black tracking-[0.2em] uppercase text-[#111111] py-4 px-2 text-center group-hover:text-[#2563EB] transition-colors">
        {role}
      </span>
    </motion.div>
  );
}

export default function Team() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-60px 0px' });

  return (
    <motion.section
      id="team"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 md:py-28 bg-[#F7F5EF] relative z-10 border-b border-[#111111]/10"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Team Intro */}
        <div className="text-center mb-16">
          <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-3">
            THE MINDS
          </p>
          <ScrollFloat
            containerClassName="text-center"
            textClassName="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.98] tracking-[-0.035em] uppercase text-[#111111]"
            animationDuration={1.6}
            stagger={0.02}
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
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`text-[clamp(1.05rem,1.9vw,1.6rem)] font-light tracking-tight
                  ${i === teamRoles.length - 1 ? 'italic font-black text-[#2563EB]' : 'text-[#111111]/70'} px-2`}
              >
                {r}
              </motion.span>
            ))}
          </div>
          <p className="text-[#111111]/70 text-base md:text-lg max-w-lg mx-auto leading-relaxed font-medium">
            Different roles. Different playlists. Different coffee orders.<br />
            <strong className="text-[#111111] font-bold">One shared obsession: making good work.</strong>
          </p>
        </div>

        {/* Team Cards — staggered scroll-reveal */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {teamCards.map(({ role, img }) => (
            <TeamCard key={role} role={role} img={img} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
