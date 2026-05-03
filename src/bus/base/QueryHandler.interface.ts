import { IQuery } from "./Query.interface";

export interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
  execute(query: TQuery): Promise<TResult>;
}
