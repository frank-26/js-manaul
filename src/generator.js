// http://www.ruanyifeng.com/blog/2015/04/generator.html
const fs = require('fs');
const co = require('co');

/*
生成器实现机制——协程
协程: 一种比线程更加轻量级的存在，协程处在线程的环境中，一个线程可以存在多个协程，
可以将协程理解为线程中的一个个任务。不像进程和线程，协程并不受操作系统的管理，而是被具体的应用程序代码所控制

NOTE: 一个线程一次只能执行一个协程。比如当前执行 A 协程，另外还有一个 B 协程，如果想要执行 B 的任务，就必须在 A 
协程中将JS 线程的控制权转交给 B协程，那么现在 B 执行，A 就相当于处于暂停的状态。
*/

// 1. thunk函数(即偏函数,curry）
const isType = (type) => {
  return (obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}
// use cases:
const isString = isType('String');
const isFunction = isType('Function');

// Generator 和 异步
const readFileThunk = (filename) => {
  return (callback) => {
    fs.readFile(filename, callback);
  }
}

const gen = function* () {
  const data1 = yield readFileThunk('flat.js')
  console.log(data1.toString())
  const data2 = yield readFileThunk('extend.js')
  console.log(data2.toString())
}

const g = gen();

// g.next().value((err, data1) => {
//   if(err) throw err;
//   g.next(data1).value((err, data2) => {
//     if(err) throw err;
//     g.next(data2);
//   })
// })

function run(gen){
  const next = (err, data) => {
    const res = gen.next(data);
    if(err) throw err;
    if(res.done) return;
    res.value(next);//value: callback
  }
  next();
}
run(g);


const readFilePromise2 = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data);
      }
    })
  });
}
const Gen2 = function* () {
  const data1 = yield readFilePromise2('flat.js')
  console.log(data1.toString())
  const data2 = yield readFilePromise2('extend.js')
  console.log(data2.toString())
}

function run2(gen){
  const next = data => {
    const res = gen.next(data);
    if(res.done) return;
    res.value.then(next, e=>{throw e});// value:Promise
  }
  next();
}

const gen2 = Gen2();

run2(gen2);

co(gen2).then(res =>{
  console.log(res);
})