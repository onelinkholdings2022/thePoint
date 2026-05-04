"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { normalizeImageUrl } from "@/lib/imageUtils";
import { useEventsStore, FilterType } from "@/stores/eventsStore";
import { SHEET_NAMES } from "@/lib/sheetConstants";
import { EVENTS_IMG } from "./images";

interface FilterOption {
  id: FilterType;
  label: string;
  imgUrl: string;
  fallback: string;
}

const OPTIONS: FilterOption[] = [
  {
    id: SHEET_NAMES.LIVE_ENTERTAINMENT,
    label: "Live Entertainment & Sports",
    imgUrl: normalizeImageUrl(EVENTS_IMG.liveEntertainment),
    fallback: "from-red-900/70 to-brand-red/40",
  },
  {
    id: SHEET_NAMES.TREEHOUSE,
    label: "The Treehouse",
    imgUrl: normalizeImageUrl(EVENTS_IMG.treehouse),
    fallback: "from-amber-900/70 to-brand-gold/40",
  },
];

export default function EventsFilter() {
  const { activeFilter, initialize, setFilter } = useEventsStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    // BIỆN PHÁP MẠNH 1: Ép margin-top và background trực tiếp bằng thẻ style
    <section 
      className="w-full" 
      style={{ 
        marginTop: "80px", // Ép buộc cách Banner phía trên 80px
        backgroundColor: "#0c0e16" 
      }}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-0 border-b border-white/10">
        {OPTIONS.map((opt) => {
          const isActive = activeFilter === opt.id;

          return (
            <motion.button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              initial={{
                boxShadow: "0 0 0 0px rgba(227,172,119,0), 0 0 0px rgba(227,172,119,0), 0 0 0px rgba(227,172,119,0)",
              }}
              whileHover={{
                boxShadow: "0 0 0 1px #e3ac77, 5px 0 12px rgba(227,172,119,0.45), 0 8px 16px rgba(227,172,119,0.55)",
                zIndex: 10,
              }}
              animate={{
                boxShadow: isActive
                  ? "0 0 0 1px #e3ac77, 5px 0 12px rgba(227,172,119,0.45), 0 8px 16px rgba(227,172,119,0.55)"
                  : "0 0 0 0px rgba(227,172,119,0), 0 0 0px rgba(227,172,119,0), 0 0 0px rgba(227,172,119,0)",
                zIndex: isActive ? 10 : 0,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              // BIỆN PHÁP MẠNH 2: Ép cứng chiều cao của tấm thẻ bằng style
              className="relative group overflow-hidden cursor-pointer outline-none bg-black"
              style={{ height: "clamp(220px, 50vw, 560px)" }}
            >
              {/* 1. Ảnh gốc */}
              <div className="absolute inset-0">
                {opt.imgUrl ? (
                  <Image
                    src={opt.imgUrl}
                    alt={opt.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-linear-to-br ${opt.fallback}`} />
                )}
              </div>

              {/* 2. Hiệu ứng cung Gradient */}
              <span
                className={`brand-gradient-bg absolute bottom-0 left-0 right-0 origin-bottom transition-transform duration-500 ease-out opacity-75 ${
                  isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                }`}
                // BIỆN PHÁP MẠNH 3: Ép cứng chiều cao gradient
                style={{
                  height: "160px",
                  WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 100%)",
                  maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
                }}
                aria-hidden="true"
              />

              {/* 3. Chữ */}
              <div
                className={`absolute left-0 right-0 flex flex-col items-center justify-center px-6 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                // BIỆN PHÁP MẠNH 4: Cắm chốt vị trí Bottom đẩy chữ bay lên cao, không sợ flexbox đè
                style={{ bottom: "50px" }}
              >
                <p 
                  className="relative z-10 font-good-times text-center uppercase tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  // Cắm chốt cỡ chữ luôn
                  style={{ fontSize: "clamp(17px, 2.5vw, 30px)" }}
                >
                  {opt.label}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}