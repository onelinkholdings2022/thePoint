"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "./images";

export default function BeyondSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="relative w-full bg-main px-6 text-center"
      style={{ paddingTop: "clamp(48px, 6vw, 96px)", paddingBottom: "clamp(60px, 8vw, 128px)" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="google-sans-flex text-[clamp(24px,3.5vw,48px)] text-white font-light"
      >
        Beyond the Standard Bar
      </motion.h2>
    </section>
  );
}
