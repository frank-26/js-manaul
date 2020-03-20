const fs = require('fs');

function test1(params) {
  function addNextTickRecurs(count) {
      let self = this;
      if (self.id === undefined) {
          self.id = 0;
      }
  
      if (self.id === count) return;
  
      process.nextTick(() => {
          console.log(`process.nextTick call ${++self.id}`);
          addNextTickRecurs.call(self, count);
      });
  }
  
  // addNextTickRecurs(Infinity);
  setTimeout(console.log.bind(console, 'omg! setTimeout was called'), 10);
  setImmediate(console.log.bind(console, 'omg! setImmediate also was called'));
  fs.readFile(__filename, () => {
      console.log('omg! file read complete callback was called!');
  });
  
  console.log('started');
}

// test1()

function test2(params) {
  const start = process.hrtime();
  
  setTimeout(() => {
      const end = process.hrtime(start);
      console.log(`timeout callback executed after ${end[0]}s and ${end[1]/Math.pow(10,9)}ms`);
  }, 1000);
}

// test2()

function test3(params) {
  setTimeout(function() {
    console.log('setTimeout')
}, 0);
setImmediate(function() {
    console.log('setImmediate')
});
setTimeout(function() {
  console.log('setTimeout')
}, 0);
}
// the output of this program can never be guaranteed! 
/*
This is because setting a timer with zero expiration time can never assure that the timer 
callback will be called exactly after zero seconds. Due to this reason, when the event loop starts 
it might not see the expired timer immediately. Then the event loop will move to the I/O phase 
and then to the immediates queue. 
Then it will see that there is an event in the immediates queue and it will process it.
*/
// test3()
/*
setTimeout
setImmediate
setTimeout
yanlideMacBook-Pro:src yanli$ node event-loop.js 
setTimeout
setTimeout
setImmediate
*/
// new Array(10).fill('').map(test3)
/*
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setTimeout
setImmediate
setImmediate
setImmediate
setImmediate
setImmediate
setImmediate
setImmediate
setImmediate
setImmediate
setImmediate
*/

// the immediate callback will be definitely called before the timer callback.
function test4(params) {
  fs.readFile('./curry.js', () => {
    setTimeout(() => {
        console.log('timeout')
    }, 0);
    setImmediate(() => {
        console.log('immediate')
    })
});
}

// test4()
/*
At the start, this program reads the current file asynchronously using fs.readFile function, 
and it provides a callback to be triggered after the file is read.
Then the event loop starts.

Once the file is read, it will add the event (a callback to be executed) in the I/O queue in the event loop.

Since there are no other events to be processed, Node is waiting for any I/O event. It will then see the file 
read event in the I/O queue and will execute it.

During the execution of the callback, a timer is added to the timers heap and an immediate is added to the 
immediates queue.

Now we know that the event loop is in I/O phase. Since there are no any I/O events to be processed, 
the event loop will move to the immediates phase where it will see the immediate callback added during 
the execution of file read callback. Then the immediate callback will be executed.

In the next turn of the event loop, it will see the expired timer and it will execute the timer callback.
*/

// 3 immediates 5 timer callbacks 5 next tick callbacks
function test5(params) {
  setImmediate(() => console.log('this is set immediate 1'));
setImmediate(() => console.log('this is set immediate 2'));
setImmediate(() => console.log('this is set immediate 3'));

setTimeout(() => console.log('this is set timeout 1'), 0);
setTimeout(() => {
    console.log('this is set timeout 2');
    process.nextTick(() => console.log('this is process.nextTick added inside setTimeout'));
}, 0);
setTimeout(() => console.log('this is set timeout 3'), 0);
setTimeout(() => console.log('this is set timeout 4'), 0);
setTimeout(() => console.log('this is set timeout 5'), 0);

process.nextTick(() => console.log('this is process.nextTick 1'));
process.nextTick(() => {
    process.nextTick(console.log.bind(console, 'this is the inner next tick inside next tick'));
});
process.nextTick(() => console.log('this is process.nextTick 2'));
process.nextTick(() => console.log('this is process.nextTick 3'));
process.nextTick(() => console.log('this is process.nextTick 4'));
}

// test5()

/*
When the event loop starts, it will notice the next tick queue and will start processing the next tick callbacks. 
During the execution of the second next tick callback, a new next tick callback is added to the end of the next 
tick queue and will be executed at the end of the next tick queue.

Callbacks of the expired timers will be executed. Inside the execution of the second timer callback, 
an event is added to the next tick queue.

Once callbacks of all the expired timers are executed, the event loop will then see that there is one event 
in the next tick queue (which was added during the execution of the second timer callback). 
Then the event loop will execute it.

Since there are no I/O events to be processed, the event loop will move to the immediates phase and will 
process the immediates queue.

this is process.nextTick 1
this is process.nextTick 2
this is process.nextTick 3
this is process.nextTick 4
this is the inner next tick inside next tick
this is set timeout 1
this is set timeout 2
this is process.nextTick added inside setTimeout
this is set timeout 3
this is set timeout 4
this is set timeout 5
this is set immediate 1
this is set immediate 2
this is set immediate 3
*/

function test6(params) {
  Promise.resolve().then(() => console.log('promise1 resolved'));
Promise.resolve().then(() => console.log('promise2 resolved'));
Promise.resolve().then(() => {
    console.log('promise3 resolved');
    process.nextTick(() => console.log('next tick inside promise resolve handler'));
});
Promise.resolve().then(() => console.log('promise4 resolved'));
Promise.resolve().then(() => console.log('promise5 resolved'));
setImmediate(() => console.log('set immediate1'));
setImmediate(() => console.log('set immediate2'));

process.nextTick(() => console.log('next tick1'));
process.nextTick(() => console.log('next tick2'));
process.nextTick(() => console.log('next tick3'));

setTimeout(() => console.log('set timeout'), 0);
setImmediate(() => console.log('set immediate3'));
setImmediate(() => console.log('set immediate4'));
}

// test6()

/*
next tick1
next tick2
next tick3
promise1 resolved
promise2 resolved
promise3 resolved
promise4 resolved
promise5 resolved
next tick inside promise resolve handler
set timeout
set immediate1
set immediate2
set immediate3
set immediate4
*/

/**
 * Handing IO
**/
