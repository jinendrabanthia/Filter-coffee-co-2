import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BackgroundShapes from './BackgroundShapes';

const teamRoles = [
  'Strategists.',
  'Copywriters.',
  'Designers.',
  'Social media managers.',
  'Content creators.',
  'And professional tab-hoarders.',
];

export default function Team() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-[120px] border-b border-black/10 bg-white/10 backdrop-blur-sm relative z-10" ref={ref}>
      <BackgroundShapes variant="team" />
      <div className="max-w-[1360px] mx-auto px-8 md:px-12">

        {/* Brew Crew */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          className="text-center mb-16">
          <p className="text-[0.68rem] font-bold tracking-widest2 uppercase text-smoke mb-6">
            MEET THE BREW CREW
          </p>
          <div className="flex flex-wrap justify-center gap-1 mb-6">
            {teamRoles.map((r, i) => (
              <motion.span key={r}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`text-[clamp(1rem,1.8vw,1.6rem)] font-light tracking-tight
                  ${i === teamRoles.length - 1 ? 'italic font-semibold text-black' : 'text-smoke'} px-2`}>
                {r}
              </motion.span>
            ))}
          </div>
          <p className="text-smoke text-base max-w-md mx-auto leading-relaxed">
            Different roles. Different playlists. Different coffee orders.<br />
            <strong className="text-black font-semibold">One shared obsession: making good work.</strong>
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
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
          ].map(({ role, img }, i) => (
            <motion.div key={role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="glass-card flex flex-col items-center rounded-2xl overflow-hidden group cursor-none">
              <div className="w-full aspect-square relative overflow-hidden border-b border-black/8">
                <img
                  src={img}
                  alt={role}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <span className="text-[0.6rem] font-bold tracking-widest uppercase text-black/60 py-4 px-2 text-center">
                {role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
