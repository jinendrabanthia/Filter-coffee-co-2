import ScrollFloat from '../components/ScrollFloat';
import ScrollReveal from '../components/ScrollReveal';
import Services from '../components/Services';

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-[140px] pb-[80px] overflow-hidden bg-transparent">
        <div className="max-w-[1360px] mx-auto px-8 md:px-12 relative z-10">
          <div>
            <ScrollFloat
              textClassName="text-[clamp(2.2rem,4.2vw,4rem)] font-bold leading-[1.08] tracking-tight mb-6 text-[#280049]"
              animationDuration={1.8}
              stagger={0.04}
            >
              Pick your blend.
            </ScrollFloat>
            <ScrollReveal
              baseOpacity={0.1} enableBlur baseRotation={0} blurStrength={2}
              textClassName="text-[#280049]/85 text-lg max-w-xl leading-relaxed font-medium"
            >
              Social. Creative. Strategy. Content. Influencer. E-Commerce. Six blends, one strong brew.
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Services hideHeader />
    </>
  );
}
