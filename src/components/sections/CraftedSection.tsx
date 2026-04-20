"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const slides = [
  { src: "https://lh3.googleusercontent.com/d/1IsQ_hYDlbAW59WF1bOXCFvPP-XM-SioX", alt: "Signature comfort dish" },
  { src: "https://lh3.googleusercontent.com/d/1TVyJQqLMlkcreZZF_5MHy15pBA8HDdR4", alt: "Premium ingredients" },
  { src: "https://lh3.googleusercontent.com/d/1lYsYKBQc8B5Quau2nPfhNPuW-Xd4lk7f", alt: "Craft cocktails" },
];

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const DURATION = 0.9;
const AUTOPLAY_DELAY = 5000; 

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function SlideItem({
  src,
  alt,
  isEntering,
  direction,
}: {
  src: string;
  alt: string;
  isEntering: boolean;
  direction: number;
}) {
  const containerInitialX = isEntering
    ? direction >= 0 ? "100%" : "-100%"
    : "0%";
  const imageInitialX = isEntering
    ? direction >= 0 ? "20%" : "-20%"
    : "0%";
  const imageAnimateX = isEntering
    ? "0%"
    : direction >= 0 ? "6%" : "-6%";

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none" 
      initial={{ x: containerInitialX }}
      animate={{ x: "0%" }}
      transition={{ duration: DURATION, ease: EASE }}
      style={{ zIndex: isEntering ? 2 : 1 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale: 1.12, willChange: "transform" }}
        initial={{ x: imageInitialX }}
        animate={{ x: imageAnimateX }}
        transition={{ duration: DURATION, ease: EASE }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 1023px) 100vw, 840px" className="object-cover" draggable={false} />
      </motion.div>
    </motion.div>
  );
}

export default function CraftedSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number, forcedDirection?: number) => {
    if (isAnimating || index === active) return;
    
    let targetIndex = index;
    if (index < 0) targetIndex = slides.length - 1;
    if (index >= slides.length) targetIndex = 0;

    if (targetIndex === active) return;

    setDirection(forcedDirection !== undefined ? forcedDirection : targetIndex > active ? 1 : -1);
    setPrev(active);
    setActive(targetIndex);
    setIsAnimating(true);
    setTimeout(() => {
      setPrev(null);
      setIsAnimating(false);
    }, DURATION * 1000 + 50);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAnimating) {
        goToSlide(active + 1, 1);
      }
    }, AUTOPLAY_DELAY);
    
    return () => clearTimeout(timer);
  }, [active, isAnimating]);

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50; 
    if (offset.x < -swipeThreshold) {
      goToSlide(active + 1, 1); 
    } else if (offset.x > swipeThreshold) {
      goToSlide(active - 1, -1); 
    }
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full bg-main overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:h-215 lg:gap-15">

        {/* Left: Image slider */}
        {/* outer: group + shadow hover, border không bị overflow-hidden clip */}
        <div className="relative group w-full h-100 sm:h-125 lg:w-210 lg:max-h-none lg:h-full shrink-0 transition-shadow duration-300 hover:shadow-brand-image">
          {/* gradient border — hiện khi hover */}
          <div className="brand-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
          initial={{ clipPath: "inset(0 100% 0 0%)", x: -60 }}
          animate={inView ? { clipPath: "inset(0 0% 0 0%)", x: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
        >
          {prev !== null && (
            <SlideItem
              key={`prev-${prev}`}
              src={slides[prev].src}
              alt={slides[prev].alt}
              isEntering={false}
              direction={direction}
            />
          )}
          <SlideItem
            key={`active-${active}`}
            src={slides[active].src}
            alt={slides[active].alt}
            isEntering={true}
            direction={direction}
          />

          <div className="absolute bottom-6 lg:bottom-10.5 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-4.5 h-4.5 rounded-full border-2 transition-all duration-300 ${
                  i === active
                    ? "bg-white border-white scale-110"
                    : "bg-transparent border-white/60 hover:border-white"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
        </div>{/* end outer group wrapper */}

        {/* --- CỤC GẠCH VÔ HÌNH SỐ 1: Nằm giữa Ảnh và Chữ (Chỉ hiện ở Mobile) --- */}
        <div className="w-full h-16 shrink-0 lg:hidden pointer-events-none" aria-hidden="true" />

        {/* Right: Text content */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full flex-1 flex flex-col items-center lg:items-start justify-center pb-4 lg:py-16 lg:px-[clamp(40px,5vw,100px)]"
        >
          {/* Ép text-center trên mobile, lg:text-left trên desktop */}
          <div className="w-[85%] max-w-100 lg:w-full lg:max-w-none flex flex-col gap-6 lg:gap-10.25 text-center lg:text-left">
            <h2 className="font-good-times text-[clamp(28px,4vw,50px)] leading-[1.18] text-white mx-auto lg:mx-0">
              <span className="lg:block">Crafted with passion.</span><span className="lg:block">Served by the Point.</span>
            </h2>
            
            <p className="google-sans-flex text-[clamp(15px,1.5vw,20px)] leading-8 lg:w-160 text-white/90 mx-auto lg:mx-0">
              From signature comfort dishes like our Smoked Gouda Mac to refined
              favorites like the Sherried Bacon Jam Burger, our menu is designed
              to elevate every moment of your night out. Bold flavors, premium
              ingredients, and a curated selection of craft cocktails and
              zero-proof CBD mocktails — all enjoyed in an upscale, energetic
              atmosphere.
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- CỤC GẠCH VÔ HÌNH SỐ 2: Đẩy section bên dưới ra xa (Chỉ hiện ở Mobile) --- */}
      <div className="w-full h-16 lg:h-0 pointer-events-none" aria-hidden="true" />
      
    </section>
  );
}