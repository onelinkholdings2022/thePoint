import { IDomainEvent } from "@/bus/base/DomainEvent.interface";
import { BookingPayload } from "../Booking.types";

export class BookingSubmittedEvent implements IDomainEvent {
  readonly occurredAt = new Date();
  readonly eventName = "BookingSubmitted";
  constructor(public readonly payload: BookingPayload) {}
}
