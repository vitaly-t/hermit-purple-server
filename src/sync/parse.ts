const JSONbig = require('json-bigint');

/**
 * parse number with BigNumber
 */
export function safeJSONParse<O = unknown, I = any>(x: I): O {
  return JSONbig.parse(x);
}
