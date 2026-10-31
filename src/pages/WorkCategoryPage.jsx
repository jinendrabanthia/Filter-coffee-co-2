import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WORK_CATEGORIES } from '../data/workCategories';
import BackgroundShapes from '../components/BackgroundShapes';

export default function WorkCategoryPage() {
  const { slug } = useParams();
  const category = WORK_CATEGORIES[slug];

  // If slug is not one of our categories, we let router or caller handle it
  if (!category) {
    return <Navigate to="/work" replace />;
  }

  const allCategoryKeys = Object.keys(WORK_CATEGORIES);

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20 overflow-hidden relative selection:bg-[#EF7722] selection:text-white">
      <BackgroundShapes variant="work" />

      {/* ── Top Navigation Bar: Breadcrumbs & Quick Discipline Switcher ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pt-4 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/10 pb-6">
          {/* Back breadcrumb */}
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-smoke hover:text-[#EF7722] transition-colors group"
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
                      ? 'bg-[#EF7722] text-white shadow-sm shadow-[#EF7722]/30'
                      : 'bg-white/80 hover:bg-white text-black/70 hover:text-black border border-black/10'
                  }`}
                >
                  {cat.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Main Hero Section ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pt-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">


            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.6rem,5.5vw,5.5rem)] font-black leading-[1.05] tracking-[-0.04em] text-black mb-3"
            >
              {category.tagline}
            </motion.h1>

            {/* Subline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.8rem,3.8vw,3.6rem)] font-serif italic font-normal text-black/70 leading-[1.15] tracking-tight mb-8"
            >
              {category.subline}
            </motion.h2>

            {/* In-depth Context Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-smoke text-base md:text-lg leading-relaxed max-w-2xl font-medium"
            >
              {category.heroDescription}
            </motion.p>
          </div>

          {/* Quick CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end"
          >
            <a
              href="mailto:hello@filtercoffeeco.in"
              className="mag-btn border border-black bg-black text-white text-[0.76rem] font-black tracking-widest uppercase px-10 py-4 rounded-full shadow-lg inline-flex"
            >
              <span>BRIEF THIS DISCIPLINE</span>
              <span className="ml-2">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Key Discipline Stats ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {category.stats.map((st, i) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-black/10 shadow-sm"
            >
              <div className="text-[clamp(1.8rem,3vw,2.8rem)] font-black text-black tracking-tight leading-none mb-2">
                {st.value}
              </div>
              <div className="text-[0.68rem] font-bold uppercase tracking-wider text-black/60">
                {st.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Widescreen Feature Showcase Hero Visual ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-black/10 shadow-2xl group"
        >
          <img
            src={category.heroImage}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="eager"
            decoding="async"
          />
          {/* Ambient gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Floating bottom badge */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
            <div>
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[0.62rem] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 mb-3">
                {category.badge} Visual Reel
              </span>
              <h3 className="text-white text-[clamp(1.4rem,2.5vw,2.4rem)] font-black leading-tight tracking-tight">
                {category.title} in Motion
              </h3>
            </div>
            <div className="text-white/70 text-xs font-medium max-w-sm">
              Engineered exclusively by the creative engineering & production studio at Filter Coffee Co.
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Capabilities ("What We Deliver") ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-widest2 uppercase text-smoke mb-3">
            <span className="w-6 h-px bg-black/30" />
            Core Capabilities
          </div>
          <h2 className="text-[clamp(2rem,3.6vw,3.6rem)] font-black text-black leading-tight tracking-tight">
            How we brew {category.title}.
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
              className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-black/10 hover:border-black/30 transition-all duration-300"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-xs font-black text-black mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-black text-black mb-3 tracking-tight">
                  {cap.name}
                </h3>
                <p className="text-smoke text-sm leading-relaxed font-normal">
                  {cap.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Strategic Framework Process ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <div className="glass-panel p-8 md:p-14 rounded-3xl border border-black/10 shadow-lg">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-widest2 uppercase text-smoke mb-3">
              <span className="w-6 h-px bg-black/30" />
              The Framework
            </div>
            <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-black text-black leading-tight tracking-tight">
              Our 3-Phase Execution Model
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {category.process.map((pr) => (
              <div key={pr.step} className="relative">
                <div className="text-[2.6rem] font-black text-black/15 leading-none mb-3 font-sans">
                  {pr.step}
                </div>
                <h3 className="text-lg font-bold text-black mb-3 tracking-tight">
                  {pr.title}
                </h3>
                <p className="text-smoke text-sm leading-relaxed font-medium">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deep-Dive Case Studies & Featured Campaigns ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-widest2 uppercase text-smoke mb-3">
              <span className="w-6 h-px bg-black/30" />
              Proof of Work
            </div>
            <h2 className="text-[clamp(2rem,3.6vw,3.6rem)] font-black text-black leading-tight tracking-tight">
              Featured {category.title} Campaigns
            </h2>
          </div>
          <p className="text-smoke text-sm max-w-sm font-medium">
            A small taste of the creative firepower and measurable return we deliver for our brand partners.
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
              className="glass-card noise-card rounded-3xl overflow-hidden border border-black/10 flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                <img
                  src={cs.image}
                  alt={cs.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="glass-pill px-3 py-1 rounded-full text-[0.62rem] font-black uppercase tracking-wider text-black bg-white/80 backdrop-blur-md">
                    {cs.category}
                  </span>
                </div>
                {/* Metric pill */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="bg-black/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl inline-block shadow-md">
                    ⚡ {cs.metric}
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest text-smoke mb-2">
                    {cs.client}
                  </div>
                  <h3 className="text-2xl font-black text-black leading-tight mb-3">
                    {cs.title}
                  </h3>
                  <p className="text-smoke text-sm leading-relaxed mb-6 font-medium">
                    {cs.description}
                  </p>
                </div>

                {/* Deliverables tags */}
                <div className="border-t border-black/8 pt-5 flex flex-wrap gap-2">
                  {cs.deliverables.map((d) => (
                    <span
                      key={d}
                      className="text-[0.65rem] font-bold uppercase tracking-wider bg-black/5 text-black/70 px-2.5 py-1 rounded-md"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Client Roster ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12 pb-24">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-black/10 text-center">
          <p className="text-[0.68rem] font-bold tracking-widest2 uppercase text-smoke mb-6">
            BRANDS PARTNERED WITH OUR {category.title.toUpperCase()} TEAM
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {category.clients.map((c) => (
              <span
                key={c}
                className="glass-pill px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black/80 border border-black/10 hover:border-black/40 hover:text-black transition-all"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Section: Next Discipline & CTA ── */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Next Category Teaser */}
          <Link
            to={`/work/${category.nextCategory.id}`}
            className="glass-card p-10 rounded-3xl border border-black/10 flex flex-col justify-between group hover:border-black/30 transition-all"
          >
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-smoke mb-2 inline-block">
                Next Capability →
              </span>
              <h3 className="text-3xl font-black text-black group-hover:translate-x-2 transition-transform duration-300">
                {category.nextCategory.title}
              </h3>
            </div>
            <div className="text-xs font-bold text-smoke uppercase tracking-wider mt-6 flex items-center gap-2">
              <span>View discipline</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Contact Direct Call */}
          <div className="bg-brand-navy text-white p-10 rounded-3xl flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/50 mb-2 inline-block">
                Start a Conversation
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Ready to brew a {category.title} campaign?
              </h3>
            </div>
            <div className="pt-6">
              <a
                href="mailto:hello@filtercoffeeco.in"
                className="bg-brand-yellow text-brand-navy text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-white transition-colors"
              >
                <span>Spill the beans with us</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
