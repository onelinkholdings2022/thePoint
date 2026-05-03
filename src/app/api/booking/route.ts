import { NextRequest } from "next/server";
import { BookingController } from "@/controllers/booking/booking.controller";
import { BookingPayload } from "@/bus/booking/booking.types";

export const dynamic = "force-dynamic";

const controller = new BookingController();

export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json();
    const result = await controller.submitBooking(body);
    return Response.json(result);
  } catch {
    return Response.json({ success: false }, { status: 500 });
  }
}
