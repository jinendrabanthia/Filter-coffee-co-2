import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import ScrollFloat from './ScrollFloat';

const works = [
  {
    tag: 'Creative Campaign',
    client: 'Sephora India',
    label: 'Beauty Beyond Boundaries',
    cls: 'span2',
    slug: 'brand-story',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85&auto=format&fit=crop',
  },
  {
    tag: 'Social & Influencer',
    client: 'Kay Beauty',
    label: 'High-Impact Product Launch',
    cls: '',
    slug: 'feed-first-creative',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=85&auto=format&fit=crop',
  },
  {
    tag: 'Brand Story',
    client: "L'Oréal Paris",
    label: 'Because You are Worth It',
    cls: 'span-row2',
    slug: 'visual-identity',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=85&auto=format&fit=crop',
  },
  {
    tag: 'Digital & Content',
    client: 'Lacto Calamine',
    label: 'Everyday Skincare Routine',
    cls: '',
    slug: 'product-listing',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=85&auto=format&fit=crop',
  },
  {
    tag: 'Brand Experience',
    client: "Kiehl's",
    label: 'Apothecary Heritage Reimagined',
    cls: '',
    slug: 'creator-campaign',
    image: 'https://images.unsplash.com/photo-1608248597359-bb5b2a096c45?w=1200&q=85&auto=format&fit=crop',
  },
  {
    tag: 'Integrated Campaign',
    client: 'Matrix Haircare',
    label: 'Salon-First Transformation',
    cls: 'span2',
    slug: 'integrated-campaign',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1200&q=85&auto=format&fit=crop',
  },
];

function WorkCard({ tag, client, label, cls, image, slug, index }) {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`work-card bg-white border border-[#111111]/12 rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-xl hover:border-[#2563EB] transition-all duration-300 ${cls}`}
    >
      <Link
        to={`/work/${slug}`}
        className="block w-full h-full min-h-[260px] relative overflow-hidden flex items-center justify-center p-6 bg-[#111111] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]"
      >
        {/* High-Resolution Editorial Campaign Imagery */}
        <img
          src={image}
          alt={`${client} — ${label}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Gradient overlay for typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-75" />

        {/* Bottom Permanent Info Label */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col items-start gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[0.62rem] font-bold tracking-[0.16em] uppercase text-white bg-[#2563EB] px-2.5 py-1 rounded-full shadow-sm">
              {tag}
            </span>
            <span className="text-xs font-semibold text-white drop-shadow-md">
              {client}
            </span>
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-black !text-white tracking-tight capitalize" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            {label}
          </h3>
          {/* Mobile direct visual cue */}
          <span className="sm:hidden text-[0.68rem] font-bold uppercase tracking-wider text-white/80 mt-1 flex items-center gap-1">
            <span>View Case Study</span>
            <span>→</span>
          </span>
        </div>

        {/* Interactive Desktop Hover Overlay with Link */}
        <div className="hidden sm:flex absolute inset-0 bg-[#2563EB]/95 backdrop-blur-sm p-6 flex-col justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <div>
            <span className="text-[0.65rem] font-black tracking-[0.2em] uppercase text-white/80 bg-black/20 px-3 py-1 rounded-full inline-block mb-3">
              {tag}
            </span>
            <p className="text-xs font-bold text-white/90 uppercase tracking-widest mb-1">
              {client}
            </p>
            <h4 className="text-xl md:text-2xl font-black text-white leading-tight capitalize">
              {label}
            </h4>
          </div>

          <span className="inline-flex items-center gap-2 bg-white text-[#111111] group-hover:bg-[#BFE9FF] text-xs font-black tracking-[0.16em] uppercase px-5 py-2.5 rounded-full transition-all shadow-md">
            <span>VIEW CASE STUDY</span>
            <span>→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Work({ hideHeader = false }) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="work" className="py-20 md:py-24 bg-white relative z-10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {!hideHeader && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111111]/10 pb-8"
          >
            <div>
              <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#2563EB] mb-3">
                SELECTED WORK
              </p>
              <div className="text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.96] tracking-[-0.03em] uppercase">
                <ScrollFloat textClassName="text-[#111111] font-black" animationDuration={1.6} stagger={0.02}>
                  THE GOOD STUFF
                </ScrollFloat>
              </div>
            </div>
            <p className="text-[#111111]/75 text-base md:text-lg max-w-md font-medium">
              Ideas that left the deck and made it to feeds, screens and conversations.
            </p>
          </motion.div>
        )}

        {/* Masonry Grid */}
        <div className="work-masonry">
          {works.map((w, i) => (
            <WorkCard key={w.label + i} {...w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
