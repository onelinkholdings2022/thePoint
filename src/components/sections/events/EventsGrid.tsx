"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEventsStore } from "@/stores/eventsStore";
import { SHEET_NAMES } from "@/lib/sheetConstants";
import { EASE } from "./images";
import LiveEventsSection from "./LiveEventsSection";
import TreehouseEventsSection from "./TreehouseEventsSection";

export default function EventsGrid() {
  const loading = useEventsStore((s) => s.loading);
  const error = useEventsStore((s) => s.error);
  const allEvents = useEventsStore((s) => s.allEvents);
  const activeFilter = useEventsStore((s) => s.activeFilter);

  const liveEvents = allEvents.filter((e) => e.sheet === SHEET_NAMES.LIVE_ENTERTAINMENT);
  const treehouseEvents = allEvents.filter((e) => e.sheet === SHEET_NAMES.TREEHOUSE);
  const filteredEvents = activeFilter === "all" ? allEvents : allEvents.filter((e) => e.sheet === activeFilter);

  return (
    <section 
      style={{ 
        width: "100%", 
        backgroundColor: "#0c0e16", 
        paddingBottom: "120px",
        marginTop: "40px" 
      }}
    >
      <AnimatePresence mode="wait">
        {/* Loading */}
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center py-24">
            <p className="text-white/50">Loading events…</p>
          </motion.div>
        )}

        {/* Cả 2 Mục (All Events) */}
        {!loading && !error && activeFilter === "all" && (
          <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} style={{ display: "flex", flexDirection: "column", gap: "120px" }}>
            <LiveEventsSection events={liveEvents} />
            <TreehouseEventsSection events={treehouseEvents} />
          </motion.div>
        )}

        {/* Chỉ Live Entertainment */}
        {!loading && !error && activeFilter === SHEET_NAMES.LIVE_ENTERTAINMENT && (
          <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
            <LiveEventsSection events={filteredEvents} />
          </motion.div>
        )}

        {/* Chỉ Treehouse */}
        {!loading && !error && activeFilter === SHEET_NAMES.TREEHOUSE && (
          <motion.div key="treehouse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
            <TreehouseEventsSection events={filteredEvents} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}