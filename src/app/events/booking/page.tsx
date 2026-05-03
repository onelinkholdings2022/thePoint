"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { useBookingStore } from "@/stores/bookingStore";
import { useEventsStore } from "@/stores/eventsStore";
import { SHEET_NAMES } from "@/lib/sheetConstants";
import {
  INITIAL_FORM,
  FormState,
  formatCalendarDate,
} from "@/components/sections/events/booking/bookingConstants";
import BookingHero from "./components/BookingHero";
import BookingFormCard from "./components/BookingFormCard";
import BookingInfo from "./components/BookingInfo";
import http from "@/lib/http";

const BG_URL =
  "https://lh3.googleusercontent.com/d/1GgZLMKbsEdXQ0on57hTWhjZuNkw4W-SZ";

export default function BookingPage() {
  const { pageSnapshot } = useBookingStore();
  const { allEvents, initialize } = useEventsStore();

  const treehouseEvents = useMemo(
    () => allEvents.filter((e) => e.sheet === SHEET_NAMES.TREEHOUSE),
    [allEvents]
  );

  const isLive = pageSnapshot?.isLive ?? false;

  const [form, setFormState] = useState<FormState>(
    pageSnapshot?.form ?? INITIAL_FORM
  );
  const [calDate, setCalDate] = useState<Date | null>(
    pageSnapshot?.calDateISO ? new Date(pageSnapshot.calDateISO) : null
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => { initialize(); }, [initialize]);

  const prevSnapshotRef = useRef(pageSnapshot);
  useEffect(() => {
    if (pageSnapshot !== prevSnapshotRef.current && pageSnapshot) {
      prevSnapshotRef.current = pageSnapshot;
      setFormState(pageSnapshot.form);
      setCalDate(
        pageSnapshot.calDateISO ? new Date(pageSnapshot.calDateISO) : null
      );
      setShowCalendar(false);
    }
  }, [pageSnapshot]);

  const set = (key: string, val: string) =>
    setFormState((f) => ({ ...f, [key]: val }));

  const displayDate =
    isLive && pageSnapshot?.displayDate
      ? pageSnapshot.displayDate
      : calDate
        ? formatCalendarDate(calDate)
        : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await http.post("/api/booking", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        persons: form.persons,
        date: displayDate,
        time: form.time,
        eventName: form.eventName,
        note: form.note,
      });
      if (data.success) setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <Navbar />
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(${BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <BookingHero />
        <BookingFormCard
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
          submitting={submitting}
          success={success}
        />
        <BookingInfo />
      </section>
      <div
        style={{
          position: "relative",
          zIndex: 9999,
          marginTop: "60px",
          display: "block",
          clear: "both"
        }}
      >
        <Footer />
      </div>
    </main>
  );
}
