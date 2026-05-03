"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "@/stores/bookingStore";
import { useEventsStore } from "@/stores/eventsStore";
import { SHEET_NAMES } from "@/lib/sheetConstants";
import { EASE } from "../images";
import { INITIAL_FORM, FormState, formatLockedDate, formatCalendarDate } from "./bookingConstants";
import BookingHeader from "./BookingHeader";
import BookingForm from "./BookingForm";

export default function BookingDialog() {
  const { open, mode, liveEvent, close, setPageSnapshot } = useBookingStore();
  const router = useRouter();
  const isLive = mode === "live";

  const allEvents = useEventsStore((s) => s.allEvents);
  const treehouseEvents = useMemo(
    () => allEvents.filter((e) => e.sheet === SHEET_NAMES.TREEHOUSE),
    [allEvents]
  );

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [calDate, setCalDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (isLive && liveEvent) {
      setForm((f) => ({ ...f, time: liveEvent.time ?? "", eventName: liveEvent.title }));
    } else {
      setForm((f) => ({ ...f, time: "", eventName: liveEvent?.title ?? "" }));
      setCalDate(null);
      setShowCalendar(false);
    }
  }, [open, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageSnapshot({
      form,
      displayDate:
        isLive && liveEvent
          ? formatLockedDate(liveEvent.timeline ?? "")
          : calDate
          ? formatCalendarDate(calDate)
          : "",
      isLive,
      calDateISO: calDate ? calDate.toISOString() : null,
    });
    close();
    router.push("/events/booking");
  };

  const displayDate =
    isLive && liveEvent
      ? formatLockedDate(liveEvent.timeline ?? "")
      : calDate
      ? formatCalendarDate(calDate)
      : "";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(2px)",
            }}
          />

          {/* Scroll container — click outside dialog closes it */}
          <div
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 201,
              overflowY: "auto",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "clamp(16px, 4vw, 40px) clamp(12px, 4vw, 24px)",
            }}
          >
            {/* Gold-border wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "1100px",
                background: [
                  "linear-gradient(#e3ac77, #e3ac77) top    / 100% 1.5px no-repeat",
                  "linear-gradient(#e3ac77, #e3ac77) left   / 1.5px 100% no-repeat",
                  "linear-gradient(#e3ac77, #e3ac77) right  / 1.5px 100% no-repeat",
                  "linear-gradient(to right, #e3ac77 30%, #bc0a00 50%, #e3ac77 70%) bottom / 100% 1.5px no-repeat",
                ].join(", "),
                padding: "1.5px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  background: "#0c0e16",
                  paddingTop: "clamp(20px, 3vw, 40px)",
                  paddingBottom: "clamp(40px, 6vw, 72px)",
                  paddingInline: "clamp(24px, 5vw, 48px)",
                }}
              >
                <BookingHeader onClose={close} />
                <BookingForm
                  isLive={isLive}
                  form={form}
                  set={set}
                  displayDate={displayDate}
                  calDate={calDate}
                  showCalendar={showCalendar}
                  onToggleCalendar={() => setShowCalendar((s) => !s)}
                  onCalendarSelect={(d) => { setCalDate(d); setShowCalendar(false); }}
                  treehouseEvents={treehouseEvents}
                  onSubmit={handleSubmit}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
