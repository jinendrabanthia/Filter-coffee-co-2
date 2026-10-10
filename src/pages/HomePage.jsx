import Hero     from '../components/Hero';
import Ticker   from '../components/Ticker';
import Work     from '../components/Work';

import About    from '../components/About';
import Team     from '../components/Team';
import Contact  from '../components/Contact';
import BackgroundShapes from '../components/BackgroundShapes';

import ScrollReveal from '../components/ScrollReveal';

/* About blurb between ticker and work */
function Blurb() {
  return (
    <section className="py-[90px] md:py-[120px] bg-brand-navy relative z-10">
      <div className="max-w-[2000px] mx-auto px-6 md:px-10">
        <div className="p-10 md:p-16 rounded-3xl relative overflow-hidden min-h-[500px] md:min-h-[650px] flex items-center">
          
          {/* Background Video - Full quality */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            style={{ zIndex: 0 }}
          >
            <source src="https://res.cloudinary.com/qxtrlo6i/video/upload/v1791541191/blurb-bg.mp4" type="video/mp4" />
          </video>
          
          {/* Dark gradient overlay for text readability */}
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
              zIndex: 1 
            }}
          />

          {/* Text content */}
          <div className="relative z-10 w-full">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
              textClassName="text-[clamp(1.5rem,2.8vw,2.8rem)] font-serif leading-[1.45] tracking-tight max-w-[950px] text-brand-light"
            >
              We're an advertising and social media agency blending strategy, creativity and culture to create work that gets seen, shared, saved and remembered.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Blurb />
      <Work />
      <About />
      <Team />
      <Contact />
    </>
  );
}
