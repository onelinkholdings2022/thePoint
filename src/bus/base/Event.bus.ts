import { IDomainEvent } from "./DomainEvent.interface";
import { IEventHandler } from "./EventHandler.interface";

export class EventBus<TEvent extends IDomainEvent = IDomainEvent> {
  private readonly handlers: Array<IEventHandler<TEvent>> = [];

  subscribe(handler: IEventHandler<TEvent>): this {
    this.handlers.push(handler);
    return this;
  }

  async publish(event: TEvent): Promise<void> {
    await Promise.all(this.handlers.map((h) => h.handle(event)));
  }
}
