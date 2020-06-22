  /**
   * Promise 规范（Promises/A+ ）：
   * Promise的状态
  1. 用new Promise实例化的promise对象有以下三个状态：
    - "has-resolution" Fulfilled: resolve(成功)时。此时会调用 onFulfilled
    - "has-rejection" Rejected: reject(失败)时。此时会调用 onRejected
    - "unresolved" Pending: 既不是resolve也不是reject的状态。也就是promise对象刚被创建后的初始化状态等

  2. Then 方法
    一个 promise 必须提供一个 then 方法以访问其当前值、最终返回值和据因。promise 的 then 方法接受两个参数：promise.then(onFulfilled, onRejected)
    ，onFulfilled 和 onRejected 都是可选参数。

      如果 onFulfilled 不是函数，其必须被忽略
      如果 onRejected 不是函数，其必须被忽略
      
      如果 onFulfilled 是函数：
        当 promise 执行结束后其必须被调用，其第一个参数为 promise 的值
        在 promise 执行结束前其不可被调用
        其调用次数不可超过一次
    如果 onRejected 是函数：
        当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的据因
        在 promise 被拒绝执行前其不可被调用
        其调用次数不可超过一次
   
    onFulfilled 和 onRejected 直到执行环境堆栈尽包含平台代码前不可被调用
    onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值）
    then 方法可以被同一个 promise 调用多次

    当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
    当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调

    then 方法必须返回一个 promise 对象：如promise2 = promise1.then(onFulfilled, onRejected)

      如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决程序：[[Resolve]](promise2, x)
      如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
      如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
      如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
   *  */ 
  
  
  // 判断变量否为function
  const isFunction = variable => typeof variable === 'function'
  // 定义Promise的三种状态常量
  const PENDING = 'PENDING'
  const FULFILLED = 'FULFILLED'
  const REJECTED = 'REJECTED'

  class MyPromise {
    constructor(handle) {
      if (!isFunction(handle)) {
        throw new Error('MyPromise must accept a function as a parameter')
      }
      // 添加状态
      this._status = PENDING
      // 添加值
      this._value = undefined
      // 添加成功回调函数队列
      this._fulfilledQueues = []
      // 添加失败回调函数队列
      this._rejectedQueues = []
      // 执行handle
      try {
        handle(this._resolve.bind(this), this._reject.bind(this))
      } catch (err) {
        this._reject(err)
      }
    }
    // 添加resovle时执行的函数
    _resolve(val) {
      const run = () => {
        if (this._status !== PENDING) return
        // 依次执行成功队列中的函数，并清空队列
        const runFulfilled = (value) => {
          let cb;
          while (cb = this._fulfilledQueues.shift()) {
            cb(value)
          }
        }
        // 依次执行失败队列中的函数，并清空队列
        const runRejected = (error) => {
          let cb;
          while (cb = this._rejectedQueues.shift()) {
            cb(error)
          }
        }
        /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
        if (val instanceof MyPromise) {
          val.then(value => {
            this._value = value
            this._status = FULFILLED
            runFulfilled(value)
          }, err => {
            this._value = err
            this._status = REJECTED
            runRejected(err)
          })
        } else {
          this._value = val
          this._status = FULFILLED
          runFulfilled(val)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(run, 0)
    }
    // 添加reject时执行的函数
    _reject(err) {
      if (this._status !== PENDING) return
      // 依次执行失败队列中的函数，并清空队列
      const run = () => {
        this._status = REJECTED
        this._value = err
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(err)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(run, 0)
    }
    // 添加then方法
    then(onFulfilled, onRejected) {
      const {
        _value,
        _status
      } = this
      // 返回一个新的Promise对象
      return new MyPromise((onFulfilledNext, onRejectedNext) => {
        // 封装一个成功时执行的函数
        let fulfilled = value => {
          try {
            if (!isFunction(onFulfilled)) {
              onFulfilledNext(value)
            } else {
              let res = onFulfilled(value);
              if (res instanceof MyPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                onFulfilledNext(res)
              }
            }
          } catch (err) {
            // 如果函数执行出错，新的Promise对象的状态为失败
            onRejectedNext(err)
          }
        }
        // 封装一个失败时执行的函数
        let rejected = error => {
          try {
            if (!isFunction(onRejected)) {
              onRejectedNext(error)
            } else {
              let res = onRejected(error);
              if (res instanceof MyPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                onFulfilledNext(res)
              }
            }
          } catch (err) {
            // 如果函数执行出错，新的Promise对象的状态为失败
            onRejectedNext(err)
          }
        }
        switch (_status) {
          // 当状态为pending时，将then方法回调函数加入执行队列等待执行
          case PENDING:
            this._fulfilledQueues.push(fulfilled)
            this._rejectedQueues.push(rejected)
            break
            // 当状态已经改变时，立即执行对应的回调函数
          case FULFILLED:
            fulfilled(_value)
            break
          case REJECTED:
            rejected(_value)
            break
        }
      })
    }
    // 添加catch方法
    catch (onRejected) {
      return this.then(undefined, onRejected)
    }
    // finally
    finally(cb) {
      return this.then(
        value => MyPromise.resolve(cb()).then(() => value),
        reason => MyPromise.resolve(cb()).then(() => {
          throw reason
        })
      );
    }
    // 添加静态resolve方法
    static resolve(value) {
      // 如果参数是MyPromise实例，直接返回这个实例
      if (value instanceof MyPromise) return value
      return new MyPromise(resolve => resolve(value))
    }
    // 添加静态reject方法
    static reject(value) {
      return new MyPromise((resolve, reject) => reject(value))
    }
    // 添加静态all方法
    static all(list) {
      return new MyPromise((resolve, reject) => {
        /**
         * 返回值的集合
         */
        let values = []
        let count = 0
        for (let [i, p] of list.entries()) {
          // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
          this.resolve(p).then(res => {
            values[i] = res
            count++
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values)
          }, err => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err)
          })
        }
      })
    }
    // 添加静态race方法
    static race(list) {
      return new MyPromise((resolve, reject) => {
        for (let p of list) {
          // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
          try {
            this.resolve(p).then(res => {
              resolve(res)
            }, err => {
              reject(err)
            })
            break; //跳出循环
          } catch {}
        }
      })
    }
  }


  // NOTE： 获取成功及失败请求的处理

  function getData(api){
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        var ok = Math.random() > 0.5  // 模拟请求成功或失败
        if(ok)
          resolve('get ' + api + ' data')
        else{
          resolve('error')
        }
      },200)
    })
  }
  // 可以根据需要处理所有结果
  function getDatas(arr){
    var promises = arr.map(item => getData(item))
    return Promise.all(promises).then(values => {
      values.map((v,index) => {
        if(v == 'error'){
          console.log('第' + (index+1) + '个请求失败')
        }else{
          console.log(v)
        }
      })
    }).catch(error => {
      console.log(error)
    })
  }
  
  getDatas(['./api1','./api2','./api3','./api4'])
