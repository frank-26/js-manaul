
// 1. manaul
const flatten = (arr, deep = 1) => {
    return arr.reduce((cur, next) => {
      return Array.isArray(next) && deep > 1 ?
        [...cur, ...flatten(next, deep - 1)] :
        [...cur, next]
    },[])
  }
  
  const arr = [1, [2], [3, [4]]]
  flatten(arr, 1)     // [1, [2], [3, [4]]]
  flatten(arr, 2)     // [1，2, [3, 4]]
  flatten(arr, 3)     // [1，2, 3, 4]
  
  // 2.native  Array.prototype.flat(n:number)

  // concat 
  function flatten(arr) {
    return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
  }