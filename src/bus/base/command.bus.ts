import { ICommand } from "./Command.interface";
import { ICommandHandler } from "./CommandHandler.interface";

export class CommandBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly registry = new Map<string, ICommandHandler<any, any>>();

  register<TCommand extends ICommand<TResult>, TResult = void>(
    token: new (...args: any[]) => TCommand,
    handler: ICommandHandler<TCommand, TResult>
  ): this {
    this.registry.set(token.name, handler);
    return this;
  }

  async execute<TCommand extends ICommand<TResult>, TResult = void>(
    command: TCommand
  ): Promise<TResult> {
    const name = command.constructor.name;
    const handler = this.registry.get(name);
    if (!handler) throw new Error(`CommandBus: no handler for "${name}"`);
    return handler.execute(command) as TResult;
  }
}
