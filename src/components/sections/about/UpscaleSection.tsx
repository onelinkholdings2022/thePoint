"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { IMG, d, EASE } from "./images";

export default function UpscaleSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(360px, 52vw, 600px)" }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <Image
          src={d(IMG.upscale)}
          alt="Upscale bar at The Point"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Mobile: full-cover tint */}
      <div
        className="absolute inset-0 z-10 pointer-events-none sm:hidden"
        style={{ background: "rgba(12,14,22,0.5)" }}
        aria-hidden="true"
      />
      {/* Desktop: directional gradient — left opaque → right transparent */}
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
        style={{ background: "linear-gradient(to right, #0c0e16 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      {/* Text — absolute bottom-left with matching navbar horizontal rhythm */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start"
        style={{ paddingInline: "clamp(20px, 8vw, 100px)" }}
      >
        <div className="flex flex-col gap-4 max-w-sm lg:max-w-xl items-center lg:items-start text-center lg:text-left">
          <h2 className="font-good-times text-[clamp(18px,2.5vw,27px)] text-white tracking-wider leading-tight">
            UPSCALE, NOT PRETENTIOUS
          </h2>
          <p className="google-sans-flex text-[clamp(14px,1.2vw,17px)] leading-7 text-white/80">
            We offer the premium feel of a high-end lounge with the approachable, energetic
            personality of your favorite local sports bar.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
