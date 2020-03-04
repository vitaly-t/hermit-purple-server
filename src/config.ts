/**
 * Muta endpoint
 */
export const MUTA_ENDPOINT =
  process.env.MUTA_ENDPOINT ?? 'http://127.0.0.1:8000/graphql';

/**
 * Muta chain id
 */
export const MUTA_CHAINID =
  process.env.MUTA_CHAINID ??
  '0xb6a4d7da21443f5e816e8700eea87610e6d769657d6b8ec73028457bf2ca4036';

/**
 * max concurrency num for sync data from chain
 */
export const SYNC_CONCURRENCY: number = Number(
  process.env.HERMIT_FETCH_CONCURRENCY ?? 500,
);

/**
 * Maximum concurrent number of synchronizations
 */
export const HERMIT_PORT = process.env.HERMIT_PORT ?? 4040;

/**
 * [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) origin
 */
export const HERMIT_CORS_ORIGIN = process.env.HERMIT_CORS_ORIGIN ?? '';

/**
 * Maximum number of pull fields allowed by a query
 */
export const HERMIT_MAX_COMPLEXITY: number = Number(
  process.env.HERMIT_MAX_COMPLEXITY ?? 100,
);

/**
 * Path to forward requests to Muta, for example if set to `chain`
 * now `sendTransaction` to http://localhost:4040/chain would forward
 * the request to Muta
 */
export const HERMIT_BYPASS_CHAIN = process.env.HERMIT_BYPASS_CHAIN ?? 'chain';
