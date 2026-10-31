import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * InteractiveBox
 * An original, continuous hand-drawn cardboard box illustration that transitions
 * seamlessly between CLOSED (Stage One intro) and OPEN (Stage Three homepage).
 *
 * Color palette strictly follows Image 2 (Electric Blue direction):
 * - Sky Blue: #BFE9FF
 * - Cobalt Blue: #2563EB
 * - Almost Black: #111111
 * - Box Body: Light off-white / pale sky (#F7FAFC / #E2EFF7)
 * - Restrained accents: Tangerine (#FF6B35), Acid Lime (#D5F45B)
 */
export default function InteractiveBox({
  isOpen = false,
  isOpening = false,
  onOpen,
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine active visual state
  const isClosed = !isOpen && !isOpening;

  // Path data for the 4 flaps (4 vertices each for flawless Framer Motion path interpolation)
  const flapBackLeft = isClosed
    ? 'M 140 240 L 250 190 L 195 215 L 140 240 Z'
    : 'M 140 240 L 250 190 L 230 135 L 125 180 Z';

  const flapBackRight = isClosed
    ? 'M 250 190 L 380 230 L 315 210 L 250 190 Z'
    : 'M 250 190 L 380 230 L 395 175 L 275 135 Z';

  const flapFrontLeft = isClosed
    ? 'M 140 240 L 250 290 L 195 265 L 140 240 Z'
    : 'M 140 240 L 250 290 L 230 325 L 125 275 Z';

  const flapFrontRight = isClosed
    ? 'M 250 290 L 380 230 L 315 260 L 250 290 Z'
    : 'M 250 290 L 380 230 L 405 260 L 275 325 Z';

  const flapTransition = {
    duration: 2.8,
    delay: 0.4,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <motion.div
      onClick={isClosed ? onOpen : undefined}
      onKeyDown={(e) => {
        if (isClosed && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpen?.();
        }
      }}
      tabIndex={isClosed ? 0 : -1}
      role={isClosed ? 'button' : 'region'}
      aria-label={isClosed ? 'Closed cardboard shipping box. Click or press enter to open the box.' : 'Open Filter Coffee Co. creative box'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isClosed && isHovered ? 1.03 : 1,
        y: isClosed && isHovered ? -6 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative w-full aspect-[380/430] flex items-center justify-center select-none ${
        isClosed ? 'cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB] rounded-3xl' : ''
      } ${className}`}
    >
      {/* Main Box SVG Container */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full relative"
      >
        <svg
          viewBox="60 40 380 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          {/* ── GROUND SHADOW (with hand-drawn hatching) ── */}
          <ellipse cx="255" cy="445" rx="145" ry="22" fill="#111111" fillOpacity="0.14" />
          <path d="M150 442L165 450" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          <path d="M165 440L180 448" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          <path d="M180 438L195 446" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          <path d="M320 440L335 448" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
          <path d="M335 442L350 450" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />

          {/* ── SKETCH ACCENT DASHES (Hand-drawn Energy Marks) ── */}
          <path d="M90 125L105 145" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
          <path d="M108 108L120 130" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
          <path d="M435 240L420 255" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
          <path d="M448 262L430 274" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
          <path d="M80 355L100 370" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
          <path d="M92 380L108 398" stroke="#111111" strokeWidth="3" strokeLinecap="round" />

          {/* ── EMERGING CREATIVE SHAPES (Spring out when box opens) ── */}
          <motion.g
            initial={false}
            animate={{
              opacity: isOpen || isOpening ? 1 : 0,
              scale: isOpen || isOpening ? 1 : 0,
              y: isOpen || isOpening ? 0 : 50,
            }}
            transition={{ duration: 3.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tangerine star/burst rising to top right */}
            <motion.g
              animate={{ rotate: [0, 8, -8, 0], y: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M320 80L328 100L350 102L333 118L338 140L320 128L302 140L307 118L290 102L312 100Z"
                fill="#FF6B35"
                stroke="#111111"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Acid Lime Asterisk spinning to top left */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '180px 85px' }}
            >
              <path
                d="M175 75L185 95M185 75L175 95M170 85L190 85"
                stroke="#D5F45B"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Bold Graphic 'F' rising from box cavity */}
            <motion.g
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <rect x="235" y="65" width="12" height="48" rx="2" fill="#2563EB" stroke="#111111" strokeWidth="2.5" />
              <rect x="247" y="65" width="28" height="11" rx="2" fill="#2563EB" stroke="#111111" strokeWidth="2.5" />
              <rect x="247" y="84" width="20" height="9" rx="2" fill="#2563EB" stroke="#111111" strokeWidth="2.5" />
            </motion.g>

            {/* Playful Spiral / Spark */}
            <path
              d="M210 110Q200 90 220 80T230 60"
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* ── BOX BODY ── */}
          {/* Left / Shaded Panel */}
          <polygon
            points="140,240 250,290 250,440 140,375"
            fill="#E2EFF7"
            stroke="#111111"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Right / Highlight Panel */}
          <polygon
            points="250,290 380,230 380,365 250,440"
            fill="#F7FAFC"
            stroke="#111111"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Interior Cavity (Deep dark opening revealed when flaps open) */}
          <polygon
            points="140,240 250,190 380,230 250,290"
            fill="#162E40"
            stroke="#111111"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Inner shadow gradient on cavity */}
          <polygon
            points="140,240 250,190 380,230 250,290"
            fill="#0A1822"
            fillOpacity={isOpen || isOpening ? 0.75 : 0}
          />

          {/* ── 4 ARTICULATED FLAPS (Continuous Morphing from Closed to Open) ── */}
          {/* Back-Left Flap */}
          <motion.path
            d={flapBackLeft}
            fill="#EFF6FA"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
            transition={flapTransition}
          />

          {/* Back-Right Flap */}
          <motion.path
            d={flapBackRight}
            fill="#EFF6FA"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
            transition={flapTransition}
          />

          {/* Front-Left Flap */}
          <motion.path
            d={flapFrontLeft}
            fill="#D5E8F5"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
            transition={flapTransition}
          />

          {/* Front-Right Flap */}
          <motion.path
            d={flapFrontRight}
            fill="#D5E8F5"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
            transition={flapTransition}
          />

          {/* ── COBALT BLUE SEALING TAPE (#2563EB) ── */}
          {/* Top Tape (Seals the box top seam when closed; tears and slides away when opened) */}
          <motion.path
            d="M 195 215 L 218 205 L 320 252 L 297 262 Z"
            fill="#2563EB"
            stroke="#111111"
            strokeWidth="2"
            animate={{
              opacity: isClosed ? 1 : 0,
              scaleY: isClosed ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: 'easeIn' }}
            style={{ transformOrigin: '250px 230px' }}
          />

          {/* Front Tape (Running down the front crease) */}
          <motion.path
            d="M 238 284 L 262 274 L 262 335 L 238 345 Z"
            fill="#2563EB"
            stroke="#111111"
            strokeWidth="2.5"
            animate={{
              height: isClosed ? 60 : 50,
            }}
            transition={{ duration: 0.5 }}
          />
          {/* Zig-zag jagged cut edge on the tape bottom */}
          <path
            d="M 238 345 L 244 341 L 250 345 L 256 341 L 262 345"
            stroke="#111111"
            strokeWidth="2"
            fill="none"
          />

          {/* ── HANGING BRAND TAG ── */}
          {/* Dotted string suspended from tape */}
          <path d="M250 330 L250 355" stroke="#111111" strokeWidth="2" strokeDasharray="3 3" />

          {/* Tag Card (Interactive wiggle on hover) */}
          <motion.g
            animate={{
              rotate: isClosed && isHovered ? [-3, 3, -3] : [0, 1, -1, 0],
            }}
            transition={{
              duration: isClosed && isHovered ? 0.6 : 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '250px 355px' }}
          >
            <g transform="translate(187, 355)">
              <rect
                x="0"
                y="0"
                width="126"
                height="44"
                rx="6"
                fill="#FFFFFF"
                stroke="#111111"
                strokeWidth="2.5"
              />
              {/* Eyelet hole */}
              <circle cx="63" cy="7" r="2.8" fill="#111111" />

              {/* Tag Content: Official trademark logo in one line sentence */}
              <text
                x="63"
                y="26"
                textAnchor="middle"
                fontFamily="'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
                fontWeight="900"
                fontSize="9.8"
                letterSpacing="-0.015em"
                fill="#111111"
              >
                FILTER COFFEE <tspan fontSize="6.2" fontWeight="900" dx="1.5">co.</tspan>
              </text>
              <text
                x="63"
                y="36"
                textAnchor="middle"
                fontFamily="'SF Pro Display', -apple-system, sans-serif"
                fontWeight="800"
                fontSize="5.2"
                letterSpacing="0.14em"
                fill="#2563EB"
              >
                {isClosed ? 'KNOCK, KNOCK!' : 'CREATIVE AGENCY'}
              </text>
            </g>
          </motion.g>

          {/* Subtle Shipping Box Trademark Stamp on right box panel */}
          <g transform="translate(262, 332) rotate(-24) skewX(24)" opacity="0.22" pointerEvents="none">
            <rect x="0" y="0" width="98" height="20" rx="3" fill="none" stroke="#111111" strokeWidth="1.2" strokeDasharray="3 2" />
            <text
              x="49"
              y="13"
              textAnchor="middle"
              fontFamily="'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
              fontWeight="900"
              fontSize="7"
              letterSpacing="-0.01em"
              fill="#111111"
            >
              FILTER COFFEE <tspan fontSize="4.6" fontWeight="900">co.</tspan>
            </text>
          </g>

          {/* Corner Hand-drawn hatching lines on box side */}
          <path d="M155 350L170 365" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
          <path d="M165 345L180 360" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
          <path d="M175 340L190 355" stroke="#111111" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

