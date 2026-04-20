"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface HoverImageProps {
  src: string;
  alt: string;
  sizes?: string;
  shadowLeft?: boolean;
  className?: string;
  inView: boolean;
  delay?: number;
}

export default function HoverImage({
  src,
  alt,
  sizes = "100vw",
  shadowLeft = false,
  className = "",
  inView,
  delay = 0,
}: HoverImageProps) {
  return (
    <div
      className={`relative group transition-shadow duration-300 ${
        shadowLeft ? "hover:shadow-brand-image-left" : "hover:shadow-brand-image"
      } ${className}`}
    >
      {/* gradient border on hover */}
      <div className="brand-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* overflow-hidden separated so the border isn't clipped */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay, ease: EASE }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </motion.div>
      </div>
    </div>
  );
}
