import { IQueryHandler } from "@/bus/base/query-handler.interface";
import { GetEventsBySheetQuery } from "../queries/get-events-by-sheet.query";
import { EventsBusOutput } from "../events.types";
import { EventService } from "@/services/events/events.service";

export class GetEventsBySheetHandler
  implements IQueryHandler<GetEventsBySheetQuery, EventsBusOutput>
{
  async execute(query: GetEventsBySheetQuery): Promise<EventsBusOutput> {
    const service = new EventService(query.sheet);
    const data = await service.getAll();
    return { data, sheet: query.sheet, total: data.length };
  }
}
