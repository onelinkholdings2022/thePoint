"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { IMG, d, EASE } from "./images";

export default function EventsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative w-full bg-main overflow-hidden">

      {/* ── Row 1: two wide photos ── */}
      <div className="flex w-full" style={{ height: "clamp(360px, 52vw, 600px)" }}>

        {/* Left photo — heading overlay */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <Image src={d(IMG.events)} alt="Events at The Point" fill sizes="50vw" className="object-cover" />
          </motion.div>
          {/* Heading overlay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="absolute inset-0 flex flex-col justify-center items-center lg:items-start"
            style={{ paddingInline: "clamp(20px, 8vw, 100px)", paddingBlock: "clamp(24px, 4vw, 64px)" }}
          >
            <h2 className="font-good-times text-[clamp(16px,2.2vw,27px)] text-white tracking-wider leading-tight text-center lg:text-left">
              EVENTS-LED ATMOSPHERE
            </h2>
            <p className="google-sans-flex text-[clamp(14px,1.2vw,17px)] leading-7 text-white/80 max-w-xl text-center lg:text-left">
            From 10 AM Seahawks Sundays to live comedy nights and our exclusive VIP private event
            space, The Treehouse, there&apos;s always a reason to gather.
          </p>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
