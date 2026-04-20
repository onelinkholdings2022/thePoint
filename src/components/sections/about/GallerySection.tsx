"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import HoverImage from "@/components/ui/HoverImage";
import { IMG, d } from "./images";

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative w-full bg-main overflow-hidden">
      <div className="flex flex-col sm:flex-row w-full h-auto sm:h-[60vw] lg:h-[50vw] max-h-210">
        <HoverImage
          src={d(IMG.story2)}
          alt="The Point atmosphere"
          sizes="(max-width:639px) 100vw, 50vw"
          inView={inView}
          delay={0}
          className="w-full sm:w-1/2 h-80 sm:h-full shrink-0"
        />
        <HoverImage
          src={d(IMG.elevated)}
          alt="Elevated experience at The Point"
          sizes="(max-width:639px) 100vw, 50vw"
          shadowLeft
          inView={inView}
          delay={0.15}
          className="w-full sm:w-1/2 h-80 sm:h-full shrink-0"
        />
      </div>
    </section>
  );
}
