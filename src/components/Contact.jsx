import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollFloat from './ScrollFloat';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', brand: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#BFE9FF] min-h-[90vh] py-16 sm:py-24 px-4 sm:px-6 md:px-12 text-[#111111] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading & Info */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-[0.7rem] font-bold tracking-[0.24em] uppercase text-[#2563EB] mb-4">
                THE NEXT CHAPTER
              </p>

              <div className="mb-8">
                <ScrollFloat
                  textClassName="text-[clamp(2.3rem,5.5vw,5.5rem)] font-black leading-[0.94] tracking-[-0.03em] uppercase text-[#111111]"
                  animationDuration={1.6}
                  stagger={0.02}
                >
                  SO, WHAT ARE WE MAKING TOGETHER?
                </ScrollFloat>
              </div>

              <p className="text-[#111111]/85 text-base md:text-xl font-medium leading-relaxed mb-8 sm:mb-10 max-w-xl">
                Have an idea, a business or a brand ready for something different? We're listening.
              </p>

              <div className="space-y-6 border-t border-[#111111]/15 pt-8">
                <div>
                  <p className="text-xs font-mono font-bold tracking-widest uppercase text-[#111111]/60 mb-1">
                    DIRECT INQUIRIES
                  </p>
                  <a
                    href="mailto:hello@filtercoffeeco.in"
                    className="text-base sm:text-lg md:text-xl font-black text-[#111111] hover:text-[#2563EB] transition-colors break-all sm:break-normal"
                  >
                    hello@filtercoffeeco.in
                  </a>
                </div>

                <div>
                  <p className="text-xs font-mono font-bold tracking-widest uppercase text-[#111111]/60 mb-2">
                    CONNECT WITH US
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/filtercoffeeco/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold tracking-wider uppercase text-[#111111] hover:text-[#2563EB] transition-colors py-1"
                    >
                      Instagram ↗
                    </a>
                    <a
                      href="https://www.linkedin.com/company/filtercoffeeco/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold tracking-wider uppercase text-[#111111] hover:text-[#2563EB] transition-colors py-1"
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 pt-6 border-t border-[#111111]/10">
              <p className="font-mono text-xs tracking-widest uppercase text-[#111111]/60">
                EVERY GREAT THING STARTS SOMEWHERE.
              </p>
            </div>
          </div>

          {/* Right Column: Clean, Functional Form */}
          <div className="lg:col-span-6 bg-white border border-[#111111]/10 rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#BFE9FF] text-[#2563EB] flex items-center justify-center mx-auto mb-6 text-2xl font-black">
                  ✓
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#111111] uppercase mb-3">
                  MESSAGE RECEIVED!
                </h3>
                <p className="text-[#111111]/75 text-base leading-relaxed max-w-sm mx-auto mb-8">
                  Thanks for reaching out. We've got your message and will brew up a response shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', brand: '', message: '' });
                  }}
                  className="inline-flex items-center gap-2 border border-[#111111] hover:border-[#2563EB] text-[#111111] hover:text-[#2563EB] text-xs font-black tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-bold tracking-widest uppercase text-[#111111]/70 mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#F7F5EF] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-[16px] text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-bold tracking-widest uppercase text-[#111111]/70 mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-[#F7F5EF] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-[16px] text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="brand" className="block text-xs font-mono font-bold tracking-widest uppercase text-[#111111]/70 mb-2">
                    BRAND OR COMPANY NAME
                  </label>
                  <input
                    id="brand"
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    placeholder="Acme Co."
                    className="w-full bg-[#F7F5EF] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-[16px] text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-bold tracking-widest uppercase text-[#111111]/70 mb-2">
                    TELL US ABOUT YOUR PROJECT *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What are we building, designing, or plotting together?"
                    className="w-full bg-[#F7F5EF] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-[16px] text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#111111] hover:bg-[#2563EB] text-white text-xs font-black tracking-[0.18em] uppercase py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {loading ? (
                    <span>SENDING...</span>
                  ) : (
                    <>
                      <span>LET'S START SOMETHING</span>
                      <span className="text-sm">↗</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
