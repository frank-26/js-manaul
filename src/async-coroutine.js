// 示例：
function asnycJob() {
  // var f = yield readFile(fileA);
}

/*
其中的 yield 命令。它表示执行到此处，执行权将交给其他协程。
也就是说，yield命令是异步两个阶段的分界线。

协程遇到 yield 命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。
*/
function test1() {
  async function async1() {
    console.log(1);// A1
    await async2();// A1
    console.log(2) // B2
  }

  async function async2() {
    console.log(3);// A1
  }

  Promise.resolve().then(x => {
    console.log(4) // B1
  });

  setTimeout(x => {
    console.log(5)// C1
  });

  async1();// A1 注意其与异步任务的前后顺序

  console.log(6);// A1

  Promise.resolve().then(x => {
    console.log(7)// B3
  });

  setTimeout(x => {
    console.log(8)// C2
  });
}

// test1() // 1 3 6 4 2 7 5 8
/*
现象：执行同步代码 > 执行遇到 await 搁置 > 执行完同步任务，再执行完 microtask （本轮循环）> 执行 await 之后的逻辑 >执行 macrotask （此轮循环）
解释：
*/
async function test2() {
  async function async1() {
    console.log(1);// A1
    await async2();// A1
    console.log(2)
  }

  async function async2() {
    console.log(3);// A1
  }

  Promise.resolve().then(x => {
    console.log(4)// A1
  });

  setTimeout(x => {
    console.log(5)// C1
  });

  await async1();// A1

  console.log(6) // B1

  Promise.resolve().then(x => {
    console.log(7)// B2
  });

  setTimeout(x => {
    console.log(8)// C2
  });
}
test2()
// 1 3 4 2 6 5
/*
现象：执行同步任务 await 之前的同步任务 > 执行内层 await 任务 > 执行本轮循环 > 执行内层 await 之后逻辑 > 执行外层同步任务 > 执行次轮循环
解释：
*/


function test3() {
  console.log('script start')
  async function async1() {
    await async2()
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2 end')
  }
  async1()
  setTimeout(function() {
    console.log('setTimeout')
  }, 0)
  new Promise(resolve => {
      console.log('Promise')
      resolve()
    })
    .then(function() {
      console.log('promise1')
    })
    .then(function() {
      console.log('promise2')
    })
  console.log('script end')
}
// test3()
/*
script start
async2 end
Promise
script end
async1 end
promise1
promise2
setTimeout 
*/