"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/imageUtils";
import { EVENTS_IMG, EASE } from "./images";

export default function EventsBanner() {
  const imgSrc = normalizeImageUrl(EVENTS_IMG.hero);

  return (
    <section className="relative w-full h-[clamp(480px,65vw,720px)] overflow-hidden bg-main">
      {/* ── Background image ── */}
      {imgSrc && (
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={imgSrc}
            alt="Events at The Point"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
      )}

      {/* ── Dark overlay: darker at top (text area) → lighter in middle → dark fade at bottom ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,14,22,0.72) 0%, rgba(12,14,22,0.35) 45%, rgba(12,14,22,0.70) 100%)",
        }}
      />

      {/* ── Text content overlaid on image ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 px-5 sm:px-10 pt-20">

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
          className="font-good-times text-[clamp(39px,5.5vw,64px)] leading-[1.1] text-white max-w-5xl"
        >
          Experience The Point.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="google-sans-flex text-[clamp(16px,1.4vw,18px)] text-white max-w-2xl leading-7"
        >
          We are an events-led bar, not just a place to drink. Choose your experience below.
        </motion.p>
      </div>

      {/* ── Gradient fade to bg-main at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0c0e16)" }}
      />
    </section>
  );
}
