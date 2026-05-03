import { EventController } from "@/controllers/events/events.controller";
import { SHEET_NAMES, SheetName } from "@/lib/sheetConstants";

const controller = new EventController();
const VALID: string[] = Object.values(SHEET_NAMES);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sheet: string }> }
) {
  const { sheet } = await params;
  const decoded = decodeURIComponent(sheet);
  if (!VALID.includes(decoded)) {
    return Response.json({ success: false, error: "Invalid sheet" }, { status: 400 });
  }
  try {
    const data = await controller.getEventsBySheet(decoded as SheetName);
    return Response.json({ success: true, data });
  } catch (err) {
    console.error("[api/events/sheet]", err);
    return Response.json({ success: false, error: "Failed to fetch events" }, { status: 500 });
  }
}
