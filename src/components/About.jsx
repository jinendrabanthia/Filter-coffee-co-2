import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from './ScrollFloat';

const CLIENTS = [
  'P&G', "L'Oréal", 'Galderma', 'Sephora', 'Nykaa', "Dr. Reddy's",
  'Cetaphil', 'Estée Lauder', 'Starbucks', 'Kiehl’s', 'Olay', 'Benefit'
];

function LogoGrid() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
      {CLIENTS.map((name, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          whileHover={{ y: -3, borderColor: '#2563EB' }}
          className="bg-white border border-[#111111]/10 aspect-[3/2] flex items-center justify-center p-3 sm:p-4 rounded-xl shadow-sm transition-all">
          <span className="text-[0.72rem] font-bold tracking-widest uppercase text-[#111111]/70 transition-all duration-300 hover:text-[#2563EB]">
            {name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function About({ hideHeader = false }) {
  const [hRef, hInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="clients" className="py-16 md:py-24 border-b border-[#111111]/10 bg-[#F7F5EF] relative z-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12">
        {!hideHeader && (
          <motion.div ref={hRef}
            initial={{ opacity: 0, y: 30 }}
            animate={hInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14">
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-3">
              CLIENT ROSTER
            </p>
            <div className="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.98] tracking-tight mb-6">
              <ScrollFloat
                textClassName="text-[#111111] font-black"
                animationDuration={1.6}
                stagger={0.02}
              >
                GOOD COMPANY. GOOD CREATIVE WORK.
              </ScrollFloat>
            </div>
            <p className="text-[#111111]/75 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
              From skincare shelves to social feeds, we've partnered with brands to serve ideas that keep conversations brewing.
            </p>
          </motion.div>
        )}

        {/* Client Logo Wall */}
        <LogoGrid />
      </div>
    </section>
  );
}
