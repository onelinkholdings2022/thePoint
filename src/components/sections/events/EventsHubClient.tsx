"use client";

import { useEffect, useRef } from "react";
import { EventItem } from "@/repositories/events/events.repository";
import { useEventsStore } from "@/stores/eventsStore";
import EventsFilter from "./EventsFilter";
import EventsGrid from "./EventsGrid";
import BookingDialog from "./BookingDialog";

interface Props {
  initialData: EventItem[];
}

export default function EventsHubClient({ initialData }: Props) {
  const seeded = useRef(false);

  // Seed store synchronously before first render so the grid never shows a spinner
  if (!seeded.current) {
    seeded.current = true;
    useEventsStore.setState({
      allEvents: initialData,
      initialized: true,
      loading: false,
    });
  }

  // Always re-fetch after mount so any changes in Google Sheets since SSR are reflected.
  // initialize() deduplicates concurrent calls and skips the loading spinner when data exists.
  useEffect(() => {
    useEventsStore.getState().initialize();
  }, []);

  return (
    <>
      <EventsFilter />
      <EventsGrid />
      <BookingDialog />
    </>
  );
}
