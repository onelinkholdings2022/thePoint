import { IDomainEvent } from "@/bus/base/domain-event.interface";
import { EventItem } from "@/repositories/events/events.repository";

export class EventsFetchedEvent implements IDomainEvent {
  readonly occurredAt = new Date();
  readonly eventName = "EventsFetched";

  constructor(
    public readonly items: EventItem[],
    public readonly sheet: string
  ) {}
}
