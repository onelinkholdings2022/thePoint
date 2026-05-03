import { ICommand } from "./Command.interface";

export interface ICommandHandler<TCommand extends ICommand<TResult>, TResult = void> {
  execute(command: TCommand): Promise<TResult>;
}
