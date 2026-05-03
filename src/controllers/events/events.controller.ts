import { BaseController } from "../base/base.controller";
import { QueryBus } from "@/bus/base/query.bus";
import { CommandBus } from "@/bus/base/command.bus";
import { EventBus } from "@/bus/base/event.bus";
import { GetAllEventsQuery } from "@/bus/events/queries/get-all-events.query";
import { GetEventsBySheetQuery } from "@/bus/events/queries/get-events-by-sheet.query";
import { GetAllEventsHandler } from "@/bus/events/handlers/get-all-events.handler";
import { GetEventsBySheetHandler } from "@/bus/events/handlers/get-events-by-sheet.handler";
import { EventsFetchedEvent } from "@/bus/events/domain/events-fetched.event";
import { EventsBusOutput } from "@/bus/events/events.types";
import { SheetName } from "@/lib/sheetConstants";

export class EventController extends BaseController {
  private readonly queryBus: QueryBus;
  private readonly commandBus: CommandBus;
  private readonly domainEventBus: EventBus<EventsFetchedEvent>;

  constructor() {
    super();

    this.queryBus = new QueryBus()
      .register(GetAllEventsQuery, new GetAllEventsHandler())
      .register(GetEventsBySheetQuery, new GetEventsBySheetHandler());

    this.commandBus = new CommandBus();

    this.domainEventBus = new EventBus<EventsFetchedEvent>();
  }

  async getAllEvents(): Promise<EventsBusOutput> {
    const result = await this.queryBus.execute<GetAllEventsQuery, EventsBusOutput>(
      new GetAllEventsQuery()
    );
    await this.domainEventBus.publish(new EventsFetchedEvent(result.data, result.sheet));
    return result;
  }

  async getEventsBySheet(sheet: SheetName): Promise<EventsBusOutput> {
    const result = await this.queryBus.execute<GetEventsBySheetQuery, EventsBusOutput>(
      new GetEventsBySheetQuery(sheet)
    );
    await this.domainEventBus.publish(new EventsFetchedEvent(result.data, result.sheet));
    return result;
  }

  getCommandBus(): CommandBus {
    return this.commandBus;
  }
}
