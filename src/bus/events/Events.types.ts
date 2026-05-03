import { EventItem } from "@/repositories/events/events.repository";

export interface EventsBusOutput {
  data: EventItem[];
  sheet: string;
  total: number;
}
