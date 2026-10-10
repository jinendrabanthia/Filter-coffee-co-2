import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BackgroundShapes from './BackgroundShapes';
import FoldText from './FoldText';

const CLIENTS = Array.from({ length: 12 }, (_, i) => `Brand ${String(i+1).padStart(2,'0')}`);

function LogoGrid() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  return (
    <div ref={ref} className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {CLIENTS.map((name, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.04, duration: 0.45 }}
          className="logo-slot glass-card aspect-[3/2] flex items-center justify-center p-5 cursor-none rounded-2xl">
          <span className="text-[0.68rem] font-bold tracking-widest uppercase text-black/50
            transition-all duration-300 hover:text-black">
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
    <>
      {/* ── ABOUT / OUR BLEND ── */}
      <section id="about" className="py-[120px] border-b border-black/10 bg-transparent relative z-10">
        <BackgroundShapes variant="about" />
        <div className="max-w-[1360px] mx-auto px-8 md:px-12">
          {!hideHeader && (
          <motion.div ref={hRef}
            initial={{ opacity: 0, y: 40 }}
            animate={hInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
            <p className="text-[0.68rem] font-bold tracking-widest2 uppercase text-smoke mb-4">
              OUR BLEND
            </p>
            <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-black leading-[1.02] tracking-tight text-black mb-6">
              From skincare shelves
            </h2>
            <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-extralight italic text-black/70 leading-[1.02] tracking-tight mb-6">
              to social feeds.
            </h2>
            <p className="text-smoke text-lg max-w-xl leading-relaxed font-medium">
              We've partnered with brands to serve ideas that keep conversations brewing.
            </p>
          </motion.div>
          )}

          {/* Client Logo Wall */}
          <div id="clients" className="mt-20">
            <div className="text-[clamp(2.8rem,5vw,5.5rem)] font-black leading-[1.02] tracking-tight text-black mb-10">
              <FoldText
                text="OUR CLIENTS"
                splitBy="char"
                hinge="top"
                trigger="scroll"
                duration={0.65}
                delay={0.1}
                stagger={0.035}
                ease="power3.out"
                color="#000000"
                fontSize="inherit"
                fontWeight={900}
              />
            </div>
            <LogoGrid />
          </div>
        </div>
      </section>
    </>
  );
}
