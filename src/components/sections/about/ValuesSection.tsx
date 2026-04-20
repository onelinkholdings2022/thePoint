"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { IMG, d, EASE } from "./images";

const values = [
  { key: "provide" as const, label: "Provide a Premium\nEnvironment" },
  { key: "serve"   as const, label: "Serve Incredible\nFood and Drinks" },
  { key: "letImg"  as const, label: "Let the Community\nCreate the Energy" },
];

export default function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative w-full bg-main"
      style={{ paddingBlock: "clamp(48px, 6vw, 96px)", paddingInline: "clamp(20px, 8vw, 100px)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-0 justify-items-center">
        {values.map(({ key, label }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
            className="flex flex-col items-center gap-7 text-center"
          >
            {/* Icon image */}
            <div className="relative w-32 h-32 sm:w-45 sm:h-45 lg:w-55 lg:h-55 shrink-0">
              <Image
                src={d(IMG[key])}
                alt={label}
                fill
                sizes="(max-width:639px) 128px, (max-width:1023px) 180px, 220px"
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="font-good-times text-[clamp(13px,1.3vw,30px)] text-white tracking-widest uppercase leading-[1.7] whitespace-pre-line">
              {label}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
