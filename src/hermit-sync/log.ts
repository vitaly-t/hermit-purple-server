import { debug as log, enable } from 'debug';

enable('sync:*');

export const debug = log('sync:debug');
export const info = log('sync:info');
export const error = log('sync:error');
