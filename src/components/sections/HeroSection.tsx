"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GradientButton from "../ui/GradientButton";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-200 overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/images/hero-bg.png"
        alt="The Point Bar atmosphere"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(22,12,20,0.47)]" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-9 max-w-301.25 w-full px-6 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="font-good-times text-[clamp(42px,5.5vw,60px)] leading-[1.18] text-white"
          >
            Elevate Your Night Out
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="google-sans-flex text-[clamp(18px,1.8vw,21px)] leading-8 text-white max-w-225"
          >
            Burien&apos;s premier upscale sports bar — premium energy without the pretension.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            <GradientButton size="md" className="w-46.75">
              Reserve a Table
            </GradientButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 sm:bottom-16 lg:bottom-30 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="relative w-9 h-14.5"
        >
          {/* Mouse icon SVG */}
          <svg
            viewBox="0 0 36 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="mouseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e3ac77" />
                <stop offset="100%" stopColor="#bc0a00" />
              </linearGradient>
              <linearGradient id="dotGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e3ac77" />
                <stop offset="100%" stopColor="#d05b3c" />
              </linearGradient>
            </defs>
            <rect
              x="1"
              y="1"
              width="34"
              height="56"
              rx="17"
              stroke="url(#mouseGradient)"
              strokeWidth="1.5"
            />
            <motion.rect
              x="16.5"
              y="10"
              width="3"
              height="10"
              rx="1.5"
              fill="url(#dotGradient)"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
