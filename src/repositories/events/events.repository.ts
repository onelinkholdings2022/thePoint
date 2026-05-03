import { BaseRepository } from "../base/base.repository";
import { getSheetsClient, SPREADSHEET_ID } from "@/lib/googleSheets";

export interface EventItem {
  id: string;
  sheet: string;
  title: string;
  timeline: string;
  type: string;
  description: string;
  time: string;
  img: string;
  raw: Record<string, string>;
}

type EventFields = Omit<EventItem, "id" | "sheet" | "raw">;

const FIELD_MAP: Record<string, keyof EventFields> = {
  title: "title",
  timeline: "timeline",
  date: "timeline",
  type: "type",
  category: "type",
  details: "description",
  description: "description",
  info: "description",
  time: "time",
  img: "img",
  image: "img",
};

// In-memory SWR cache: serve from RAM instantly, refresh Google Sheets in background.
// Persists across requests in the same Node.js process (pre-warmed by instrumentation.ts).
// Changes reflect within ~60s: stale data served immediately + background re-fetch triggered.
const MEM = new Map<string, { data: EventItem[]; exp: number }>();
const TTL = 10_000; // 10 s — short enough that changes in Sheets are visible quickly

async function fetchFromSheets(sheetName: string): Promise<EventItem[]> {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${sheetName}'!A:Z`,
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0].map((h: string) => String(h).trim().toLowerCase());
  const titleIdx = headers.indexOf("title");

  return rows
    .slice(1)
    .filter((row) => titleIdx >= 0 && String(row[titleIdx] ?? "").trim())
    .map((row, index) => {
      const raw: Record<string, string> = {};
      headers.forEach((header: string, i: number) => {
        raw[header] = String(row[i] ?? "");
      });

      const item: EventItem = {
        id: `${sheetName}-${index}`,
        sheet: sheetName,
        title: "",
        timeline: "",
        type: "",
        description: "",
        time: "",
        img: "",
        raw,
      };

      headers.forEach((header: string, i: number) => {
        const field = FIELD_MAP[header];
        if (field) {
          (item as unknown as Record<string, string>)[field] = String(row[i] ?? "");
        }
      });

      return item;
    });
}

async function fetchSheet(sheetName: string): Promise<EventItem[]> {
  const hit = MEM.get(sheetName);

  // Fresh cache — serve instantly (prevents hammering Sheets on concurrent requests)
  if (hit && Date.now() < hit.exp) return hit.data;

  // Stale OR cold — blocking fetch so the caller always gets up-to-date data.
  // auth client is a singleton so subsequent calls cost ~500ms, not 20s.
  const data = await fetchFromSheets(sheetName);
  MEM.set(sheetName, { data, exp: Date.now() + TTL });
  return data;
}

export class EventRepository extends BaseRepository<EventItem> {
  constructor(private readonly sheetName: string) {
    super();
  }

  async findAll(): Promise<EventItem[]> {
    return fetchSheet(this.sheetName);
  }

  async findById(id: string): Promise<EventItem | null> {
    const all = await this.findAll();
    return all.find((item) => item.id === id) ?? null;
  }
}
