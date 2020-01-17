export const MUTA_ENDPOINT =
  process.env.MUTA_ENDPOINT || 'http://127.0.0.1:8000/graphql';

export const MUTA_CHAINID =
  '0xb6a4d7da21443f5e816e8700eea87610e6d769657d6b8ec73028457bf2ca4036';

/**
 * max concurrency num for sync data from chain
 */
export const SYNC_CONCURRENCY = 500;

export const HERMIT_PORT = process.env.HERMIT_PORT || 4040;

export const ALLOW_CORS = process.env.ALLOW_CORS ?? true;
