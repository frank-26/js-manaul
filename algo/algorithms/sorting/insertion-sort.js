import { Compare, defaultCompare } from '../../util';

export const insertionSort = (array, compareFn = defaultCompare) => {
  const { length } = array;
  let temp;
  for (let i = 1; i < length; i++) {
    let j = i;
    temp = array[i];
    // 如果前一项小，则交换位置
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      // console.log('shift ' + array[j - 1]);
      array[j] = array[j - 1];
      j--;
    }
    // console.log('insert ' + temp);
    array[j] = temp;
  }
  return array;
};
