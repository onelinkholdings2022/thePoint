import { IDomainEvent } from "./DomainEvent.interface";

export interface IEventHandler<TEvent extends IDomainEvent> {
  handle(event: TEvent): void | Promise<void>;
}
