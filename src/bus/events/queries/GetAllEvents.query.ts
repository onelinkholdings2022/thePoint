import { IQuery } from "@/bus/base/Query.interface";
import { EventsBusOutput } from "../Events.types";

export class GetAllEventsQuery implements IQuery<EventsBusOutput> {
  readonly _resultType?: EventsBusOutput;
}
