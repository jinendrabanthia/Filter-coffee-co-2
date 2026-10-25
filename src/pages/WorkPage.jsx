import { motion } from 'framer-motion';
import Work from '../components/Work';
import ScrollReveal from '../components/ScrollReveal';
import BackgroundShapes from '../components/BackgroundShapes';

export default function WorkPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-[140px] pb-[80px] overflow-hidden bg-transparent">
        <BackgroundShapes variant="work" />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        <div className="max-w-[1360px] mx-auto px-8 md:px-12 relative z-10">
          <div>
            <div className="flex items-center gap-4 text-[0.7rem] font-bold tracking-widest2 uppercase text-smoke mb-6">
              <span className="w-10 h-px bg-brand-navy/30 inline-block" />
              THE GOOD STUFF
            </div>
            <ScrollReveal
              baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}
              textClassName="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.95] tracking-[-0.04em] mb-6 text-brand-navy"
            >
              THE GOOD STUFF
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.1} enableBlur baseRotation={0} blurStrength={2}
              textClassName="text-smoke text-lg max-w-xl leading-relaxed font-medium"
            >
              Ideas that left the deck and made it to feeds, screens and conversations.
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Work hideHeader />
    </>
  );
}
