// resolve path to src/generated/...
import { resolve } from 'app-root-path';

export function resolveSrc(path: string) {
  return resolve(`src/${path}`);
}

export function resolveGenerated(path: string) {
  return resolve(`src/app/generated/${path}`);
}
