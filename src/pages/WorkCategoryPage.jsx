import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WORK_CATEGORIES } from '../data/workCategories';
import FadeSlideSection from '../components/FadeSlideSection';

export default function WorkCategoryPage() {
  const { slug } = useParams();
  const category = WORK_CATEGORIES[slug];

  if (!category) {
    return <Navigate to="/work" replace />;
  }

  const allCategoryKeys = Object.keys(WORK_CATEGORIES);

  return (
    <div className="min-h-screen bg-[#F7F5EF] pt-28 pb-20 overflow-hidden relative text-[#111111] selection:bg-[#2563EB] selection:text-white">
      {/* ── Top Navigation Bar: Breadcrumbs & Quick Discipline Switcher ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 pt-4 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#111111]/10 pb-6">
          {/* Back breadcrumb */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#111111]/70 hover:text-[#2563EB] transition-colors group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>All Capabilities & Work</span>
          </Link>

          {/* Quick discipline switcher pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {allCategoryKeys.map((key) => {
              const cat = WORK_CATEGORIES[key];
              const isActive = key === slug;
              return (
                <Link
                  key={key}
                  to={`/work/${key}`}
                  className={`text-[0.68rem] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-white hover:bg-[#BFE9FF] text-[#111111]/80 hover:text-[#111111] border border-[#111111]/10'
                  }`}
                >
                  {cat.title}
                </Link>
              );
            })}
          </div>
        </div>
      </FadeSlideSection>

      {/* ── Main Hero Section ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 pt-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.1rem,5.5vw,5.5rem)] font-black leading-[1.05] tracking-[-0.04em] text-[#111111] mb-3 uppercase"
            >
              {category.tagline}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.3rem,3.2vw,3rem)] italic font-light text-[#111111]/70 leading-[1.15] tracking-tight mb-6 sm:mb-8"
            >
              {category.subline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#111111]/80 text-base md:text-lg leading-relaxed max-w-2xl font-medium"
            >
              {category.heroDescription}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end"
          >
            <Link
              to="/contact"
              className="bg-[#111111] hover:bg-[#2563EB] text-white text-[0.76rem] font-black tracking-widest uppercase px-9 py-4 rounded-full shadow-lg inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>BRIEF THIS DISCIPLINE</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </FadeSlideSection>

      {/* ── Key Discipline Stats ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {category.stats.map((st, i) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="bg-white p-6 rounded-2xl flex flex-col justify-between border border-[#111111]/10 shadow-sm"
            >
              <div className="text-[clamp(1.8rem,3vw,2.8rem)] font-black text-[#2563EB] tracking-tight leading-none mb-2">
                {st.value}
              </div>
              <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[#111111]/60">
                {st.label}
              </div>
            </motion.div>
          ))}
        </div>
      </FadeSlideSection>

      {/* ── Widescreen Feature Showcase Hero Visual ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-[#111111]/10 shadow-xl group bg-white"
        >
          <img
            src={category.heroImage}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
            <div>
              <span className="inline-block bg-[#2563EB] text-white text-[0.62rem] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                {category.badge}
              </span>
              <h3 className="text-white text-[clamp(1.4rem,2.5vw,2.4rem)] font-black leading-tight tracking-tight uppercase">
                {category.title} in Action
              </h3>
            </div>
            <div className="text-white/80 text-xs font-medium max-w-sm">
              Engineered exclusively by the creative & strategy team at Filter Coffee Co.
            </div>
          </div>
        </motion.div>
      </FadeSlideSection>

      {/* ── Capabilities ("What We Deliver") ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <div className="mb-12">
          <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-3">
            CORE CAPABILITIES
          </p>
          <h2 className="text-[clamp(2rem,3.6vw,3.6rem)] font-black text-[#111111] leading-tight tracking-tight uppercase">
            HOW WE SHAPE {category.title}.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.capabilities.map((cap, i) => (
            <motion.div
              key={cap.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white p-8 rounded-2xl flex flex-col justify-between border border-[#111111]/10 hover:border-[#2563EB] shadow-sm transition-all duration-300"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-[#BFE9FF] flex items-center justify-center text-xs font-black text-[#2563EB] mb-6 font-mono">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-black text-[#111111] mb-3 tracking-tight">
                  {cap.name}
                </h3>
                <p className="text-[#111111]/70 text-sm leading-relaxed font-medium">
                  {cap.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeSlideSection>

      {/* ── Strategic Framework Process ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <div className="bg-white p-8 md:p-14 rounded-3xl border border-[#111111]/10 shadow-md">
          <div className="mb-10">
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-3">
              THE METHOD
            </p>
            <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-black text-[#111111] leading-tight tracking-tight uppercase">
              Our 3-Phase Execution Model
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {category.process.map((pr) => (
              <div key={pr.step} className="border-t border-[#111111]/10 pt-6">
                <div className="text-[2.2rem] font-black text-[#2563EB] leading-none mb-3 font-mono">
                  {pr.step}
                </div>
                <h3 className="text-lg font-black text-[#111111] mb-2 tracking-tight">
                  {pr.title}
                </h3>
                <p className="text-[#111111]/70 text-sm leading-relaxed font-medium">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeSlideSection>

      {/* ── Deep-Dive Case Studies & Featured Campaigns ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#111111]/10 pb-6">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-2">
              PROOF OF WORK
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3.6rem)] font-black text-[#111111] leading-tight tracking-tight uppercase">
              Featured {category.title} Campaigns
            </h2>
          </div>
          <p className="text-[#111111]/70 text-sm max-w-sm font-medium">
            Creative firepower and measurable return we deliver for our brand partners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {category.caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-[#111111]/10 flex flex-col group shadow-sm hover:shadow-lg transition-all"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F5EF]">
                <img
                  src={cs.image}
                  alt={cs.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[0.62rem] font-black uppercase tracking-wider text-[#111111] bg-white/90 shadow-sm">
                    {cs.category}
                  </span>
                </div>
                {/* Metric pill */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="bg-[#111111] text-white text-xs font-bold px-4 py-2 rounded-xl inline-block shadow-md">
                    ⚡ {cs.metric}
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[#2563EB] mb-2">
                    {cs.client}
                  </div>
                  <h3 className="text-2xl font-black text-[#111111] leading-tight mb-3">
                    {cs.title}
                  </h3>
                  <p className="text-[#111111]/75 text-sm leading-relaxed mb-6 font-medium">
                    {cs.description}
                  </p>
                </div>

                <div className="border-t border-[#111111]/8 pt-5 flex flex-wrap gap-2">
                  {cs.deliverables.map((d) => (
                    <span
                      key={d}
                      className="text-[0.65rem] font-bold uppercase tracking-wider bg-[#F7F5EF] text-[#111111] px-2.5 py-1 rounded-md border border-[#111111]/5"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeSlideSection>

      {/* ── Client Roster ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl border border-[#111111]/10 text-center shadow-sm">
          <p className="text-[0.68rem] font-bold tracking-[0.22em] uppercase text-[#111111]/60 mb-6">
            BRANDS PARTNERED WITH OUR {category.title.toUpperCase()} TEAM
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {category.clients.map((c) => (
              <span
                key={c}
                className="bg-[#F7F5EF] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#111111] border border-[#111111]/10 hover:border-[#2563EB] hover:text-[#2563EB] transition-all"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </FadeSlideSection>

      {/* ── Bottom Section: Next Discipline & CTA ── */}
      <FadeSlideSection className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <Link
            to={`/work/${category.nextCategory.id}`}
            className="bg-white p-6 sm:p-10 rounded-3xl border border-[#111111]/10 flex flex-col justify-between group hover:border-[#2563EB] shadow-sm transition-all"
          >
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#2563EB] mb-2 inline-block">
                Next Capability →
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] group-hover:translate-x-2 transition-transform duration-300 uppercase">
                {category.nextCategory.title}
              </h3>
            </div>
            <div className="text-xs font-bold text-[#111111]/60 uppercase tracking-wider mt-6 flex items-center gap-2">
              <span>View discipline</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <div className="bg-[#111111] text-white p-6 sm:p-10 rounded-3xl flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#BFE9FF] mb-2 inline-block">
                Start a Conversation
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                Ready to create a {category.title} campaign?
              </h3>
            </div>
            <div className="pt-6">
              <Link
                to="/contact"
                className="bg-[#2563EB] text-white hover:bg-white hover:text-[#111111] text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-colors shadow-md"
              >
                <span>LET'S TALK</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </FadeSlideSection>
    </div>
  );
}
