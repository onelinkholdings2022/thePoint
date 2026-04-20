"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import GradientButton from "@/components/ui/GradientButton";
import { IMG, d, EASE } from "./images";

export default function EventsCtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative w-full h-[60vh] min-h-100 overflow-hidden">
      <Image
        src={d(IMG.events)}
        alt="Events at The Point"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(12,14,22,0.65)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center"
      >
        <p className="gradient-text google-sans-flex text-[clamp(18px,2vw,28px)] leading-none">
          Always Something On
        </p>
        <h2 className="font-good-times text-[clamp(30px,5vw,60px)] leading-[1.18] text-white max-w-200">
          Where Every Night is an Event.
        </h2>
        <p className="google-sans-flex text-[clamp(15px,1.4vw,20px)] leading-8 text-white/80 max-w-175">
          From live sports screenings to comedy nights, themed game nights, and
          private Treehouse bookings — there&apos;s always a reason to come back.
        </p>
        <GradientButton size="md" className="w-[80%] max-w-60 mt-2">
          View Events Calendar
        </GradientButton>
      </motion.div>
    </section>
  );
}
