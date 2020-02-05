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

// FIX: 1  for-of (不像forEach那么简单粗暴的方式去遍历执行，而是采用一种特别的手段——迭代器去遍历。)
async function test() {
  let arr = [4, 2, 1]
  for(const item of arr) {
	const res = await handle(item)
	console.log(res)
  }
	console.log('结束')
}

function* fibonacci(){
  let [prev, cur] = [0, 1];
  console.log(cur);
  while(true) {
    [prev, cur] = [cur, prev + cur];
    yield cur;
  }
}

for(let item of fibonacci()) {
  if(item > 50) break;
  console.log(item);
}
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21
// 34
