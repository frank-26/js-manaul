// 一个对象如果要具备可被for...of循环调用的 Iterator 接口，
// 就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
// ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。
// for...of循环内部调用的是数据结构的Symbol.iterator方法。
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
// way2
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (var value of obj) {
  console.log(value); // hello world
}
// way3 : 利用 generator 函数
let obj1 = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

// 调用 Iterator 接口的场合
// 1. 解构赋值
// 2. 扩展运算符
// 3. yield*
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() 

// 4. else
/*
// for...of
Array.from()
// Map(), Set(), WeakMap(), WeakSet()（new Map([['a',1],['b',2]])）
Promise.all()
Promise.race()
*/

// 空对象obj部署了数组arr的Symbol.iterator属性，结果obj的for...of循环，产生了与arr完全一样的结果
const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v); // red green blue
}

const obj2 = {};
obj2[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v of obj2) {
  console.log(v); // red green blue
}


