import { MaybeAsync } from '@muta-extra/common';

export interface PageArgs {
  first?: number | undefined | null;
  last?: number | undefined | null;
  skip?: number | undefined | null;
}

export interface Pageable {
  pageArgs: PageArgs;
}

export type QueryOneFn<Ret, Param = void> = Param extends void
  ? () => MaybeAsync<Ret>
  : (args: Param) => MaybeAsync<Ret>;

export type QueryManyFn<Ret, Param = void> = Param extends void
  ? (args?: Partial<Pageable>) => Promise<Ret[]>
  : (args: Param & Partial<Pageable>) => Promise<Ret[]>;
