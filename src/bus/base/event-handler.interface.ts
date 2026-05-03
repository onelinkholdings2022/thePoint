import { IDomainEvent } from "./domain-event.interface";

export interface IEventHandler<TEvent extends IDomainEvent> {
  handle(event: TEvent): void | Promise<void>;
}
