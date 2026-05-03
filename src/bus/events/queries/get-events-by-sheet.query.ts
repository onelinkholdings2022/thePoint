import { IQuery } from "@/bus/base/query.interface";
import { SheetName } from "@/lib/sheetConstants";
import { EventsBusOutput } from "../events.types";

export class GetEventsBySheetQuery implements IQuery<EventsBusOutput> {
  readonly _resultType?: EventsBusOutput;
  constructor(public readonly sheet: SheetName) {}
}
