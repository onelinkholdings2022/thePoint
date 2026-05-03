import { IDomainEvent } from "@/bus/base/domain-event.interface";
import { BookingPayload } from "../booking.types";

export class BookingSubmittedEvent implements IDomainEvent {
  readonly occurredAt = new Date();
  readonly eventName = "BookingSubmitted";
  constructor(public readonly payload: BookingPayload) {}
}
