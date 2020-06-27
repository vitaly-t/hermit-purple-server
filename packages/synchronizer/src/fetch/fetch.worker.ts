import { expose } from 'threads';
import { fetchWholeBlock } from './fetch';

expose(function (height: number) {
  return fetchWholeBlock(height);
});
