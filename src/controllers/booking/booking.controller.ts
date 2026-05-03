import { CommandBus } from "@/bus/base/Command.bus";
import { EventBus } from "@/bus/base/Event.bus";
import { SubmitBookingCommand } from "@/bus/booking/commands/SubmitBooking.command";
import { BookingSubmittedEvent } from "@/bus/booking/domain/BookingSubmitted.event";
import { SubmitBookingHandler } from "@/bus/booking/handlers/SubmitBooking.handler";
import { SendConfirmationEmailHandler } from "@/bus/booking/handlers/SendConfirmationEmail.handler";
import { BookingBusOutput, BookingPayload } from "@/bus/booking/Booking.types";
import { EmailService } from "@/services/email/email.service";

export class BookingController {
  private readonly commandBus: CommandBus;
  private readonly domainEventBus: EventBus<BookingSubmittedEvent>;

  constructor() {
    this.commandBus = new CommandBus().register(
      SubmitBookingCommand,
      new SubmitBookingHandler()
    );
    this.domainEventBus = new EventBus<BookingSubmittedEvent>().subscribe(
      new SendConfirmationEmailHandler(new EmailService())
    );
  }

  async submitBooking(payload: BookingPayload): Promise<BookingBusOutput> {
    const result = await this.commandBus.execute<SubmitBookingCommand, BookingBusOutput>(
      new SubmitBookingCommand(payload)
    );
    await this.domainEventBus.publish(new BookingSubmittedEvent(payload));
    return result;
  }
}
