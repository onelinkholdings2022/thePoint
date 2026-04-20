"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import GradientButton from "@/components/ui/GradientButton";
import { IMG, d, EASE } from "./images";

export default function OurStorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative w-full bg-main">

      {/* ── Top text block ── */}
      <div
        className="flex flex-col items-center gap-10 lg:gap-14"
        style={{
          paddingInline: "clamp(20px, 8vw, 100px)",
          paddingTop: "clamp(60px, 8vw, 128px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-good-times text-[clamp(28px,4vw,52px)] text-white tracking-wider text-center"
        >
          OUR STORY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="google-sans-flex text-[clamp(15px,1.4vw,18px)] leading-8 text-white/80 text-center max-w-3xl"
        >
          Co-owner Dan and the team realized Burien was missing something crucial: a dedicated,
          premium space built specifically for adults. We wanted to move away from the standard
          &ldquo;fast and casual&rdquo; model to create an upscale sports bar that still felt like a neighborhood
          staple.
        </motion.p>
      </div>

      {/* ── Two images with gap + gradient divider, padded horizontally ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="relative w-full flex flex-col sm:flex-row justify-center items-center"
        style={{
          paddingInline: "clamp(20px, 8vw, 100px)",
          gap: "clamp(48px, 10vw, 170px)",
        }}
      >
        {/* Gradient vertical divider — sits at horizontal center */}
        <div
          className="hidden sm:block absolute -top-10 -bottom-10 left-1/2 -translate-x-1/2 w-px pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #e3ac77 0%, #d05b3c 50%, #bc0a00 100%)",
          }}
        />

        {/* Left image */}
        <div
          className="relative group overflow-hidden transition-shadow duration-300 hover:shadow-brand-image w-full sm:flex-1"
          style={{ aspectRatio: "4/5", maxWidth: "clamp(260px, 36vw, 480px)" }}
        >
          <div className="brand-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
            >
              <Image
                src={d(IMG.story1)}
                alt="The Point interior"
                fill
                sizes="(max-width:639px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Right image */}
        <div
          className="relative group overflow-hidden transition-shadow duration-300 hover:shadow-brand-image-left w-full sm:flex-1"
          style={{ aspectRatio: "4/5", maxWidth: "clamp(260px, 36vw, 480px)" }}
        >
          <div className="brand-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
            >
              <Image
                src={d(IMG.story2)}
                alt="The Point bar"
                fill
                sizes="(max-width:639px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom text block ── */}
      <div
        className="flex flex-col items-center gap-10 lg:gap-14"
        style={{
          paddingInline: "clamp(20px, 8vw, 100px)",
          paddingTop: "clamp(40px, 5vw, 80px)",
          paddingBottom: "clamp(60px, 8vw, 128px)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="google-sans-flex text-[clamp(15px,1.4vw,18px)] leading-8 text-white/80 text-center max-w-3xl"
        >
          We set out to create more than just a place to drink. The result is an events-led destination
          where locals and travelers near SeaTac can gather for live sports, comedy nights, and premium
          socializing, completely free from the loud, family-friendly restaurant chaos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <GradientButton size="md" className="w-44">
            Contact Us
          </GradientButton>
        </motion.div>
      </div>

    </section>
  );
}
