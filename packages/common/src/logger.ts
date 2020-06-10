import { debug, Debugger } from 'debug';

const log = debug('muta:extra');

interface Logger {
  /**
   * log the message
   */
  (message: string): void;

  /**
   * create a child logger with new namespace like `muta:some_namespace`
   * @param namespace
   */
  childLogger: (namespace: string) => Debugger;
}

export const logger: Logger = message => {
  log(message);
};

logger.childLogger = ns => {
  ns = ns.startsWith('muta:') ? ns : 'muta:' + ns;
  return debug(ns);
};
