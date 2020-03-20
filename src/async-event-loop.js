const fs = require('fs');

function testA() {
  async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }
  async function async2() {
    console.log("async2");
  }
  async1();
  console.log('start')
}
testA();//'async1 start' 'async2' 'start' 'async1 end'
/*
1. 首先一进来是创建了两个函数的，我们先不看函数的创建位置，而是看它的调用位置
2. 发现async1函数被调用了，然后去看看调用的内容
3. 执行函数中的同步代码async1 start，之后碰到了await，它会阻塞async1后面代码的执行，因此会先去执行async2中的同步代码async2，然后跳出async1
4. 跳出async1函数后，执行同步代码start
5. 在一轮宏任务全部执行完之后，再来执行刚刚await后面的内容async1 end。

此时，可以认为 await 后面的内容就相当于放到了 Promise.then 的里面
*/

function testB(params) {
  async function async1 () {
    console.log('async1 start');
    await new Promise(resolve => {
      console.log('promise1')
      resolve('promise1 resolve')
    }).then(res => console.log(res))
    console.log('async1 success');
    return 'async1 end'
  }
  console.log('srcipt start')
  async1().then(res => console.log(res))
  console.log('srcipt end')
  
}
/*
'script start'
'async1 start'
'promise1'
'script end'
'promise1 resolve'
'async1 success'
'async1 end'
*/
//  头条
function testC(params) {
  async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }
  
  async function async2() {
    console.log("async2");
  }
  
  console.log("script start");
  
  setTimeout(function() {
    console.log("setTimeout");
  }, 0);
  
  async1();
  
  new Promise(function(resolve) {
    console.log("promise1");
    resolve();
  }).then(function() {
    console.log("promise2");
  });
  console.log('script end')
  
}

// testC()

/*
'script start'
'async1 start'
'async2'
'promise1'
'script end'

'async1 end'
'promise2'
'setTimeout'
*/
function test1(){
  const timeoutScheduled = Date.now();

// 异步任务一：100ms 后执行的定时器
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms`);
}, 100);

// 异步任务二：文件读取后，有一个 200ms 的回调函数
fs.readFile('./bind.js', () => {
  const startCallback = Date.now();
  while (Date.now() - startCallback < 200) {
    // 什么也不做
    // console.log('do nothing.')
  }
});
}
// test1()

//many `do nothing.`  200+ ms
/*
进入第一轮事件循环以后，没有到期的定时器，也没有已经可以执行的 I/O 回调函数，所以会进入 Poll 阶段，等待内核返回文件读取的结果。
由于读取小文件一般不会超过 100ms，所以在定时器到期之前，Poll 阶段就会得到结果，因此就会继续往下执行。

第二轮事件循环，依然没有到期的定时器，但是已经有了可以执行的 I/O 回调函数，所以会进入 I/O callbacks 阶段，执行fs.readFile的回调函数。
这个回调函数需要 200ms，也就是说，在它执行到一半的时候，100ms 的定时器就会到期。但是，必须等到这个回调函数执行完，才会离开这个阶段。

第三轮事件循环，已经有了到期的定时器，所以会在 timers 阶段执行定时器。最后输出结果大概是200多毫秒。
*/

// 由于 setTimeout 在 timers 阶段执行，而 setImmediate 在 check 阶段执行。所以前者会早于后者完成。
// 1 2 or 2 1
function test2(){
  setImmediate(() => console.log(2));
setTimeout(() => console.log(1));

/* setImmediate和setTimeout()是相似的，但根据它们被调用的时间以不同的方式表现:
1. setImmediate()设计用于在当前poll阶段完成后check阶段执行脚本 。
2. setTimeout() 安排在经过最小（ms）后运行的脚本，在timers阶段执行。
*/
// 如果在I / O周期内移动两个调用，则始终首先执行立即回调：一定是 2 1
fs.readFile('./bind.js', () => {
  setTimeout(() => console.log(1));
  setImmediate(() => console.log(2));
});
}
// test2()
/*process.nextTick: 指定的任务总是发生在所有异步任务之前
方法可以在当前"执行栈"的尾部----下一次Event Loop 之前----触发回调函数。
*/

function test3(){
  process.nextTick(function A() {
    console.log(1);
    process.nextTick(function B() {
      console.log(2);
    });
  });
  
  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0)
  
  // 1 2 TIMEOUT FIRED
  
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B() {
      console.log(2);
    });
  });
  
  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);
}
// test3()
// setImmediate与setTimeout(fn,0)各自添加了一个回调函数A和timeout，都是在下一次Event Loop触发。
// 那么，哪个回调函数先执行呢？答案是不确定。运行结果可能是1--TIMEOUT FIRED--2，也可能是TIMEOUT FIRED--1--2。


function test4(){
  setImmediate(function() {
    setImmediate(function A() {
      console.log(1);
      setImmediate(function B() {
        console.log(2);
      });
    });
  
    setTimeout(function timeout() {
      console.log('TIMEOUT FIRED');
    }, 0);
  });
}

// test4()
// 1
// TIMEOUT FIRED
// 2
// 递归场景：setImmediate指定的回调函数，总是排在 setTimeout 前面

// Node.js会抛出一个警告，要求你改成setImmediate
// process.nextTick(function foo() {
//   console.log('foo')
//   process.nextTick(foo);
// });
// VS ：由于process.nextTick指定的回调函数是在本次"事件循环"触发，而setImmediate指定的是在下次"事件循环"触发，
// 所以很显然，前者总是比后者发生得早，而且执行效率也高

function test5() {
  console.log('start')
  setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(function() {
      console.log('promise1')
    })
  }, 0)
  setTimeout(() => {
    console.log('timer2')
    Promise.resolve().then(function() {
      console.log('promise2')
    })
  }, 0)
  Promise.resolve().then(function() {
    console.log('promise3')
  })
  console.log('end')
}
test5()
/*
start
end
promise3
timer1
promise1
timer2
promise2 
*/