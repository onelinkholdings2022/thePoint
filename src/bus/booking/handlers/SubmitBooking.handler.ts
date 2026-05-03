import { ICommandHandler } from "@/bus/base/CommandHandler.interface";
import { SubmitBookingCommand } from "../commands/SubmitBooking.command";
import { BookingBusOutput } from "../Booking.types";
import { BookingRepository } from "@/repositories/booking/booking.repository";

export class SubmitBookingHandler
  implements ICommandHandler<SubmitBookingCommand, BookingBusOutput>
{
  private readonly repo = new BookingRepository();

  async execute(command: SubmitBookingCommand): Promise<BookingBusOutput> {
    await this.repo.append(command.payload);
    return { success: true };
  }
}
