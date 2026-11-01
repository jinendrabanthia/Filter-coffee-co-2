import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollFloat from '../components/ScrollFloat';
import Team from '../components/Team';
import FadeSlideSection from '../components/FadeSlideSection';

export default function AboutPage() {
  return (
    <div className="bg-[#F7F5EF] min-h-screen text-[#111111]">
      {/* Page Hero */}
      <FadeSlideSection className="relative pt-[140px] pb-[80px] overflow-hidden bg-[#F7F5EF] border-b border-[#111111]/10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-4">
              THE PEOPLE & BELIEFS
            </p>
            <ScrollFloat
              textClassName="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.96] tracking-[-0.03em] uppercase mb-8 text-[#111111]"
              animationDuration={1.6}
              stagger={0.02}
            >
              A LITTLE DIFFERENT. THAT'S THE WHOLE POINT.
            </ScrollFloat>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: '-20px 0px' }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.20,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="space-y-4 text-base sm:text-lg md:text-xl text-[#111111] font-semibold leading-relaxed max-w-2xl"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0.18, filter: 'blur(7px)', y: 12 },
                  visible: {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                We believe creativity should have a personality.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0.18, filter: 'blur(7px)', y: 12 },
                  visible: {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                We're a creative marketing agency that enjoys challenging the ordinary, finding unexpected ideas and building brands with something to say.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0.18, filter: 'blur(7px)', y: 12 },
                  visible: {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                We don't believe every brand should look or sound the same.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0.18, filter: 'blur(7px)', y: 12 },
                  visible: {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="font-black text-[#2563EB] pt-2"
              >
                And we wouldn't have it any other way.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </FadeSlideSection>

      {/* Values Strip — pure solid black typography */}
      <FadeSlideSection className="bg-[#2563EB] text-[#111111] py-16 px-6 md:px-12 border-b border-[#111111]/10">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-t-2 border-[#111111] pt-6"
            >
              <span className="text-[0.7rem] font-mono font-black tracking-widest text-[#111111] uppercase block mb-3">01 / DISRUPTION</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 text-[#111111]">
                WE CHALLENGE THE ORDINARY.
              </h3>
              <p className="text-[#111111] text-sm leading-relaxed font-semibold">
                If everyone is zigging, we look for the meaningful zag that sets your brand apart.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-t-2 border-[#111111] pt-6"
            >
              <span className="text-[0.7rem] font-mono font-black tracking-widest text-[#111111] uppercase block mb-3">02 / CURIOSITY</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 text-[#111111]">
                WE FIND UNEXPECTED IDEAS.
              </h3>
              <p className="text-[#111111] text-sm leading-relaxed font-semibold">
                Great insights come from deep cultural curiosity, consumer honesty, and fearless exploration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-t-2 border-[#111111] pt-6"
            >
              <span className="text-[0.7rem] font-mono font-black tracking-widest text-[#111111] uppercase block mb-3">03 / VOICE</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 text-[#111111]">
                WE BUILD BRANDS WITH SOMETHING TO SAY.
              </h3>
              <p className="text-[#111111] text-sm leading-relaxed font-semibold">
                Memorable brands don't whisper in the background; they spark conversations that last.
              </p>
            </motion.div>
          </div>
        </div>
      </FadeSlideSection>

      {/* Team Section */}
      <Team />

      {/* Closing Transition Strip */}
      <FadeSlideSection className="bg-[#111111] py-16 px-6 md:px-12 text-center text-white border-t border-[#111111] relative z-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#BFE9FF] text-[0.7rem] font-bold tracking-[0.22em] uppercase mb-4">
            THE NEXT STEP
          </p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-8 !text-white" style={{ color: '#ffffff' }}>
            ENOUGH ABOUT US. LET'S TALK ABOUT YOU.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-white hover:text-[#111111] text-white text-[0.78rem] font-black tracking-[0.16em] uppercase px-8 py-4 rounded-full transition-all shadow-md"
          >
            <span>START A CONVERSATION</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </FadeSlideSection>
    </div>
  );
}
