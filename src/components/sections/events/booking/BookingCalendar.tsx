"use client";

import { useState } from "react";
import { MONTH_NAMES } from "./bookingConstants";

interface Props {
  value: Date | null;
  onChange: (d: Date) => void;
}

export default function BookingCalendar({ value, onChange }: Props) {
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const firstDay = new Date(view.year, view.month, 1).getDay();

  const prev = () =>
    setView((v) => { const d = new Date(v.year, v.month - 1); return { year: d.getFullYear(), month: d.getMonth() }; });
  const next = () =>
    setView((v) => { const d = new Date(v.year, v.month + 1); return { year: d.getFullYear(), month: d.getMonth() }; });

  return (
    <div style={{ background: "#1a1c26", border: "1px solid rgba(227,172,119,0.35)", padding: "16px 12px", marginTop: "6px" }}>

      {/* Month navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <button type="button" onClick={prev} style={{ background: "none", border: "none", color: "#e3ac77", fontSize: "20px", cursor: "pointer", lineHeight: 1, padding: "0 6px" }}>
          ‹
        </button>
        <span style={{ fontFamily: "var(--font-good-times), sans-serif", fontSize: "12px", color: "white", letterSpacing: "1.5px" }}>
          {MONTH_NAMES[view.month].toUpperCase()} {view.year}
        </span>
        <button type="button" onClick={next} style={{ background: "none", border: "none", color: "#e3ac77", fontSize: "20px", cursor: "pointer", lineHeight: 1, padding: "0 6px" }}>
          ›
        </button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "4px" }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: "10px", color: "rgba(255,255,255,0.4)", padding: "2px 0" }}>{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {Array.from({ length: firstDay }).map((_, i) => <div key={`blank-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(view.year, view.month, day);
          const isPast = date < todayMidnight;
          const isSelected =
            value &&
            value.getFullYear() === view.year &&
            value.getMonth() === view.month &&
            value.getDate() === day;

          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => onChange(date)}
              style={{
                textAlign: "center",
                fontSize: "12px",
                padding: "6px 2px",
                background: isSelected ? "#e3ac77" : "transparent",
                color: isPast ? "rgba(255,255,255,0.18)" : isSelected ? "#0c0e16" : "white",
                border: "none",
                borderRadius: "2px",
                cursor: isPast ? "not-allowed" : "pointer",
                fontWeight: isSelected ? "700" : "400",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
