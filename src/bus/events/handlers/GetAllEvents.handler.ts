import { IQueryHandler } from "@/bus/base/QueryHandler.interface";
import { GetAllEventsQuery } from "../queries/GetAllEvents.query";
import { EventsBusOutput } from "../Events.types";
import { EventService } from "@/services/events/events.service";
import { SHEET_NAMES } from "@/lib/sheetConstants";

export class GetAllEventsHandler
  implements IQueryHandler<GetAllEventsQuery, EventsBusOutput>
{
  private readonly liveService = new EventService(SHEET_NAMES.LIVE_ENTERTAINMENT);
  private readonly treehouseService = new EventService(SHEET_NAMES.TREEHOUSE);

  async execute(_query: GetAllEventsQuery): Promise<EventsBusOutput> {
    const [live, treehouse] = await Promise.all([
      this.liveService.getAll(),
      this.treehouseService.getAll(),
    ]);
    const data = [...live, ...treehouse];
    return { data, sheet: "all", total: data.length };
  }
}
