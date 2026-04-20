"use client";

import { motion, useInView, useAnimation, PanInfo } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

const BASE_REVIEWS = [
  {
    avatar: "https://lh3.googleusercontent.com/d/1-6zPn3lCI4ZuWnXo0C9rxQERd89_tuLF",
    name: "David Washington",
    text: "Finally, a place in Burien to watch the game without feeling like I'm in a frat house. The Smoked Gouda Mac is incredible and the upscale vibe is exactly what we needed.",
  },
  {
    avatar: "https://lh3.googleusercontent.com/d/1N5HJnxllqEtoe6qagSUl67dGMwckWVdw",
    name: "Sarah Mitchell",
    text: "We booked The Treehouse for a 40th birthday. The staff handled everything perfectly, and the signature CBD mocktails were a massive hit with our group!",
  },
  {
    avatar: "https://lh3.googleusercontent.com/d/1o5RSTOkRBjxl3dSjWNLC2GALGg_p1ws5",
    name: "Marcus Johnson",
    text: "Great energy, premium drinks, and the Sherried Bacon Jam burger is hands down the best I've had in years. This is my new go-to weekend spot.",
  },
];

// Nhân bản mảng nhiều lần để tạo vùng đệm (buffer) cho lặp vô hạn
const REPEAT = 5;
const reviews = Array.from({ length: REPEAT }).flatMap(() => BASE_REVIEWS); // Chiều dài = 15
const baseLen = BASE_REVIEWS.length; // 3
const START_INDEX = baseLen * 2; // Bắt đầu ở set thứ 3 (index 6) để luôn có thể trượt trái/phải mượt mà

const V_GRADIENT = "linear-gradient(to bottom, #e3ac77 0%, #d05b3c 50%, #bc0a00 100%)";
const H_TOP    = "#e3ac77";
const H_BOTTOM = "#bc0a00";

const ARROW_LEFT_SRC  = "https://lh3.googleusercontent.com/d/1cAFD67WiqjEJLnxeojEvWXfeH5LbN52F";
const ARROW_RIGHT_SRC = "https://lh3.googleusercontent.com/d/1pfM0cNRhGgxoi5UH9O_vQ7p4BQqqI-uL";

