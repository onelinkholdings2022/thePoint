import { create } from "zustand";
import { EventItem } from "@/repositories/events/events.repository";
import type { FormState } from "@/components/sections/events/booking/bookingConstants";

type DialogMode = "live" | "treehouse";

export interface BookingPageSnapshot {
  form: FormState;
  displayDate: string;
  isLive: boolean;
  calDateISO: string | null;
}

interface BookingState {
  open: boolean;
  mode: DialogMode | null;
  liveEvent: EventItem | null;
  openForLive: (event: EventItem) => void;
  openForTreehouse: (event?: EventItem) => void;
  close: () => void;
  pageSnapshot: BookingPageSnapshot | null;
  setPageSnapshot: (s: BookingPageSnapshot) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  open: false,
  mode: null,
  liveEvent: null,
  openForLive: (event) => set({ open: true, mode: "live", liveEvent: event }),
  openForTreehouse: (event) => set({ open: true, mode: "treehouse", liveEvent: event ?? null }),
  close: () => set({ open: false }),
  pageSnapshot: null,
  setPageSnapshot: (s) => set({ pageSnapshot: s }),
}));
