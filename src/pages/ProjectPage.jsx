import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeSlideSection from '../components/FadeSlideSection';

const projects = {
  'brand-story': {
    tag: 'Campaign',
    title: 'Brand Story',
    subtitle: 'A full-funnel campaign that turned a local brand into a national conversation.',
    hero: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop',
    ],
    overview: 'We partnered with a heritage brand to craft a storytelling campaign connecting their legacy to a new generation. Every touchpoint from Reels to OOH was built around one truth: this is where the identity begins.',
    services: ['Campaign Strategy', 'Script Writing', 'Content Production', 'Media Planning'],
    results: ['4.2M impressions in 6 weeks', '38% increase in brand recall', '2.1x ROAS on paid media'],
  },
  'feed-first-creative': {
    tag: 'Social',
    title: 'Feed-First Creative',
    subtitle: 'Scroll-stopping social content engineered for the algorithm.',
    hero: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1400&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597359-bb5b2a096c45?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&q=80&auto=format&fit=crop',
    ],
    overview: "Tasked with revamping a lifestyle brand's Instagram presence, we built a native-first creative system — Reels templates, carousel formats and story flows — designed to feel organic, not advertorial.",
    services: ['Social Strategy', 'Creative Direction', 'Content Production', 'Community Management'],
    results: ['3.5x increase in reach', '180% follower growth in 3 months', '62% boost in saves & shares'],
  },
  'visual-identity': {
    tag: 'Branding',
    title: 'Visual Identity',
    subtitle: 'Building a brand system that speaks before you say a word.',
    hero: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597359-bb5b2a096c45?w=900&q=80&auto=format&fit=crop',
    ],
    overview: 'A prestige wellness brand approached us with a vision. We built their entire visual identity from scratch: logo suite, typography system, colour palette, iconography and brand guidelines.',
    services: ['Brand Strategy', 'Logo Design', 'Typography', 'Brand Guidelines', 'Art Direction'],
    results: ['Full brand launched in 6 weeks', 'Featured in 2 design publications', '92% positive sentiment at launch'],
  },
  'creator-campaign': {
    tag: 'Influencer',
    title: 'Creator Campaign',
    subtitle: 'Putting the right voices behind the right products.',
    hero: 'https://images.unsplash.com/photo-1608248597359-bb5b2a096c45?w=1400&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&q=80&auto=format&fit=crop',
    ],
    overview: 'We managed an end-to-end influencer programme for a flagship beauty brand. From creator discovery and vetting, to brief writing, content approval and performance tracking — every creator felt like a true brand partner.',
    services: ['Creator Sourcing', 'Brief Writing', 'Content Review', 'Campaign Tracking'],
    results: ['47 creators activated', '12M combined reach', '1.8% average engagement rate'],
  },
  'product-listing': {
    tag: 'E-Commerce',
    title: 'Product Listing',
    subtitle: 'Turning browsers into buyers with optimised product content.',
    hero: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1400&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597359-bb5b2a096c45?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&q=80&auto=format&fit=crop',
    ],
    overview: 'An e-commerce brand had listing pages that were underperforming. We audited, rewrote and redesigned their product content — titles, bullets, A+ content and image sequencing — for both conversion and discoverability.',
    services: ['SEO Copywriting', 'A+ Content', 'Product Photography Direction', 'Conversion Optimisation'],
    results: ['34% lift in conversion rate', '2.4x increase in organic traffic', 'Significant revenue uplift'],
  },
  'integrated-campaign': {
    tag: 'Digital',
    title: 'Integrated Campaign',
    subtitle: 'One idea. Every channel. Maximum impact.',
    hero: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1400&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop',
    ],
    overview: 'We orchestrated a 360 launch campaign — paid social, influencer seeding, PR, SEO content and email nurture — all laddering up to a single brand message that cut through the noise.',
    services: ['Integrated Strategy', 'Paid Social', 'PR & Earned Media', 'SEO Content', 'Email Marketing'],
    results: ['8.6M total impressions', '22,000 app downloads in launch week', 'Featured in national publications'],
  },
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects[slug] || projects['brand-story'];

  return (
    <div className="min-h-screen bg-[#F7F5EF] relative text-[#111111]">
      {/* Hero */}
      <div className="relative h-[65vh] md:h-[75vh] overflow-hidden bg-[#111111]">
        <motion.img
          src={project.hero}
          alt={project.title}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 max-w-[1360px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[0.68rem] font-black tracking-widest uppercase text-white bg-[#2563EB] w-fit px-3.5 py-1 rounded-full mb-4 shadow-sm"
          >
            {project.tag}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-none text-white tracking-tight uppercase"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 text-base md:text-xl mt-4 max-w-xl font-medium"
          >
            {project.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Body */}
      <FadeSlideSection className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        {/* Overview + Services */}
        <div className="grid md:grid-cols-[1fr_320px] gap-12 md:gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-4">
              THE CHALLENGE & THE IDEA
            </p>
            <p className="text-lg md:text-xl text-[#111111]/85 leading-relaxed font-medium">
              {project.overview}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white p-6 md:p-8 rounded-2xl border border-[#111111]/10 shadow-sm"
          >
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-5">
              SERVICES DELIVERED
            </p>
            <ul className="space-y-3">
              {project.services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm font-bold text-[#111111]">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {project.results.map((r, i) => (
            <div key={i} className="bg-white border border-[#111111]/10 rounded-2xl p-8 shadow-sm">
              <p className="text-[0.65rem] font-mono font-bold tracking-widest uppercase text-[#2563EB] mb-3">
                KEY OUTCOME {i + 1}
              </p>
              <p className="text-xl md:text-2xl font-black text-[#111111] leading-snug">
                {r}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {project.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-[#111111]/10 shadow-sm group"
            >
              <img
                src={img}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        {/* Back CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#111111]/10 pt-12"
        >
          <Link
            to="/work"
            className="text-xs font-bold tracking-widest uppercase text-[#111111] hover:text-[#2563EB] transition-colors"
          >
            ← BACK TO ALL WORK
          </Link>
          <Link
            to="/contact"
            className="bg-[#111111] hover:bg-[#2563EB] text-white text-xs font-black tracking-widest uppercase px-8 py-4 rounded-full transition-all shadow-md"
          >
            START A PROJECT
          </Link>
        </motion.div>
      </FadeSlideSection>
    </div>
  );
}
