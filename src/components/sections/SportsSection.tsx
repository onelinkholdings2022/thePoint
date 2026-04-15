"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import GradientButton from "../ui/GradientButton";

export default function SportsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="events"
      ref={ref}
      // Dọn dẹp pt/pb ở đây, chỉ giữ lại min-height cho desktop
      className="relative w-full overflow-hidden bg-main lg:min-h-270"
    >
      {/*
       * ── LEFT SIDEBAR (Desktop Only) ──
       */}
      <div className="hidden lg:block absolute left-0 top-0 h-full w-116.75 pointer-events-none overflow-hidden">
        <Image
          src="/assets/images/sports-sidebar.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0" />
      </div>

      {/* --- CỤC GẠCH TOP: Ép khoảng cách với section phía trên (Chỉ Mobile) --- */}
      <div className="w-full h-15 lg:h-0 pointer-events-none" aria-hidden="true" />

      {/*
       * ── MAIN CONTENT ──
       */}
      <div className="relative lg:absolute lg:left-35.75 lg:top-36.25 flex flex-col lg:flex-row items-center gap-12 lg:gap-35 px-6 lg:px-0 z-10 w-full lg:w-auto">
        
        {/* Main tall image */}
        <div
          // order-2: Mobile nằm dưới | lg:order-1: Desktop nằm trái
          className="relative group shrink-0 transition-shadow duration-300 hover:shadow-brand-image
                     w-full max-w-100 h-72 sm:max-w-112.5 sm:h-100 lg:max-w-none lg:w-158.75 lg:h-197.5
                     order-2 lg:order-1"
        >
          {/* gradient border — hiện khi hover */}
          <div className="brand-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* overflow-hidden tách ra để border không bị clip */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/assets/images/sports-bar.png"
                alt="Live sports at The Point"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          // order-1: Mobile nằm trên | lg:order-2: Desktop nằm phải
          className="flex flex-col gap-6 lg:gap-11.5 items-center text-center w-full max-w-[90%] sm:max-w-125 lg:max-w-175 mx-auto lg:mx-0
                     order-1 lg:order-2"
        >
          {/* Sub-heading */}
          <p className="gradient-text google-sans-flex text-[25px] sm:text-[30px] lg:text-[35px] leading-none">
            The Center of the Action
          </p>

          {/* Main heading */}
          <h2 className="font-good-times text-[clamp(32px,8vw,45px)] leading-[1.18] text-white">
            Live Sports &amp; Entertainment
          </h2>

          <p className="google-sans-flex text-[16px] sm:text-[18px] lg:text-[20px] leading-8 text-white/90 lg:max-w-150">
            Designed as a local hub for live sports viewing and socialising.
            Catch the next big game, laugh out loud at our comedy nights, or
            join us for live entertainment and themed game nights.
          </p>

          <GradientButton size="md" className="w-[80%] sm:w-[80%] lg:w-57.5 mt-2 lg:mt-0 hidden lg:flex">
            View Events Calendar
          </GradientButton>
        </motion.div>

        {/* Button mobile-only: nằm dưới ảnh, trên desktop ẩn đi vì button đã có trong text */}
        <div className="order-3 lg:hidden w-full flex justify-center">
          <GradientButton size="md" className="w-[80%] sm:w-[80%]">
            View Events Calendar
          </GradientButton>
        </div>
      </div>

      {/* --- CỤC GẠCH BOTTOM: Ép khoảng cách với section phía dưới (Chỉ Mobile) --- */}
      <div className="w-full h-15 lg:h-0 pointer-events-none" aria-hidden="true" />
      
    </section>
  );
}