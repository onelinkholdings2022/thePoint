"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventItem } from "@/repositories/events/events.repository";
import { normalizeImageUrl } from "@/lib/imageUtils";
import { EASE } from "./images";

interface Props {
  event: EventItem;
  index: number;
}

export default function EventCard({ event, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const imgSrc = normalizeImageUrl(event.img);

  // Parse tạm ngày tháng (Bạn có thể điều chỉnh theo data thực tế)
  const dateSplit = event.timeline ? event.timeline.split(" ") : ["10", "SEPTEMBER"];
  const dayNumber = dateSplit[0] || "10";
  const monthString = dateSplit[1] || "SEPTEMBER";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
      className="overflow-hidden bg-[#121212] border border-white/5 mb-4 rounded-sm"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-stretch text-left group cursor-pointer transition-colors duration-200 hover:bg-white/5"
      >
        {/* CỘT TRÁI: Ngày tháng */}
        <div className="w-24 sm:w-32 flex flex-col items-center justify-center py-6 px-2 border-r border-white/10 shrink-0">
          <span className="font-good-times text-white text-3xl sm:text-[40px] leading-none">{dayNumber}</span>
          <span className="font-good-times text-white/70 text-[9px] sm:text-[11px] tracking-widest uppercase mt-2 text-center">
            {monthString}
          </span>
          <div className="mt-3 bg-brand-gold px-4 py-1 rounded-sm">
             <span className="font-good-times text-black text-[9px] uppercase tracking-wider">Play</span>
          </div>
        </div>

        {/* CỘT GIỮA: Thể loại & Tiêu đề */}
        <div className="flex-1 flex flex-col justify-center px-5 py-5 min-w-0">
          <div className="mb-2">
            <span className="bg-brand-red text-white text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm font-medium">
              {event.type || "Event"}
            </span>
          </div>
          <h3 className="font-good-times text-white text-[clamp(14px,1.5vw,18px)] uppercase tracking-wider leading-snug line-clamp-2">
            {event.title}
          </h3>
        </div>

        {/* CỘT PHẢI: Nút See Details */}
        <div className="flex items-center justify-end px-5 shrink-0 gap-2">
          <span className="google-sans-flex text-xs text-white/50 group-hover:text-white transition-colors duration-200 uppercase tracking-widest hidden sm:block">
            {expanded ? "Hide Details" : "Show Details"}
          </span>
          <motion.svg
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="w-5 h-5 text-white/50 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </motion.svg>
        </div>
      </button>

      {/* NỘI DUNG MỞ RỘNG */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-brand-gold/30 p-6 pl-24 sm:pl-32 flex flex-col sm:flex-row gap-6 bg-[#1a1a1a]">
              <div className="flex-1 flex flex-col gap-3 min-w-0">
                {event.description && (
                  <p className="google-sans-flex text-white/70 text-sm leading-6">
                    {event.description}
                  </p>
                )}
                {event.time && (
                  <p className="google-sans-flex text-brand-gold text-sm mt-2">
                    {event.time}
                  </p>
                )}
              </div>

              {imgSrc && (
                <div className="relative w-full sm:w-64 aspect-video shrink-0 overflow-hidden rounded-sm border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={event.title || "Event"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}