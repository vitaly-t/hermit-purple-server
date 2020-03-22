require('dotenv').config();

export function env(key: string, defaults: string = ''): string {
  const result = process.env[key];
  return result ?? defaults;
}

export function envNumber(key: string, defaults: number = 0): number {
  const result = Number(process.env[key]);
  return isNaN(result) ? defaults : result;
}

/**
 * Muta endpoint
 */
export const MUTA_ENDPOINT = env(
  'MUTA_ENDPOINT',
  'http://127.0.0.1:8000/graphql',
);

/**
 * Muta chain id
 */
export const MUTA_CHAINID = env(
  'MUTA_CHAINID',
  '0xb6a4d7da21443f5e816e8700eea87610e6d769657d6b8ec73028457bf2ca4036',
);

/**
 * Muta timeout gap
 */
export const MUTA_TIMEOUT_GAP = envNumber('MUTA_TIMEOUT_GAP', 20);

/**
 * max concurrency num for sync data from chain
 */
export const HERMIT_FETCH_CONCURRENCY: number = envNumber(
  'HERMIT_FETCH_CONCURRENCY',
  500,
);

/**
 * Maximum concurrent number of synchronizations
 */
export const HERMIT_PORT = envNumber('HERMIT_PORT', 4040);

/**
 * [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) origin
 */
export const HERMIT_CORS_ORIGIN = env('HERMIT_CORS_ORIGIN', '');

/**
 * Maximum number of pull fields allowed by a query
 */
export const HERMIT_MAX_COMPLEXITY: number = envNumber(
  'HERMIT_MAX_COMPLEXITY',
  100,
);

export const HERMIT_MAX_SKIP_SIZE: number = envNumber(
  'HERMIT_MAX_SKIP_SIZE',
  10000,
);

/**
 * Path to forward requests to Muta, for example if set to `chain`
 * now `sendTransaction` to http://localhost:4040/chain would forward
 * the request to Muta
 */
export const HERMIT_BYPASS_CHAIN = process.env.HERMIT_BYPASS_CHAIN ?? 'chain';

/**
 *
 */
export const HERMIT_DATABASE_URL = env('HERMIT_DATABASE_URL');
