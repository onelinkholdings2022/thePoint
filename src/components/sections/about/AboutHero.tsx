"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMG, d, EASE } from "./images";

export default function AboutHero() {
  return (
    <section className="relative w-full h-screen min-h-150 overflow-hidden">
      <Image
        src={d(IMG.heroBg)}
        alt="The Point — About Us"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="font-good-times text-[clamp(50px,7vw,80px)] leading-[1.1] text-white"
        >
          MEET<br className="sm:hidden" /> THE POINT.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="google-sans-flex text-[clamp(16px,1.5vw,20px)] leading-8 text-white/80 max-w-200"
        >
          A new era for Burien's favorite corner.
        </motion.p>
      </div>
    </section>
  );
}
