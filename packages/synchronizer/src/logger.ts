import { logger } from '@muta-extra/common';

export const debug = logger.childLogger('sync:debug');
export const info = logger.childLogger('sync:info');
export const error = logger.childLogger('sync:error');
