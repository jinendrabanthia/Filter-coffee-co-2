import { Link } from 'react-router-dom';
import ScrollFloat from '../components/ScrollFloat';
import ScrollReveal from '../components/ScrollReveal';
import Services from '../components/Services';

export default function ServicesPage() {
  return (
    <div className="bg-[#BFE9FF] min-h-screen text-[#111111]">
      {/* Page Hero */}
      <section className="relative pt-[140px] pb-[70px] overflow-hidden bg-[#BFE9FF] border-b border-[#111111]/10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-4">
              THE TOOLKIT
            </p>
            <ScrollFloat
              textClassName="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.96] tracking-[-0.03em] uppercase mb-8 text-[#111111]"
              animationDuration={1.6}
              stagger={0.02}
            >
              BIG IDEAS NEED MORE THAN JUST GOOD INTENTIONS.
            </ScrollFloat>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur
              baseRotation={0}
              blurStrength={2}
              textClassName="text-[#111111]/85 text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
            >
              From the first thought to the final execution, we bring ideas to life through strategy, design and marketing.
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Services List */}
      <Services hideHeader />

      {/* Closing Transition Strip */}
      <section className="bg-[#111111] py-16 px-6 md:px-12 text-center text-white border-t border-[#111111] relative z-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#BFE9FF] text-[0.7rem] font-bold tracking-[0.22em] uppercase mb-4">
            THE PEOPLE BEHIND IT
          </p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-8 !text-white" style={{ color: '#ffffff' }}>
            BEHIND EVERY GOOD IDEA IS A CREATIVE MIND.
          </h2>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-white hover:text-[#111111] text-white text-[0.78rem] font-black tracking-[0.16em] uppercase px-8 py-4 rounded-full transition-all shadow-md"
          >
            <span>MEET THE CREATIVE TEAM</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
