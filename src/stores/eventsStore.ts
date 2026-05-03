import { create } from "zustand";
import http from "@/lib/http";
import { EventItem } from "@/repositories/events/events.repository";
import { SHEET_NAMES, SheetName } from "@/lib/sheetConstants";

export type FilterType = "all" | SheetName;

export const FILTER_LABELS: Record<FilterType, string> = {
  all: "All Events",
  [SHEET_NAMES.LIVE_ENTERTAINMENT]: "Live Entertainment & Sports",
  [SHEET_NAMES.TREEHOUSE]: "The Treehouse",
};

interface EventsState {
  allEvents: EventItem[];
  activeFilter: FilterType;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  // Pre-seed from server (SSR path) — provides instant initial render
  setInitialData: (data: EventItem[]) => void;
  // Re-fetch from API — deduplicates concurrent calls, runs on every mount
  initialize: () => Promise<void>;
  // Instant: no API call, just updates the filter
  setFilter: (filter: FilterType) => void;
  // Derived: returns the filtered slice from allEvents
  getEvents: () => EventItem[];
}

export const useEventsStore = create<EventsState>((set, get) => ({
  allEvents: [],
  activeFilter: "all",
  loading: false,
  error: null,
  initialized: false,

  setInitialData: (data) =>
    set({ allEvents: data, initialized: true, loading: false }),

  initialize: async () => {
    if (get().loading) return; // deduplicate concurrent calls
    // Only show spinner when there is no data yet (first ever load, no SSR seed)
    const hasData = get().allEvents.length > 0;
    set({ loading: !hasData, error: null });
    try {
      const { data } = await http.get("/api/events");
      set({ allEvents: data.data.data, loading: false, initialized: true });
    } catch {
      set({ error: "Failed to load events", loading: false });
    }
  },

  setFilter: (filter) => set({ activeFilter: filter }),

  getEvents: () => {
    const { allEvents, activeFilter } = get();
    if (activeFilter === "all") return allEvents;
    return allEvents.filter((e) => e.sheet === activeFilter);
  },
}));
