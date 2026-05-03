"use client";

import BookingHeader from "@/components/sections/events/booking/BookingHeader";
import BookingForm from "@/components/sections/events/booking/BookingForm";
import BookingSuccess from "./BookingSuccess";
import { EventItem } from "@/repositories/events/events.repository";
import { FormState } from "@/components/sections/events/booking/bookingConstants";

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
  success?: boolean;
}

const GOLD_BORDER = [
  "linear-gradient(#e3ac77, #e3ac77) top    / 100% 1.5px no-repeat",
  "linear-gradient(#e3ac77, #e3ac77) left   / 1.5px 100% no-repeat",
  "linear-gradient(#e3ac77, #e3ac77) right  / 1.5px 100% no-repeat",
  "linear-gradient(to right, #e3ac77 30%, #bc0a00 50%, #e3ac77 70%) bottom / 100% 1.5px no-repeat",
].join(", ");

export default function BookingFormCard({
  isLive, form, set, displayDate, calDate,
  showCalendar, onToggleCalendar, onCalendarSelect,
  treehouseEvents, onSubmit, submitting, success,
}: Props) {
  return (
    <div
      style={{
        paddingInline: "clamp(12px, 4vw, 24px)",
        paddingBottom: "clamp(48px, 7vw, 90px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1300px",
          margin: "0 auto",
          background: GOLD_BORDER,
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
          {success ? (
            <BookingSuccess />
          ) : (
            <>
              <BookingHeader />
              <BookingForm
                isLive={isLive}
                form={form}
                set={set}
                displayDate={displayDate}
                calDate={calDate}
                showCalendar={showCalendar}
                onToggleCalendar={onToggleCalendar}
                onCalendarSelect={onCalendarSelect}
                treehouseEvents={treehouseEvents}
                onSubmit={onSubmit}
                submitting={submitting}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
