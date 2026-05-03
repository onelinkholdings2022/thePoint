import { EventController } from "@/controllers/events/events.controller";

const controller = new EventController();

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await controller.getAllEvents();
    return Response.json({ success: true, data }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[api/events]", err);
    return Response.json({ success: false, error: "Failed to fetch events" }, { status: 500 });
  }
}
