"use client";

import { motion, useMotionValue, useAnimation, PanInfo, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import GradientButton from "../ui/GradientButton";

const AUTOPLAY_DELAY = 4000;

const BASE_ITEMS = [
  { src: "https://lh3.googleusercontent.com/d/1M1VjX9BJlAD9xeX8WucUjvNec4jHFnps", title: "Something Good", subtitle: "CBD & ZERO-PROOF" },
  { src: "https://lh3.googleusercontent.com/d/1HvKeyD75tds4uRozMqP0P7fHHk7SvSnm", title: "The Point Burger", subtitle: "SHERRIED BACON JAM" },
  { src: "https://lh3.googleusercontent.com/d/1-jzbvWUn5JvHhu_WUGjFJ11D18-fxTH2", title: "Smoked Gouda Mac", subtitle: "ELEVATED CLASSICS" },
];

const menuItems = [...BASE_ITEMS, ...BASE_ITEMS];

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const x = useMotionValue(0);
  const controls = useAnimation();

  /* Responsive VISIBLE & GAP derived from container width */
  const VISIBLE = containerWidth < 600 ? 1 : containerWidth < 960 ? 2 : 3;
  const GAP = containerWidth < 600 ? 20 : containerWidth < 960 ? 48 : 97;

  const maxIndex = menuItems.length - VISIBLE;
  const cardWidth = containerWidth ? (containerWidth - GAP * (VISIBLE - 1)) / VISIBLE : 0;
  const slideStep = cardWidth + GAP;

  /* Reset position when VISIBLE changes (screen resize) */
  const prevVisibleRef = useRef(VISIBLE);
  useEffect(() => {
    if (prevVisibleRef.current !== VISIBLE) {
      prevVisibleRef.current = VISIBLE;
      setCurrentIndex(0);
      controls.start({ x: 0, transition: { duration: 0.3 } });
    }
  }, [VISIBLE, controls]);

  /* Track container width */
  useEffect(() => {
    if (!trackContainerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(trackContainerRef.current);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(maxIndex, index));
      setCurrentIndex(clamped);
      controls.start({
        x: -clamped * slideStep,
        transition: { type: "spring", stiffness: 300, damping: 35 },
      });
    },
    [controls, maxIndex, slideStep]
  );

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 60;
    if (info.offset.x < -threshold) goTo(currentIndex + 1);
    else if (info.offset.x > threshold) goTo(currentIndex - 1);
    else goTo(currentIndex);
  };

  /* Auto slide */
  useEffect(() => {
    if (!slideStep) return;
    const timer = setTimeout(() => {
      goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [currentIndex, maxIndex, slideStep, goTo]);

  const maxTranslate = maxIndex * slideStep;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#0c0e16" }}
    >
      {/* Layer 1: background image */}
      <div className="absolute inset-0">
        <Image src="https://lh3.googleusercontent.com/d/1vVl--3P-vHOROCYukyJ_PRZWHkLgyVdt" alt="" fill sizes="100vw" className="object-cover" aria-hidden />
      </div>
      {/* Layer 2: dark tint */}
      <div className="absolute inset-0" style={{ background: "rgba(12,14,22,0.20)" }} />
      {/* Layer 3: warm golden gradient top-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(117.59deg, #ffd677 0%, rgba(241,165,47,0) 40.15%)" }}
      />

      {/* Content */}
      <div
        className="relative w-full mx-auto flex flex-col justify-center gap-10 sm:gap-14
                   py-16 sm:py-20 lg:py-0 lg:min-h-270"
        style={{ padding: "clamp(48px, 5vw, 120px) clamp(16px, 2vw, 100px)" }}
      >
        {/* Carousel row */}
        <div className="flex w-full items-center gap-3 sm:gap-4">

          {/* Arrow Left */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="shrink-0 disabled:opacity-25 transition-opacity hover:opacity-70 select-none"
            aria-label="Previous"
          >
            <div className="relative w-8 h-6 sm:w-12.25 sm:h-9">
              <Image src="https://lh3.googleusercontent.com/d/1cAFD67WiqjEJLnxeojEvWXfeH5LbN52F" alt="Previous" fill className="object-contain" />
            </div>
          </button>

          {/* Track container */}
          <div ref={trackContainerRef} className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={{ left: -maxTranslate, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              animate={controls}
              style={{ x }}
              className="flex"
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={`${item.title}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: (i % VISIBLE) * 0.12 }}
                  className="flex flex-col gap-3 sm:gap-4 shrink-0 select-none"
                  style={{
                    width: cardWidth || `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
                    marginRight: i < menuItems.length - 1 ? GAP : 0,
                  }}
                >
                  {/* Card image */}
                  <div
                    className="relative group w-full transition-shadow duration-300 hover:shadow-brand-image cursor-pointer"
                    style={{ aspectRatio: "446/585" }}
                  >
                    {/* gradient border — hiện khi hover */}
                    <div className="brand-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* overflow-hidden tách ra để border không bị clip */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.12, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: (i % VISIBLE) * 0.2 }}
                      >
                        <Image src={item.src} alt={item.title} fill sizes="(max-width: 599px) 100vw, (max-width: 959px) 50vw, 33vw" className="object-cover" draggable={false} />
                      </motion.div>
                    </div>
                  </div>
                  <h3 className="font-good-times text-[clamp(16px,2.2vw,26px)] text-white leading-none">
                    {item.title}
                  </h3>
                  <p className="google-sans-flex text-[clamp(13px,1.6vw,20px)] leading-5 text-white/80">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Arrow Right */}
          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex >= maxIndex}
            className="shrink-0 disabled:opacity-25 transition-opacity hover:opacity-70 select-none"
            aria-label="Next"
          >
            <div className="relative w-8 h-6 sm:w-12.25 sm:h-9">
              <Image src="https://lh3.googleusercontent.com/d/1pfM0cNRhGgxoi5UH9O_vQ7p4BQqqI-uL" alt="Next" fill className="object-contain" />
            </div>
          </button>
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex justify-center"
        >
          <GradientButton size="md" className="w-49.25 whitespace-nowrap">
            View Menu &amp; Order
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
