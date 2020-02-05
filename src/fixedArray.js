// 1. ES5(注意不要用箭头函数)
function MyArray(len) {
  this.len = len;
  this.items = [];
}
MyArray.prototype.canDo = function() {
  return this.len <= this.items.length
}
MyArray.prototype.push = function(item) {
  if (this.canDo()) {
    console.log('error');
    return
  }
  this.items.push(item)
}

// 2. Proxy

function fixedArray(n) {
  const array = [];
  return new Proxy(array, {
    get(target, prop) {
      const val = target[prop];
      if (typeof val === 'function') {
        if (['push', 'unshift'].includes(prop)) {
          return function(el) {
            if (array.length >= n) {
              console.log('length overflowed!');
              return
            };
            return Array.prototype[prop].apply(target, arguments);
          }
        }
        if (['pop'].includes(prop)) {
          return function() {
            const el = Array.prototype[prop].apply(target, arguments);
            return el;
          }
        }
        return val.bind(target);
      }
      return val;
    }
  });

}

// 同一个拦截器函数，可以设置拦截多个操作。

var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {
      value: args[1]
    };
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true

// 访问负数索引
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = propKey;
      if (index < 0) {
        propKey = target.length + index;
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

// 3. https://stackoverflow.com/questions/21988909/is-it-possible-to-create-a-fixed-length-array-in-javascript
const array = new Array(4)

Object.seal(array)
// or (However you are unable to change the values of a freezed object. )
Object.freeze(array);


// ts
/*
type ArrayFixed < T, L extends number > = [T, ...Array < T > ] & {
  length: L
}
var myNumericalArray: ArrayFixed < number, 2 > = [1, 2] // OK
var myNumericalArray: ArrayFixed < number, 2 > = [2] // LENGTH ERROR
var myNumericalArray: ArrayFixed < number, 2 > = [1, 2, 3] // LENGTH ERROR
var myNumericalArray: ArrayFixed < number, 2 > = [1, "2"] // TYPE ERROR

*/