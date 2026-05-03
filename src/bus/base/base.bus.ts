export abstract class BaseBus<TInput, TOutput> {
  abstract execute(input: TInput): Promise<TOutput>;
}
