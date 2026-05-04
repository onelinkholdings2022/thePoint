import { Resend } from "resend";
import { BookingPayload } from "@/bus/booking/Booking.types";

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  async sendBookingConfirmation(payload: BookingPayload): Promise<void> {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "The Point <onboarding@resend.dev>",
      to: payload.email,
      subject: "Booking Confirmation – The Point",
      html: buildConfirmationHtml(payload),
    });
  }
}

function buildConfirmationHtml(p: BookingPayload): string {
  const noteRow = p.note
    ? `<tr>
        <td style="padding:8px 0;color:rgba(255,255,255,0.5);">Note</td>
        <td style="padding:8px 0;">${p.note}</td>
       </tr>`
    : "";

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0a;color:#fff;border-radius:8px;">
      <img
        src="https://lh3.googleusercontent.com/d/1JcpkyQLY118mvySgemeDe28wxUL180dA"
        alt="The Point"
        style="height:48px;margin-bottom:24px;display:block;margin-left:auto;margin-right:auto;"
      />
      <h1 style="font-size:28px;margin:0 0 8px;letter-spacing:2px;text-transform:uppercase;text-align:center;">Booking Confirmed!</h1>
      <p style="color:rgba(255,255,255,0.7);margin:0 0 24px;">
        Hi ${p.name}, your reservation at The Point has been received. Here are your details:
      </p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);width:120px;">Event</td>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">${p.eventName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);">Date</td>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">${p.date}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);">Time</td>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">${p.time}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);">Guests</td>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">${p.persons}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:${p.note ? "1px solid rgba(255,255,255,0.1)" : "none"};color:rgba(255,255,255,0.5);">Phone</td>
          <td style="padding:8px 0;border-bottom:${p.note ? "1px solid rgba(255,255,255,0.1)" : "none"};">${p.phone}</td>
        </tr>
        ${noteRow}
      </table>
      <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0;text-align:center;">
        If you need to make any changes, please contact us directly.<br/>
        Please check your spam folder if you don't see this email within a few minutes.
      </p>
    </div>
  `;
}
