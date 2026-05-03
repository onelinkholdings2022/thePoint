import { IQuery } from "@/bus/base/query.interface";
import { EventsBusOutput } from "../events.types";

export class GetAllEventsQuery implements IQuery<EventsBusOutput> {
  readonly _resultType?: EventsBusOutput;
}
