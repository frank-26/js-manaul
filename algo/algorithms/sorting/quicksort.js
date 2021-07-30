import { Compare, defaultCompare, swap } from '../../util';

// NOTE: 关键方法，分割 i
function partition(array, left, right, compareFn) {
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    // 左标记右移，当超过 pivot 时停止
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++;
    }
    // 右标记左移，当小于 pivot 时停止
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }
    // = ： 当左右标记碰撞时，停止移动
    if (i <= j) {
      // 当左右标记停止时，交互位置：
      /* 
        左标记的作用是找到一个大于 pivot 的值（大值），
        右标记的作用是找到一个小于 pivot 的值（小值）；
        通过交换可以在数列左侧收集小值，右侧收集大值
       */
      swap(array, i, j);
      // 此后，继续移动
      i++;
      j--;
    }
  }
  return i;
}
function quick(array, left, right, compareFn) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, compareFn);
    if (left < index - 1) {
      quick(array, left, index - 1, compareFn);
    }
    if (index < right) {
      quick(array, index, right, compareFn);
    }
  }
  return array;
}
export function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}
