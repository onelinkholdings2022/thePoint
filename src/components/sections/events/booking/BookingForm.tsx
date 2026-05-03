"use client";

import GradientButton from "@/components/ui/GradientButton";
import { EventItem } from "@/repositories/events/events.repository";
import { FormState, PERSONS, TIME_SLOTS } from "./bookingConstants";
import { BASE, LOCKED, SELECT } from "./bookingStyles";
import BookingCalendar from "./BookingCalendar";

interface Props {
  isLive: boolean;
  form: FormState;
  set: (key: string, val: string) => void;
  displayDate: string;
  calDate: Date | null;
  showCalendar: boolean;
  onToggleCalendar: () => void;
  onCalendarSelect: (d: Date) => void;
  treehouseEvents: EventItem[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitting?: boolean;
}

export default function BookingForm({
  isLive,
  form,
  set,
  displayDate,
  calDate,
  showCalendar,
  onToggleCalendar,
  onCalendarSelect,
  treehouseEvents,
  onSubmit,
  submitting,
}: Props) {
  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

      {/* Row 1: Name | Phone | Email */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          style={BASE}
        />
        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          style={BASE}
        />
        <input
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          style={BASE}
        />
      </div>

      {/* Row 2: Persons | Date | Time */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <select
          value={form.persons}
          onChange={(e) => set("persons", e.target.value)}
          style={SELECT}
        >
          {PERSONS.map((p) => (
            <option key={p} value={p} style={{ background: "#272727" }}>{p}</option>
          ))}
        </select>

        <div style={{ position: "relative" }}>
          {isLive ? (
            <input readOnly value={displayDate} style={LOCKED} />
          ) : (
            <>
              <button
                type="button"
                onClick={onToggleCalendar}
                style={{
                  ...SELECT,
                  display: "block",
                  textAlign: "left",
                  color: displayDate ? "white" : "rgba(255,255,255,0.35)",
                  width: "100%",
                  border: showCalendar ? "1px solid rgba(227,172,119,0.6)" : SELECT.border,
                }}
              >
                {displayDate || "Select Date"}
              </button>
              {showCalendar && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50 }}>
                  <BookingCalendar value={calDate} onChange={onCalendarSelect} />
                </div>
              )}
            </>
          )}
        </div>

        {isLive ? (
          <input readOnly value={form.time || "—"} style={LOCKED} />
        ) : (
          <select
            value={form.time}
            onChange={(e) => set("time", e.target.value)}
            style={SELECT}
          >
            <option value="" style={{ background: "#272727" }}>Select Time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t} style={{ background: "#272727" }}>{t}</option>
            ))}
          </select>
        )}
      </div>

      {/* Row 3: Event Name | Additional Note */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          {isLive ? (
            <input readOnly value={form.eventName} style={LOCKED} />
          ) : (
            <select
              value={form.eventName}
              onChange={(e) => set("eventName", e.target.value)}
              style={SELECT}
            >
              <option value="" style={{ background: "#272727" }}>Event Name</option>
              {treehouseEvents.map((e) => (
                <option key={e.id} value={e.title} style={{ background: "#272727" }}>{e.title}</option>
              ))}
            </select>
          )}
        </div>

        <input
          className="sm:col-span-2"
          placeholder="Additional Note"
          value={form.note}
          onChange={(e) => set("note", e.target.value)}
          style={BASE}
        />
      </div>

      {/* Submit */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
        <GradientButton type="submit" size="lg" className="px-12!" disabled={submitting}>
          {submitting ? "Booking…" : "Book Now"}
        </GradientButton>
      </div>
    </form>
  );
}
