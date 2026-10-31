'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1.4,
  ease = 'power3.out',
  scrollStart = 'top 90%',
  stagger = 0.04,
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char inline-block" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;
    const ctx = gsap.context(() => {
      const charElements = el.querySelectorAll('.char');

      // Set initial hidden state
      gsap.set(charElements, { opacity: 0, yPercent: 40, transformOrigin: '50% 100%' });

      // Play once when scrolled into view — no scrub, stays visible on scroll back
      ScrollTrigger.create({
        trigger: el,
        scroller,
        start: scrollStart,
        onEnter: () => {
          gsap.to(charElements, {
            opacity: 1,
            yPercent: 0,
            duration: animationDuration,
            ease,
            stagger,
            overwrite: true,
          });
        },
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
