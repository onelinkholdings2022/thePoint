import { IEventHandler } from "@/bus/base/EventHandler.interface";
import { BookingSubmittedEvent } from "@/bus/booking/domain/BookingSubmitted.event";
import { EmailService } from "@/services/email/email.service";

export class SendConfirmationEmailHandler
  implements IEventHandler<BookingSubmittedEvent>
{
  constructor(private readonly emailService: EmailService) {}

  async handle(event: BookingSubmittedEvent): Promise<void> {
    await this.emailService.sendBookingConfirmation(event.payload);
  }
}
