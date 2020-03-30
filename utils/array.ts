import { flow, uniq, join, map } from 'lodash';

export const toString = flow([map, uniq, join]);
