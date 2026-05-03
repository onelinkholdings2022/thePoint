import { IQuery } from "./Query.interface";
import { IQueryHandler } from "./QueryHandler.interface";

export class QueryBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly registry = new Map<string, IQueryHandler<any, any>>();

  register<TQuery extends IQuery<TResult>, TResult>(
    token: new (...args: any[]) => TQuery,
    handler: IQueryHandler<TQuery, TResult>
  ): this {
    this.registry.set(token.name, handler);
    return this;
  }

  async execute<TQuery extends IQuery<TResult>, TResult>(
    query: TQuery
  ): Promise<TResult> {
    const name = query.constructor.name;
    const handler = this.registry.get(name);
    if (!handler) throw new Error(`QueryBus: no handler for "${name}"`);
    return handler.execute(query) as TResult;
  }
}
