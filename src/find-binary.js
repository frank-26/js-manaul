function Find(target, array) {
  let i = 0;
  let j = array[i].length - 1;
  while (i < array.length && j >= 0) {
      if (array[i][j] < target) {
          i++;
      } else if (array[i][j] > target) {
          j--;
      } else {
          return true;
      }
  }
  return false;
}

//测试用例
console.log(Find(10, [
  [1, 2, 3, 4], 
  [5, 9, 10, 11], 
  [13, 20, 21, 23]
  ])
);