import ScrollFloat from '../components/ScrollFloat';
import ScrollReveal from '../components/ScrollReveal';
import Work from '../components/Work';

export default function WorkPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-[140px] pb-[80px] overflow-hidden bg-transparent">
        <div className="max-w-[1360px] mx-auto px-8 md:px-12 relative z-10">
          <div>
            <ScrollFloat
              textClassName="text-[clamp(2.2rem,4.2vw,4rem)] font-bold leading-[1.08] tracking-tight mb-6 text-[#280049]"
              animationDuration={1.8}
              stagger={0.025}
            >
              THE GOOD STUFF
            </ScrollFloat>
            <ScrollReveal
              baseOpacity={0.1} enableBlur baseRotation={0} blurStrength={2}
              textClassName="text-[#280049]/85 text-lg max-w-xl leading-relaxed font-medium"
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
