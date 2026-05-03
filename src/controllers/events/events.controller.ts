import { BaseController } from "../base/base.controller";
import { QueryBus } from "@/bus/base/Query.bus";
import { CommandBus } from "@/bus/base/Command.bus";
import { EventBus } from "@/bus/base/Event.bus";
import { GetAllEventsQuery } from "@/bus/events/queries/GetAllEvents.query";
import { GetEventsBySheetQuery } from "@/bus/events/queries/GetEventsBySheet.query";
import { GetAllEventsHandler } from "@/bus/events/handlers/GetAllEvents.handler";
import { GetEventsBySheetHandler } from "@/bus/events/handlers/GetEventsBySheet.handler";
import { EventsFetchedEvent } from "@/bus/events/domain/EventsFetched.event";
import { EventsBusOutput } from "@/bus/events/Events.types";
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
