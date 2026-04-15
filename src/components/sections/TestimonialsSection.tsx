"use client";

import { motion, useInView, useAnimation, PanInfo } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

const BASE_REVIEWS = [
  {
    avatar: "/assets/images/review-avatar-1.png",
    name: "David Washington",
    text: "Finally, a place in Burien to watch the game without feeling like I'm in a frat house. The Smoked Gouda Mac is incredible and the upscale vibe is exactly what we needed.",
  },
  {
    avatar: "/assets/images/review-avatar-2.png",
    name: "Sarah Mitchell",
    text: "We booked The Treehouse for a 40th birthday. The staff handled everything perfectly, and the signature CBD mocktails were a massive hit with our group!",
  },
  {
    avatar: "/assets/images/review-avatar-3.png",
    name: "Marcus Johnson",
    text: "Great energy, premium drinks, and the Sherried Bacon Jam burger is hands down the best I've had in years. This is my new go-to weekend spot.",
  },
];

/* Nhân đôi để có thể kéo slide */
const reviews = [...BASE_REVIEWS, ...BASE_REVIEWS];

const V_GRADIENT = "linear-gradient(to bottom, #e3ac77 0%, #d05b3c 50%, #bc0a00 100%)";
const H_TOP = "#e3ac77";
const H_BOTTOM = "#bc0a00";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const trackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  /* Responsive: mobile = 1 card, desktop = 3 cards */
  const VISIBLE = containerWidth < 768 ? 1 : 3;
  const cardWidth = containerWidth ? containerWidth / VISIBLE : 0;
  const slideStep = cardWidth;
  const maxIndex = reviews.length - VISIBLE;

  /* Đo width container */
  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  /* Reset khi VISIBLE thay đổi (resize màn hình) */
  const prevVisible = useRef(VISIBLE);
  useEffect(() => {
    if (prevVisible.current !== VISIBLE) {
      prevVisible.current = VISIBLE;
      setCurrentIndex(0);
      controls.start({ x: 0, transition: { duration: 0.3 } });
    }
  }, [VISIBLE, controls]);

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

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 60;
    if (info.offset.x < -threshold) goTo(currentIndex + 1);
    else if (info.offset.x > threshold) goTo(currentIndex - 1);
    else goTo(currentIndex);
  };

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative w-full bg-main overflow-hidden lg:top-12.5 lg:min-h-269.75"
    >
      {/* CỤC GẠCH 1 */}
      <div className="w-full h-15 lg:h-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-480 mx-auto flex flex-col items-center px-6 lg:px-0 lg:min-h-269.75">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="w-[75%] mx-auto lg:w-auto font-good-times text-[clamp(32px,6vw,45px)] leading-[1.18] text-white text-center lg:pt-31.25"
        >
          What Our Guests Say
        </motion.h2>

        {/* CỤC GẠCH 2 */}
        <div className="w-full h-12 lg:h-0 pointer-events-none" aria-hidden="true" />

        {/* Frame + drag track */}
        <div
          ref={trackRef}
          className="relative w-full h-115 sm:h-125 lg:top-12.5 lg:h-160 overflow-hidden cursor-grab active:cursor-grabbing"
        >
          {/* Gradient border frame — z-10 nổi trên track */}
          <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none" style={{ height: "1px", background: H_TOP }} />
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" style={{ height: "1px", background: H_BOTTOM }} />
          <div className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none" style={{ width: "1px", background: V_GRADIENT }} />
          <div className="absolute top-0 bottom-0 right-0 z-10 pointer-events-none" style={{ width: "1px", background: V_GRADIENT }} />

          {/* Draggable track */}
          <motion.div
            drag="x"
            dragConstraints={{ left: -(maxIndex * slideStep), right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="flex h-full select-none"
          >
            {reviews.map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="relative flex shrink-0 h-full"
                style={{ width: cardWidth || `${100 / VISIBLE}%` }}
              >
                {/* Divider dọc giữa các card */}
                {i > 0 && (
                  <div
                    className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none"
                    style={{ width: "1px", background: V_GRADIENT }}
                  />
                )}

                {/* Nội dung card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: (i % VISIBLE) * 0.15 }}
                  className="flex-1 flex flex-col items-center justify-center gap-6 lg:gap-12.25 px-4 lg:px-14.75"
                >
                  {/* Avatar */}
                  <div className="relative w-24 h-24 lg:w-35.5 lg:h-35.5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Name */}
                  <p className="font-good-times text-[clamp(18px,3vw,30px)] text-white text-center leading-none">
                    {review.name}
                  </p>

                  {/* Review text */}
                  <p className="google-sans-flex text-[clamp(14px,1.2vw,20px)] leading-8 text-white/90 text-center lg:max-w-130.25">
                    {review.text}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CỤC GẠCH 5 */}
        <div className="w-full h-12 lg:h-0 pointer-events-none" aria-hidden="true" />

        {/* Pagination dots — clickable, track currentIndex % 3 */}
        <div className="flex gap-3 lg:translate-y-40">
          {BASE_REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`w-4.5 h-4.5 rounded-full border-2 border-white transition-all duration-300 ${
                currentIndex % BASE_REVIEWS.length === i
                  ? "bg-white scale-110"
                  : "bg-transparent border-white/60 hover:border-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CỤC GẠCH 6 */}
      <div className="w-full h-15 lg:h-0 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
