// 对象字面量
var myObjectLiteral = {
  variableKey: variableValue,
  functionKey: function () {
  }
};
// IIFE
// Global module
var myModule = (function ( jQ, _ ) {
 
  function privateMethod1(){
      jQ(".container").html("test");
  }

  function privateMethod2(){
    console.log( _.min([10, 5, 100, 2, 1000]) );
  }

  return{
      publicMethod: function(){
          privateMethod1();
      }
  };

// Pull in jQuery and Underscore
})( jQuery, _ );

myModule.publicMethod();

//ES6
let _counter = new WeakMap();
class Module {
    constructor() {
        _counter.set(this, 0);
    }
    incrementCounter() {
        let counter = _counter.get(this);
        counter++;
        _counter.set(this, counter);

        return _counter.get(this);
    }
    resetCounter() {
        console.log(`counter value prior to reset: ${_counter.get(this)}`);
        _counter.set(this, 0);
    }
}

const testModule = new Module();

const myPrivateVar = new WeakMap();
const myPrivateMethod = new WeakMap();

class MyNamespace {
    constructor() {
        // A private counter variable
        myPrivateVar.set(this, 0);
        // A private function which logs any arguments
        myPrivateMethod.set(this, foo => console.log(foo));
        // A public variable
        this.myPublicVar = 'foo';
    }
    // A public function utilizing privates
    myPublicFunction(bar) {
        let privateVar = myPrivateVar.get(this);
        const privateMethod = myPrivateMethod.get(this);
        // Increment our private counter
        privateVar++;
        myPrivateVar.set(this, privateVar);
        // Call our private method using bar
        privateMethod(bar);
    }
}