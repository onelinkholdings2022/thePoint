"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/imageUtils";
import { EventItem } from "@/repositories/events/events.repository";
import GradientButton from "@/components/ui/GradientButton";
import { useBookingStore } from "@/stores/bookingStore";
import { EASE, EVENTS_IMG } from "./images";

function CategoryCard({ event, index }: { event: EventItem; index: number }) {
  const imgSrc = normalizeImageUrl(event.img);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }} className="flex flex-col">
      <div
        className="group transition-shadow duration-300 hover:shadow-brand-image"
        style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#111" }}
      >
        {imgSrc && <Image src={imgSrc} alt={event.title || "Event"} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-700" />}
        {/* Gradient border overlay: cam 3 cạnh, đỏ giữa cạnh dưới */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: [
              "linear-gradient(#e3ac77, #e3ac77) top    / 100% 1.5px no-repeat",
              "linear-gradient(#e3ac77, #e3ac77) left   / 1.5px 100% no-repeat",
              "linear-gradient(#e3ac77, #e3ac77) right  / 1.5px 100% no-repeat",
              "linear-gradient(to right, #e3ac77 30%, #bc0a00 50%, #e3ac77 70%) bottom / 100% 1.5px no-repeat",
            ].join(", "),
          }}
        />
      </div>
      <div style={{ paddingTop: "24px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
        <p style={{ fontFamily: "var(--font-good-times), sans-serif", textTransform: "uppercase", letterSpacing: "1px", color: "white", fontSize: "clamp(18px, 1.8vw, 22px)" }}>{event.title}</p>
        <GradientButton
          size="sm"
          style={{ fontSize: "13px", padding: "10px 32px" }}
          onClick={() => useBookingStore.getState().openForTreehouse(event)}
        >
          Book Now
        </GradientButton>
      </div>
    </motion.div>
  );
}

export default function TreehouseEventsSection({ events }: { events: EventItem[] }) {
  return (
    <div className="w-full">
      {/* BANNER TREEHOUSE */}
      <div className="w-full flex flex-col items-center">
        <div style={{ paddingTop: "1px", paddingBottom: "30px", textAlign: "center", width: "100%" }}>
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
            VIP GROUP EXPERIENCE
          </p>
          <h2 style={{ fontFamily: "var(--font-google-sans-flex), sans-serif", color: "white", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: "400", marginBottom: "15px" /* Đổi 24px -> 15px */ }}>
            Book The Treehouse
          </h2>
          {/* Cập nhật color: white và maxWidth: 900px y hệt Live */}
          <p style={{ fontFamily: "var(--font-google-sans-flex), sans-serif", color: "white", fontSize: "clamp(16px, 1.5vw, 16px)", maxWidth: "900px", margin: "0 auto 50px", lineHeight: "1.6" }}>
            Reserve our dedicated private event space for your next VIP gathering, corporate party, or birthday.
          </p>
        </div>

        <div style={{ position: "relative", width: "100%", height: "clamp(200px, 30vw, 400px)", overflow: "hidden" }}>
          <Image src={normalizeImageUrl(EVENTS_IMG.treehouseBanner)} alt="Treehouse Events" fill sizes="100vw" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0c0e16 0%, transparent 55%)", pointerEvents: "none" }} />
        </div>

        <div style={{ position: "relative", width: "100%", height: "140px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 100% at 50% 100%, rgba(188,10,0,0.72) 0%, rgba(208,91,60,0.50) 32%, rgba(227,172,119,0.16) 58%, rgba(227,172,119,0.04) 72%, transparent 82%)", pointerEvents: "none" }} />
          <h3 style={{ position: "relative", zIndex: 10, fontFamily: "var(--font-google-sans-flex), sans-serif", color: "white", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: "400" }}>
            Premium Space. Zero Stress.
          </h3>
        </div>
      </div>

      {/* GRID SỰ KIỆN TREEHOUSE */}
      <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "60px 20px 0" }}>
        {events.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center" }}>No bookings available.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "50px 90px" }}>
            {events.map((e, i) => (
              <CategoryCard key={e.id} event={e} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}