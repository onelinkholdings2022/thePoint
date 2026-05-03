import { CommandBus } from "@/bus/base/command.bus";
import { EventBus } from "@/bus/base/event.bus";
import { SubmitBookingCommand } from "@/bus/booking/commands/submit-booking.command";
import { BookingSubmittedEvent } from "@/bus/booking/domain/booking-submitted.event";
import { SubmitBookingHandler } from "@/bus/booking/handlers/submit-booking.handler";
import { SendConfirmationEmailHandler } from "@/bus/booking/handlers/send-confirmation-email.handler";
import { BookingBusOutput, BookingPayload } from "@/bus/booking/booking.types";
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
