// 补气参数才能正常调用
function curry(fn, args=[]) {
    return function(){
        newArgs = [...args,...arguments];
        if (newArgs.length < fn.length) {
            return curry.call(this,fn,newArgs);
        }else{
            return fn.apply(this,newArgs);
        }
    }
}

// or 柯里化函数通过构造参数数量相关的递归，当参数传入不足时返回一个新函数，
// 并持久化之前传入的参数，最后当参数齐全后一次性调用函数
function currying(fn) {
  const numParamsRequired = fn.length;
  function curryFactory(params) {
    return function (...args) {
      const newParams = params.concat(args);
      if (newParams.length >= numParamsRequired) {
        return fn(...newParams);
      }
      return curryFactory(newParams);
    }
  }
  return curryFactory([]);
}

function multiFn(a, b, c) {
    return a * b * c;
}

var multi = curry(multiFn);

multi(2)(3)(4);
//multi(2,3,4);
//multi(2)(3,4);
//multi(2,3)(4);

// ES6
const curry = (fn, arr = []) => (...args) => (
    arg => arg.length === fn.length
      ? fn(...arg)
      : curry(fn, arg)
  )([...arr, ...args])
  
let curryTest=curry((a,b,c,d)=>a+b+c+d)
curryTest(1,2,3)(4) //返回10
curryTest(1,2)(4)(3) //返回10
curryTest(1,2)(3,4) //返回10
  