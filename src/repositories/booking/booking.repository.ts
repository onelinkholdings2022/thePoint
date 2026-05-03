import { getSheetsClient, SPREADSHEET_ID } from "@/lib/googleSheets";
import { BookingPayload } from "@/bus/booking/booking.types";

const FORM_DATA_SHEET = "FormData";

export class BookingRepository {
  async append(payload: BookingPayload): Promise<void> {
    const sheets = await getSheetsClient();
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${FORM_DATA_SHEET}'!A:I`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          timestamp,
          payload.name,
          payload.phone,
          payload.email,
          payload.persons,
          payload.date,
          payload.time,
          payload.eventName,
          payload.note,
        ]],
      },
    });
  }
}
