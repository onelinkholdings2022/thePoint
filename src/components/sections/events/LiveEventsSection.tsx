"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/imageUtils";
import { EventItem } from "@/repositories/events/events.repository";
import { EASE, EVENTS_IMG } from "./images";
import GradientButton from "@/components/ui/GradientButton";
import { useBookingStore } from "@/stores/bookingStore";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseTimeline(timeline: string) {
  // Format: "Thursday,10/09/2026"
  const [rawWeekDay, datePart] = timeline.split(",");
  const parts = datePart ? datePart.trim().split("/") : [];
  const dayNumber = parts[0] || "";
  const monthIndex = parts[1] ? parseInt(parts[1], 10) - 1 : -1;
  const monthName = monthIndex >= 0 ? (MONTH_NAMES[monthIndex] ?? "") : "";
  const year = parts[2] || "";
  return {
    weekDay: rawWeekDay?.trim() || "",
    dayNumber,
    monthName: monthName.toUpperCase(),
    year,
  };
}

interface EventCardProps {
  event: EventItem;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const imgSrc = normalizeImageUrl(event.img);

  const { weekDay, dayNumber, monthName } = parseTimeline(event.timeline ?? "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
      style={{
        backgroundColor: "#272727",
        marginBottom: "24px"
      }}
    >
      {/* ── HEADER DÒNG SỰ KIỆN ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          cursor: "pointer",
          padding: "20px 24px 20px 20px",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 7vw, 100px)", flex: 1, minWidth: "280px" }}>
          
          {/* Ô Ngày tháng — fake border: cam toàn bộ, chỉ giữa cạnh trái có chút đỏ */}
          <div className="w-28.75 sm:w-36.25 shrink-0">
            <div style={{
              background: [
                "linear-gradient(#e3ac77, #e3ac77) top / 100% 1px no-repeat",
                "linear-gradient(#e3ac77, #e3ac77) right / 1px 100% no-repeat",
                "linear-gradient(to bottom, #e3ac77 30%, #bc0a00 50%, #e3ac77 70%) left / 1px 100% no-repeat",
              ].join(", "),
              padding: "1px 1px 0 1px",
            }}>
              <div style={{
                backgroundColor: "#272727",
                padding: "20px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px"
              }}>
                <span style={{ fontFamily: "var(--font-host-grotesk), sans-serif", color: "white", fontSize: "clamp(56px, 7vw, 90px)", lineHeight: "1", fontWeight: "540" }}>
                  {dayNumber}
                </span>
                <span style={{ fontFamily: "var(--font-good-times), sans-serif", color: "white", fontSize: "clamp(11px, 1.2vw, 14px)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "500" }}>
                  {monthName}
                </span>
              </div>
              <div style={{ backgroundColor: "#e3ac77", padding: "8px 0", textAlign: "center" }}>
                <span style={{ color: "#bc0a00", fontSize: "15px", fontWeight: "500", textTransform: "capitalize" }}>
                  {weekDay}
                </span>
              </div>
            </div>
          </div>

          {/* Tag & Tiêu đề */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <span style={{ background: "linear-gradient(135deg, #e3ac77 0%, #bc0a00 32%)", color: "white", fontSize: "15px", padding: "4px 10px", borderRadius: "2px", letterSpacing: "1px" }}>
                {event.type || "SPORTS"}
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-good-times), sans-serif", color: "white", fontSize: "clamp(18px, 3vw, 40px)", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
              {event.title}
            </h3>
          </div>
        </div>

        {/* Nút More / Less Details */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingRight: "10px" }}>
          <span style={{ fontFamily: "var(--font-google-sans-flex), sans-serif", color: "white", fontSize: "13px" }}>
            {expanded ? "Less Details" : "More Details"}
          </span>
          <span style={{ color: "white", fontSize: "24px", fontWeight: "300" }}>
            {expanded ? "—" : "+"}
          </span>
        </div>
      </div>

      {/* ── DROPDOWN MỞ RỘNG ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden" }}
          >
            {/* fake border: cam toàn bộ, cạnh dưới có chút đỏ ở giữa */}
            <div style={{
              background: [
                "linear-gradient(#e3ac77, #e3ac77) top / 100% 1px no-repeat",
                "linear-gradient(#e3ac77, #e3ac77) left / 1px 100% no-repeat",
                "linear-gradient(#e3ac77, #e3ac77) right / 1px 100% no-repeat",
                "linear-gradient(to right, #e3ac77 30%, #bc0a00 50%, #e3ac77 70%) bottom / 100% 1px no-repeat",
              ].join(", "),
              padding: "1px",
            }}>
            <div
              style={{
                backgroundColor: "#0c0e16",
                padding: "30px",
                display: "flex",
                flexWrap: "wrap",
                gap: "40px",
                alignItems: "flex-start"
              }}
            >
              {/* LEFT: Title + Description + Book Now */}
              <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <h3 style={{ fontFamily: "var(--font-good-times), sans-serif", color: "white", fontSize: "clamp(18px, 3vw, 40px)", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
                  {event.title}
                </h3>
                {event.description && (
                  <p style={{ fontFamily: "var(--font-google-sans-flex), sans-serif", color: "white", fontSize: "clamp(14px, 1.8vw, 20px)", lineHeight: "1.8", whiteSpace: "pre-wrap", margin: 0 }}>
                    {event.description}
                  </p>
                )}
                <GradientButton
                  size="md"
                  className="self-start px-4! text-sm! h-9!"
                  onClick={(e) => { e.stopPropagation(); useBookingStore.getState().openForLive(event); }}
                >
                  Book Now
                </GradientButton>
              </div>

              {/* RIGHT: Ảnh */}
              {imgSrc && (
                <div style={{ width: "100%", maxWidth: "340px", flexShrink: 0, aspectRatio: "16/9", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

const PAGE_SIZE = 4;

// padding-box/border-box trick: the only approach that works with border-radius.
// The gradient shows through the transparent border, following the curve exactly.
const LOAD_BTN_STYLE: React.CSSProperties = {
  border: "1.5px solid transparent",
  borderRadius: "5px",
  background:
    "linear-gradient(#0c0e16, #0c0e16) padding-box, " +
    "linear-gradient(to right, #e3ac77 30%, #bc0a00 50%, #e3ac77 70%) border-box",
  cursor: "pointer",
  padding: "14px 36px",
  display: "inline-flex",
  alignItems: "center",
  gap: "12px",
};

export default function LiveEventsSection({ events }: { events: EventItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const isAll = visibleCount >= events.length;
  const visibleEvents = events.slice(0, visibleCount);

  const handleToggle = () => {
    if (isAll) {
      setVisibleCount(PAGE_SIZE);
    } else {
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, events.length));
    }
  };

  return (
    <div className="w-full">
      {/* BANNER LIVE */}
      <div className="w-full flex flex-col items-center">
        <div style={{ paddingTop: "50px", paddingBottom: "30px", textAlign: "center", width: "100%" }}>
          <p
            style={{
              fontFamily: "var(--font-good-times), sans-serif",
              /* Đã chỉnh lại tỷ lệ: Ép màu cam giữ nguyên đến 45% chiều cao chữ rồi mới chuyển sang đỏ */
              background: "linear-gradient(to bottom, #e3ac77 0%, #e3ac77 45%, #bc0a00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              fontWeight: "bold",
              fontSize: "clamp(15px, 1.8vw, 20px)",
              letterSpacing: "clamp(1px, 0.3vw, 3px)",
              textTransform: "uppercase",
              marginBottom: "10px"
            }}
          >
            THE CENTER OF THE ACTION
          </p>
          <h2 style={{ fontFamily: "var(--font-google-sans-flex), sans-serif", color: "white", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: "400", marginBottom: "15px" }}>
            Live Entertainment & Sports
          </h2>
          <p style={{ fontFamily: "var(--font-google-sans-flex), sans-serif", color: "white", fontSize: "clamp(16px, 1.5vw, 16px)", maxWidth: "900px", margin: "0 auto 50px", lineHeight: "1.6" }}>
            View our integrated events calendar for upcoming comedy nights, sports viewing events, and themed game nights.
          </p>
        </div>

        <div style={{ position: "relative", width: "100%", height: "clamp(200px, 30vw, 400px)", overflow: "hidden" }}>
          <Image src={normalizeImageUrl(EVENTS_IMG.liveBanner)} alt="Live Events" fill sizes="100vw" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0c0e16 0%, transparent 55%)", pointerEvents: "none" }} />
        </div>

        <div style={{ position: "relative", width: "100%", height: "140px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 100% at 50% 100%, rgba(188,10,0,0.72) 0%, rgba(208,91,60,0.50) 32%, rgba(227,172,119,0.16) 58%, rgba(227,172,119,0.04) 72%, transparent 82%)", pointerEvents: "none" }} />
          <h3 style={{ position: "relative", zIndex: 10, fontFamily: "var(--font-google-sans-flex), sans-serif", color: "white", fontSize: "clamp(24px, 3vw, 40px)" }}>
            Upcoming Events
          </h3>
        </div>
      </div>

      {/* LIST SỰ KIỆN */}
      <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "60px 20px 0" }}>
        {events.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center" }}>No events found.</p>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {visibleEvents.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>

            {/* Load More / See Less button */}
            {events.length > PAGE_SIZE && (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px", paddingBottom: "60px" }}>
                <button
                  onClick={handleToggle}
                  style={LOAD_BTN_STYLE}
                >
                    <span style={{
                      fontFamily: "var(--font-google-sans-flex), sans-serif",
                      color: "white",
                      fontSize: "15px",
                      letterSpacing: "0.5px",
                    }}>
                      {isAll ? "See Less Events" : "Load More Events"}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        transition: "transform 0.3s ease",
                        transform: isAll ? "rotate(180deg)" : "rotate(0deg)",
                        flexShrink: 0,
                      }}
                    >
                      <path d="M2 5L8 11L14 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}