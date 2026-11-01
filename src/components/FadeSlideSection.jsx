import { motion } from 'framer-motion';

/**
 * FadeSlideSection — Premium Fade-In and Slide-In Entrance Wrapper
 *
 * Provides a fluid, GPU-accelerated entrance for website sections:
 * - Smooth opacity fade-in (0 -> 1)
 * - Smooth vertical slide-in (y: 40px -> 0px)
 * - Viewport trigger threshold of 10%
 * - Animates once per page visit to retain readable, interactive content
 */
export default function FadeSlideSection({
  children,
  className = '',
  id,
  delay = 0,
  duration = 0.75,
  yOffset = 40,
  amount = 0.08,
  style,
  ...props
}) {
  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

