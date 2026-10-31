import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BackgroundShapes from './BackgroundShapes';
import ScrollFloat from './ScrollFloat';

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
          <span className="text-[0.68rem] font-bold tracking-widest uppercase text-black/50 transition-all duration-300 hover:text-black">
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
      {/* ── OUR CLIENTS ── */}
      <section id="clients" className="py-[120px] border-b border-black/10 bg-transparent relative z-10">
        <BackgroundShapes variant="about" />
        <div className="max-w-[1360px] mx-auto px-8 md:px-12">
          {!hideHeader && (
            <motion.div ref={hRef}
              initial={{ opacity: 0, y: 40 }}
              animate={hInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14">
              <div className="text-[clamp(2.8rem,5.5vw,5.5rem)] font-black leading-[0.98] tracking-tight mb-6">
                <ScrollFloat
                  textClassName="text-[#280049] font-black"
                  animationDuration={1.8}
                  stagger={0.03}
                >
                  OUR CLIENTS
                </ScrollFloat>
              </div>
              <p className="text-[#280049]/70 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
                From skincare shelves to social feeds, we've partnered with brands to serve ideas that keep conversations brewing.
              </p>
            </motion.div>
          )}

          {/* Client Logo Wall */}
          <LogoGrid />
        </div>
      </section>
    </>
  );
}
