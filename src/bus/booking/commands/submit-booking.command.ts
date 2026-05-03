import { ICommand } from "@/bus/base/command.interface";
import { BookingBusOutput, BookingPayload } from "../booking.types";

export class SubmitBookingCommand implements ICommand<BookingBusOutput> {
  readonly _resultType?: BookingBusOutput;
  constructor(public readonly payload: BookingPayload) {}
}
