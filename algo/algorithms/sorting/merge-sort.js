import { Compare, defaultCompare } from '../../util';

function merge(left, right, compareFn) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
  }
  // 不太好理解 i < left.length : left 有剩余，其反面是 left 无剩余；
  // 同时 i，j 之间最多相差 1 ，left 有剩余的反面正是取 right可能的剩余部分 
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
export function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, length), compareFn);
    // 合并
    array = merge(left, right, compareFn);
  }
  return array;
}
