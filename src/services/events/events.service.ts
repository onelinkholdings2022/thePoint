import { BaseService } from "../base/base.service";
import { EventRepository, EventItem } from "@/repositories/events/events.repository";

export class EventService extends BaseService<EventItem> {
  constructor(sheetName: string) {
    super(new EventRepository(sheetName));
  }
}
