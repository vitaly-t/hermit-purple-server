export type Maybe<T> = undefined | null | T;

export type Async<T> = T | Promise<T>;

export type MaybeAsync<T> = Maybe<Async<T>>;
