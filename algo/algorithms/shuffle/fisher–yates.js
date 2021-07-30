import { swap } from '../../util';

// 乱序
export function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    // 关键 randomIndex
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}