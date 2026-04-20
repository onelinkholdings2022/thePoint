"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "./images";

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative w-full bg-main overflow-hidden"
      style={{ paddingBlock: "clamp(48px, 6vw, 96px)", paddingInline: "clamp(20px, 8vw, 100px)" }}
    >
      {/* Red gradient band at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-72 lg:h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 100% at 50% 100%, rgba(188,10,0,0.72) 0%, rgba(208,91,60,0.50) 32%, rgba(227,172,119,0.16) 58%, rgba(227,172,119,0.04) 72%, transparent 82%)" }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-70 items-center lg:items-center">

        {/* Left: label + heading */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex-none flex flex-col gap-5 items-center lg:items-start"
        >
          <p className="font-good-times text-[15px] text-white uppercase leading-tight text-center lg:text-left">
            Our Philosophy
          </p>
          <h2 className="google-sans-flex text-[clamp(26px,4vw,50px)] leading-tight text-white text-center lg:text-left lg:whitespace-nowrap">
            Strictly 21+. Intentionally Crafted.
          </h2>
        </motion.div>

        {/* Right: body text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="flex-1"
        >
          <p className="google-sans-flex text-[clamp(15px,1.4vw,18px)] leading-8 text-white text-center lg:text-right">
            We are unapologetically 21+ and intentionally not family friendly. We cater to a core
            demographic of 30&ndash;50 year olds who value their rare nights out and want an environment
            that respects their palate and their time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
