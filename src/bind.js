/*
会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/bind
*/
//  Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
    var slice = Array.prototype.slice;
    Function.prototype.bind = function() {
      var thatFunc = this, thatArg = arguments[0];
      var args = slice.call(arguments, 1);
      if (typeof thatFunc !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - ' +
               'what is trying to be bound is not callable');
      }
      return function(){
        var funcArgs = args.concat(slice.call(arguments))
        return thatFunc.apply(thatArg, funcArgs);
      };
    };
  })();


  //  Yes, it does work with `new funcA.bind(thisArg, args)`
  Function.prototype.bind2 = function(content) {
    if(typeof this != "function") {
        throw Error("not a function")
    }
    // 若没问参数类型则从这开始写
    let fn = this;
    let args = [...arguments].slice(1);
    
    let resFn = function() {
        return fn.apply(this instanceof resFn ? this : content,args.concat(...arguments) )
    }
    function tmp() {}
    tmp.prototype = this.prototype;
    resFn.prototype = new tmp();
    
    return resFn;
}
