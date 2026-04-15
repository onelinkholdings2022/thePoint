"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import GradientButton from "../ui/GradientButton";

export default function TreehouseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="treehouse"
      ref={ref}
      className="relative w-full overflow-hidden bg-main"
    >
      {/* RIGHT SIDEBAR — desktop only */}
      <div className="hidden lg:block absolute right-0 top-0 h-full w-116.75 pointer-events-none overflow-hidden">
        <Image src="/assets/images/treehouse-sidebar.png" alt="" fill className="object-cover" aria-hidden />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:left-25 items-center
           gap-10 lg:gap-28
           py-16 sm:py-20 lg:py-0 lg:min-h-270
           px-5 sm:px-10 lg:pl-22.5 lg:pr-10">

        {/* Text content — left on desktop, top on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-col gap-7 lg:gap-11.5 items-center text-center max-w-135 lg:max-w-182.5 shrink-0 order-1"
        >
          <p className="gradient-text google-sans-flex text-[25px] sm:text-[30px] lg:text-[35px] leading-none">
            VIP Group Experience
          </p>
          <h2 className="font-good-times text-[clamp(28px,4vw,45px)] leading-[1.18] text-white">
            Host Your Next Event in The Treehouse.
          </h2>
          <p className="google-sans-flex text-[clamp(15px,1.5vw,20px)] lg:max-w-142.5 leading-8 text-white/90">
            Looking for the perfect backdrop for your next corporate gathering
            or birthday? The Treehouse is our dedicated premium private party
            and group booking venue.
          </p>
          <GradientButton size="md" className="w-full max-w-70.75 hidden lg:flex">
            Inquire About The Treehouse
          </GradientButton>
        </motion.div>

        {/* Main tall image — right on desktop, bottom on mobile */}
        <div
          className="relative group w-full max-w-100 h-72 sm:max-w-112.5 sm:h-100 lg:h-auto lg:w-158.75 lg:max-w-none shrink-0
                     transition-shadow duration-300 hover:shadow-brand-image-left order-2"
          style={{ aspectRatio: "635/790" }}
        >
          {/* gradient border — hiện khi hover */}
          <div className="brand-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* overflow-hidden tách ra để border không bị clip */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src="/assets/images/treehouse.png" alt="The Treehouse private venue" fill className="object-cover" />
            </motion.div>
          </div>
        </div>

        {/* Button mobile-only: nằm dưới ảnh, trên desktop ẩn đi vì button đã có trong text */}
        <div className="order-3 lg:hidden w-full flex justify-center">
          <GradientButton size="md" className="w-full max-w-70.75">
            Inquire About The Treehouse
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
