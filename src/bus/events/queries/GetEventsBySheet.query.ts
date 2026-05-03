import { IQuery } from "@/bus/base/Query.interface";
import { SheetName } from "@/lib/sheetConstants";
import { EventsBusOutput } from "../Events.types";

export class GetEventsBySheetQuery implements IQuery<EventsBusOutput> {
  readonly _resultType?: EventsBusOutput;
  constructor(public readonly sheet: SheetName) {}
}
