import { IEventHandler } from "@/bus/base/event-handler.interface";
import { BookingSubmittedEvent } from "@/bus/booking/domain/booking-submitted.event";
import { EmailService } from "@/services/email/email.service";

export class SendConfirmationEmailHandler
  implements IEventHandler<BookingSubmittedEvent>
{
  constructor(private readonly emailService: EmailService) {}

  async handle(event: BookingSubmittedEvent): Promise<void> {
    await this.emailService.sendBookingConfirmation(event.payload);
  }
}
