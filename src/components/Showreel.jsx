import { motion } from 'framer-motion';

export default function Showreel() {
  return (
    <section
      id="about"
      className="py-[80px] md:py-[120px] relative z-10 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="max-w-[2000px] mx-auto px-4 md:px-10">
        <div
          className="relative rounded-3xl overflow-hidden min-h-[460px] md:min-h-[560px] flex items-center p-8 md:p-16 border border-white/10 shadow-2xl"
          style={{ backgroundColor: '#000000' }}
        >


          {/* ── Content Narrative Context ── */}
          <div className="relative z-[2] w-full max-w-[1100px]">
            <motion.p
              initial={{ opacity: 0.15, y: 30, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.9rem,3.8vw,3.8rem)] font-serif italic font-normal leading-[1.32] tracking-tight text-white mb-2"
            >
              We’re an advertising and social media agency blending{' '}
              <span className="font-sans not-italic font-black text-white">strategy</span>,{' '}
              <span className="font-sans not-italic font-black text-white">creativity</span> and{' '}
              <span className="font-sans not-italic font-black text-white">culture</span>{' '}
              to create work that gets seen, shared, saved and remembered.
            </motion.p>
          </div>

          {/* ── Subtle Decorative Watermark / Accent in bottom right ── */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-[2] hidden sm:flex items-center gap-2 text-white/20 select-none">
            <span className="text-[11px] font-mono tracking-widest">FILTER COFFEE co.</span>
            <span className="text-white/40 text-xs">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}
