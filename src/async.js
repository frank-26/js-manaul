// http://www.ruanyifeng.com/blog/2015/04/generator.html
async function test1() {
  console.log(100) // 2.0 同步
  // 被 JS 引擎转换成一个 Promise，JS 引擎将暂停当前协程的运行，把线程的执行权交给父协程，
  //回到父协程中，父协程的第一件事情就是对await返回的Promise调用then, 来监听这个 Promise 的状态改变 
  let x = await 200 
  console.log(x)//2.2 
  console.log(201) // 2.3
}
console.log(0) // 1. 同步
test1() // 2. 同步
console.log(300)// 2.1

// 0 100 300 200 201 

//promise.then(value => {
  // 1. 将线程的执行权交给test协程
  // 2. 把 value 值传递给 test 协程
//})
async function test() {
	let arr = [4, 2, 1]
	arr.forEach(async item => {
		const res = await handle(item)
		console.log(res)
	})
	console.log('结束')
}

function handle(x) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(x)
		}, 1000 * x)
	})
}

test()

// 1 2 4 

/**  forEach 核心逻辑
for (var i = 0; i < length; i++) {
  if (i in array) {
    var element = array[i];
    callback(element, i, array);
  }
}
*/
// NOTE: 头条面试问及
// FIX: 1  for-of (不像forEach那么简单粗暴的方式去遍历执行，而是采用一种特别的手段——迭代器去遍历。)
async function test() {
  let arr = [4, 2, 1]
  for(const item of arr) {
	const res = await handle(item)
	console.log(res)
  }
	console.log('结束')
}

//按顺序完成异步操作 http://es6.ruanyifeng.com/#docs/async#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%8C%89%E9%A1%BA%E5%BA%8F%E5%AE%8C%E6%88%90%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C

// Promise + reduce
function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
// async + for-of
/*
虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，
外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。
*/ 
async function asyncLogInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}

const urls=new Array(10).fill('http://es6.ruanyifeng.com/config.js');
asyncLogInOrder(urls);

/**
* for...in循环有几个缺点:
1. 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
2. for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
3. 某些情况下，for...in循环会以任意顺序遍历键名。
总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

for...of循环相比上面几种做法，有一些显著的优点。

1. 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
2. 不同于forEach方法，它可以与break、continue和return配合使用。
3. 提供了遍历所有数据结构的统一操作接口。
*/

