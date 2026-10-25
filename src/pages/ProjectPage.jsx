import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundShapes from '../components/BackgroundShapes';

const projects = {
  'brand-story': {
    tag: 'Campaign',
    title: 'Brand Story',
    subtitle: 'A full-funnel campaign that turned a local brand into a national conversation.',
    hero: 'https://picsum.photos/seed/brandstory1/1400/800',
    images: [
      'https://picsum.photos/seed/brandstory2/900/600',
      'https://picsum.photos/seed/brandstory3/900/600',
      'https://picsum.photos/seed/brandstory4/900/600',
    ],
    overview: 'We partnered with a heritage food brand to craft a storytelling campaign that connected their 30-year legacy to a Gen-Z audience. Every touchpoint from Reels to OOH was built around one truth: this is where it all began.',
    services: ['Campaign Strategy', 'Script Writing', 'Content Production', 'Media Planning'],
    results: ['4.2M impressions in 6 weeks', '38% increase in brand recall', '2.1x ROAS on paid media'],
  },
  'feed-first-creative': {
    tag: 'Social',
    title: 'Feed-First Creative',
    subtitle: 'Scroll-stopping social content engineered for the algorithm.',
    hero: 'https://picsum.photos/seed/socialfeed1/1400/800',
    images: [
      'https://picsum.photos/seed/socialfeed2/900/600',
      'https://picsum.photos/seed/socialfeed3/900/600',
      'https://picsum.photos/seed/socialfeed4/900/600',
    ],
    overview: 'Tasked with revamping a lifestyle brand\'s Instagram presence, we built a native-first creative system — Reels templates, carousel formats and story flows — designed to feel organic, not advertorial.',
    services: ['Social Strategy', 'Creative Direction', 'Content Production', 'Community Management'],
    results: ['3.5x increase in reach', '180% follower growth in 3 months', '62% boost in saves & shares'],
  },
  'visual-identity': {
    tag: 'Branding',
    title: 'Visual Identity',
    subtitle: 'Building a brand system that speaks before you say a word.',
    hero: 'https://picsum.photos/seed/visualid1/1400/800',
    images: [
      'https://picsum.photos/seed/visualid2/900/600',
      'https://picsum.photos/seed/visualid3/900/600',
      'https://picsum.photos/seed/visualid4/900/600',
    ],
    overview: 'A D2C wellness brand approached us with a name and a dream. We built their entire visual identity from scratch: logo suite, typography system, colour palette, iconography and brand guidelines.',
    services: ['Brand Strategy', 'Logo Design', 'Typography', 'Brand Guidelines', 'Art Direction'],
    results: ['Full brand launched in 6 weeks', 'Featured in 2 design publications', '92% positive sentiment at launch'],
  },
  'creator-campaign': {
    tag: 'Influencer',
    title: 'Creator Campaign',
    subtitle: 'Putting the right voices behind the right products.',
    hero: 'https://picsum.photos/seed/creator1/1400/800',
    images: [
      'https://picsum.photos/seed/creator2/900/600',
      'https://picsum.photos/seed/creator3/900/600',
      'https://picsum.photos/seed/creator4/900/600',
    ],
    overview: 'We managed an end-to-end influencer programme for a new beverage brand. From creator discovery and vetting, to brief writing, content approval and performance tracking — every creator felt like a true brand partner.',
    services: ['Creator Sourcing', 'Brief Writing', 'Content Review', 'Campaign Tracking'],
    results: ['47 creators activated', '12M combined reach', '1.8% average engagement rate'],
  },
  'product-listing': {
    tag: 'E-Commerce',
    title: 'Product Listing',
    subtitle: 'Turning browsers into buyers with optimised product content.',
    hero: 'https://picsum.photos/seed/ecomm1/1400/800',
    images: [
      'https://picsum.photos/seed/ecomm2/900/600',
      'https://picsum.photos/seed/ecomm3/900/600',
      'https://picsum.photos/seed/ecomm4/900/600',
    ],
    overview: 'An e-commerce brand with 300+ SKUs had listing pages that were underperforming. We audited, rewrote and redesigned their product content — titles, bullets, A+ content and image sequencing — for both conversion and discoverability.',
    services: ['SEO Copywriting', 'A+ Content', 'Product Photography Direction', 'Conversion Optimisation'],
    results: ['34% lift in conversion rate', '2.4x increase in organic traffic', 'Rs 1.2Cr additional monthly revenue'],
  },
  'integrated-campaign': {
    tag: 'Digital',
    title: 'Integrated Campaign',
    subtitle: 'One idea. Every channel. Maximum impact.',
    hero: 'https://picsum.photos/seed/integ1/1400/800',
    images: [
      'https://picsum.photos/seed/integ2/900/600',
      'https://picsum.photos/seed/integ3/900/600',
      'https://picsum.photos/seed/integ4/900/600',
    ],
    overview: 'We orchestrated a 360 launch campaign for a fintech startup — paid social, influencer seeding, PR, SEO content and email nurture — all laddering up to a single brand message that cut through the noise.',
    services: ['Integrated Strategy', 'Paid Social', 'PR & Earned Media', 'SEO Content', 'Email Marketing'],
    results: ['8.6M total impressions', '22,000 app downloads in launch week', 'Featured in 3 national publications'],
  },
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects[slug];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h1 className="text-4xl font-black text-brand-navy mb-4">Project not found</h1>
          <Link to="/work" className="text-smoke font-semibold underline">Back to Work</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent relative">
      <BackgroundShapes variant="project" />
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <motion.img
          src={project.hero}
          alt={project.title}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[0.65rem] font-bold tracking-widest uppercase text-white/60 border border-white/30 w-fit px-3 py-1 rounded-full mb-5"
          >
            {project.tag}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,7vw,7rem)] font-black leading-none text-white tracking-tight"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-white/70 text-lg mt-4 max-w-xl font-light"
          >
            {project.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-20">

        {/* Overview + Services */}
        <div className="grid md:grid-cols-[1fr_320px] gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[0.65rem] font-bold tracking-widest uppercase text-brand-navy/50 mb-5">Overview</p>
            <p className="text-[1.15rem] text-brand-navy/80 leading-[1.85] font-light">{project.overview}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-[0.65rem] font-bold tracking-widest uppercase text-brand-navy/50 mb-5">Services</p>
            <ul className="space-y-3">
              {project.services.map(s => (
                <li key={s} className="flex items-center gap-3 text-[0.9rem] font-medium text-brand-navy/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/40 shrink-0" />
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
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {project.results.map((r, i) => (
            <div key={i} className="bg-brand-navy text-white rounded-2xl p-8">
              <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/40 mb-3">Result {i + 1}</p>
              <p className="text-[1.15rem] font-black leading-snug">{r}</p>
            </div>
          ))}
        </motion.div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {project.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Back CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between border-t border-black/10 pt-12"
        >
          <Link to="/work" className="text-[0.75rem] font-bold tracking-widest uppercase text-brand-navy/50 hover:text-brand-navy transition-colors">
            ← Back to Work
          </Link>
          <a href="mailto:hello@filtercoffeeco.in" className="bg-brand-navy text-white text-[0.72rem] font-black tracking-widest uppercase px-8 py-4 rounded-full hover:bg-brand-navy/90 transition-colors">
            Start a Project
          </a>
        </motion.div>
      </div>
    </div>
  );
}