// Vertical center of the name element inside the 640px (lg:h-160) frame.
const DESKTOP_ARROW_TOP = 327;

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const trackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Trạng thái Index khởi tạo ở điểm an toàn giữa chuỗi
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);
  const [isDragging, setIsDragging] = useState(false); 
  const controls = useAnimation();

  const VISIBLE   = containerWidth < 768 ? 1 : 3;
  const cardWidth = containerWidth ? containerWidth / VISIBLE : 0;
  const slideStep = cardWidth;

  // Cập nhật thẻ trung tâm đang Active
  const activeIndex = VISIBLE === 3 ? currentIndex + 1 : currentIndex;

  /* ── Đo container ── */
  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Xử lý khi Resize (Resize step handler) ── */
  useEffect(() => {
    if (slideStep > 0) {
      controls.set({ x: -currentIndex * slideStep });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideStep]); // Cố tình không track currentIndex để tránh lỗi đứt nhịp animation

  /* ── Reset trên sự kiện đổi thiết bị (Mobile <-> Desktop) ── */
  const prevVisible = useRef(VISIBLE);
  useEffect(() => {
    if (prevVisible.current !== VISIBLE) {
      prevVisible.current = VISIBLE;
      setCurrentIndex(START_INDEX);
      controls.start({ x: -START_INDEX * slideStep, transition: { duration: 0.3 } });
    }
  }, [VISIBLE, controls, slideStep]);

  /* ── Điều khiển trượt ── */
  const goTo = useCallback((index: number) => {
      setCurrentIndex(index);
      controls.start({
        x: -index * slideStep,
        transition: { type: "spring", stiffness: 300, damping: 35 },
      });
    },
    [controls, slideStep]
  );

  /* ── Cơ chế Loop (Snap): Chỉ can thiệp vào cuối hiệu ứng trượt để tránh chớp mắt ── */
  const handleAnimationComplete = () => {
    // Nếu trượt lố sang Set thứ 4 -> giật lùi về Set 3
    if (currentIndex >= baseLen * 3) {
      const snapIndex = currentIndex - baseLen;
      setCurrentIndex(snapIndex);
      controls.set({ x: -snapIndex * slideStep });
    } 
    // Nếu trượt lùi về Set thứ 2 -> nhảy tiến về Set 3
    else if (currentIndex <= baseLen) {
      const snapIndex = currentIndex + baseLen;
      setCurrentIndex(snapIndex);
      controls.set({ x: -snapIndex * slideStep });
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 50;
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
      <div className="w-full h-15 lg:h-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-480 mx-auto flex flex-col items-center px-6 lg:px-0 lg:min-h-269.75">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="w-[75%] mx-auto lg:w-auto font-good-times text-[clamp(32px,6vw,45px)] leading-[1.18] text-white text-center lg:pt-31.25"
        >
          What Our Guests Say
        </motion.h2>

        <div className="w-full h-12 lg:h-0 pointer-events-none" aria-hidden="true" />

        <div
          ref={trackRef}
          className="relative w-full h-115 sm:h-125 lg:top-12.5 lg:h-160 overflow-hidden cursor-grab active:cursor-grabbing"
        >
          {/* ── Desktop: LEFT arrow (Đã gỡ disabled limit) ── */}
          <div
            className="hidden lg:flex absolute z-30 pointer-events-none items-center justify-center"
            style={{
              left: 0,
              width: containerWidth / 1.61,
              top: DESKTOP_ARROW_TOP,
              transform: "translateY(-50%)",
            }}
          >
            <button
              onClick={() => goTo(currentIndex - 1)}
              onPointerDown={(e) => e.stopPropagation()}
              className="pointer-events-auto transition-opacity hover:opacity-70 select-none"
              aria-label="Previous"
            >
              <div className="relative w-12.25 h-9">
                <Image src={ARROW_LEFT_SRC} alt="Previous" fill className="object-contain" />
              </div>
            </button>
          </div>

          {/* ── Desktop: RIGHT arrow (Đã gỡ disabled limit) ── */}
          <div
            className="hidden lg:flex absolute z-30 pointer-events-none items-center justify-center"
            style={{
              left: containerWidth * 1.57 / 3,
              width: containerWidth / 3,
              top: DESKTOP_ARROW_TOP,
              transform: "translateY(-50%)",
            }}
          >
            <button
              onClick={() => goTo(currentIndex + 1)}
              onPointerDown={(e) => e.stopPropagation()}
              className="pointer-events-auto transition-opacity hover:opacity-70 select-none"
              aria-label="Next"
            >
              <div className="relative w-12.25 h-9">
                <Image src={ARROW_RIGHT_SRC} alt="Next" fill className="object-contain" />
              </div>
            </button>
          </div>

          <div
            className="hidden lg:block absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left: 0, width: "33.333%", background: "rgba(12,14,22,0.45)" }}
          />
          <div
            className="hidden lg:block absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left: "66.666%", width: "33.334%", background: "rgba(12,14,22,0.45)" }}
          />

          <motion.div
            drag="x"
            // Đã loại bỏ dragConstraints hoàn toàn để cho phép kéo trượt vô hạn
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)} 
            onDragEnd={handleDragEnd}               
            animate={controls}
            onAnimationComplete={handleAnimationComplete} // Snap lại vị trí sau khi hoàn thành 1 chuyển động
            className="flex h-full select-none"
          >
            {reviews.map((review, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={`${review.name}-${i}`}
                  className="relative flex shrink-0 h-full"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                    style={{ opacity: (isActive && !isDragging) ? 1 : 0.15 }}
                  >
                    <div className="absolute top-0 left-0 right-0" style={{ height: "1px", background: H_TOP }} />
                    <div className="absolute bottom-0 left-0 right-0" style={{ height: "1px", background: H_BOTTOM }} />
                    <div className="absolute top-0 bottom-0 left-0" style={{ width: "1px", background: V_GRADIENT }} />
                    <div className="absolute top-0 bottom-0 right-0" style={{ width: "1px", background: V_GRADIENT }} />
                  </div>

                  {/* ── Active Card Glow (Đã tinh chỉnh giảm nhẹ độ sáng) ── */}
                  <div
                    className="absolute inset-0 pointer-events-none z-20 transition-all duration-300"
                    style={{
                      opacity: (isActive && !isDragging) ? 1 : 0,
                      boxShadow: [
                        "25px 15px 40px -5px rgba(188,10,0,0.30)", // Góc phải-dưới dịu lại
                        "10px 5px 20px -5px rgba(188,10,0,0.15)",  
                        "0 0 10px 0px rgba(188,10,0,0.05)",       
                        "inset 0 0 25px 5px rgba(188,10,0,0.10)",  
                      ].join(", "),
                    }}
                  >
                    {/* Viền phụ làm bén card cũng được điều chỉnh Alpha thấp xuống */}
                    <div className="absolute top-0 left-0 right-0" style={{ height: "1px", background: H_TOP, boxShadow: "0 0 4px 0px rgba(227,172,119,0.4)" }} />
                    <div className="absolute bottom-0 left-0 right-0" style={{ height: "1px", background: H_BOTTOM, boxShadow: "0 4px 8px 1px rgba(188,10,0,0.5)" }} /> 
                    <div className="absolute top-0 bottom-0 left-0" style={{ width: "1px", background: V_GRADIENT, boxShadow: "0 0 4px 0px rgba(208,91,60,0.4)" }} />
                    <div className="absolute top-0 bottom-0 right-0" style={{ width: "1px", background: V_GRADIENT, boxShadow: "4px 0 8px 1px rgba(208,91,60,0.5)" }} /> 
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: (i % VISIBLE) * 0.15 }}
                    className="flex-1 flex flex-col items-center justify-center gap-6 lg:gap-10 px-4 lg:px-14.75"
                  >
                    <div className="relative w-24 h-24 lg:w-35.5 lg:h-35.5 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        sizes="142px"
                        className="object-cover"
                        draggable={false}
                      />
                    </div>

                    {/* Name row */}
                    <div className="flex items-center justify-center w-full">
                      <p className="font-good-times text-[clamp(18px,3vw,30px)] text-white text-center leading-none">
                        {review.name}
                      </p>
                    </div>

                    {/* Review text */}
                    <p className="google-sans-flex text-[clamp(14px,1.2vw,20px)] leading-6 text-white/90 max-w-90 text-center lg:max-w-130.25">
                      {review.text}
                    </p>

                    {/* ── Mobile: Navigation Arrows (Nằm dưới card) ── */}
                    <div className="flex lg:hidden items-center justify-center gap-8 w-full">
                      <button
                        onClick={() => goTo(currentIndex - 1)}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="shrink-0 transition-opacity pointer-events-auto select-none hover:opacity-70"
                        aria-label="Previous"
                      >
                        <div className="relative w-8 h-6">
                          <Image src={ARROW_LEFT_SRC} alt="Previous" fill className="object-contain" />
                        </div>
                      </button>

                      <button
                        onClick={() => goTo(currentIndex + 1)}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="shrink-0 transition-opacity pointer-events-auto select-none hover:opacity-70"
                        aria-label="Next"
                      >
                        <div className="relative w-8 h-6">
                          <Image src={ARROW_RIGHT_SRC} alt="Next" fill className="object-contain" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="w-full h-12 lg:h-0 pointer-events-none" aria-hidden="true" />
      </div>

      <div className="w-full h-15 lg:h-0 pointer-events-none" aria-hidden="true" />
    </section>
  );
}