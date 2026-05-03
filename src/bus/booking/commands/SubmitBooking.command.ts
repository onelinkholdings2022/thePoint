import { ICommand } from "@/bus/base/Command.interface";
import { BookingBusOutput, BookingPayload } from "../Booking.types";

export class SubmitBookingCommand implements ICommand<BookingBusOutput> {
  readonly _resultType?: BookingBusOutput;
  constructor(public readonly payload: BookingPayload) {}
}
