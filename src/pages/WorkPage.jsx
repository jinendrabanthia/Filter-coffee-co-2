import { Link } from 'react-router-dom';
import ScrollFloat from '../components/ScrollFloat';
import Work from '../components/Work';
import FadeSlideSection from '../components/FadeSlideSection';

export default function WorkPage() {
  return (
    <div className="bg-white min-h-screen text-[#111111]">
      {/* Page Hero */}
      <FadeSlideSection className="relative pt-[140px] pb-[70px] overflow-hidden bg-white border-b border-[#111111]/10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl">
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-4">
              The Proof
            </p>
            <ScrollFloat
              textClassName="text-[clamp(2.4rem,5.2vw,4.8rem)] font-black leading-[0.96] tracking-[-0.03em] capitalize mb-8 text-[#111111] [text-wrap:balance]"
              animationDuration={1.6}
              stagger={0.02}
            >
              Good Ideas Look Better Out In The World
            </ScrollFloat>
            <p className="text-[#111111]/70 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
              Every project starts with a challenge. We find the interesting part, shape the idea and turn it into something people can experience.
            </p>
          </div>
        </div>
      </FadeSlideSection>

      {/* Main Work Portfolio */}
      <Work hideHeader />

      {/* Closing Transition Strip */}
      <FadeSlideSection className="bg-[#111111] py-16 px-6 md:px-12 text-center text-white border-t border-[#111111] relative z-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#BFE9FF] text-[0.7rem] font-bold tracking-[0.22em] uppercase mb-4">
            THE NEXT STEP
          </p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-8 !text-white" style={{ color: '#ffffff' }}>
            EVERY GOOD IDEA NEEDS THE RIGHT CREATIVE THINKING.
          </h2>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-white hover:text-[#111111] text-white text-[0.78rem] font-black tracking-[0.16em] uppercase px-8 py-4 rounded-full transition-all shadow-md"
          >
            <span>EXPLORE OUR SERVICES</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </FadeSlideSection>
    </div>
  );
}
