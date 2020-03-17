// 创建对象的几种方式
const newObject = {};
const newObject = Object.create(Object.prototype);
const newObject = new Object();
// ES3
// 1. 点语法
newObject.someKey = 'Hello World';
const value = newObject.someKey;
// 2. 中括号
newObject['Some Key'] = 'Hello World';
const value = newObject['Some Key'];
// ES5 语法
// 3. Object.defineProperty
Object.defineProperty(newObject, 'someKey', {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true,
});
const defineProp = (obj, key, value) => {
    const config = {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true,
    };
    Object.defineProperty(obj, key, config);
};
// 使用：
const person = Object.create(Object.prototype);
defineProp(person, 'car', 'Delorean');
defineProp(person, 'dateOfBirth', '1981');
defineProp(person, 'hasBeard', false);
console.log(person);
// Outputs: Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}
// 4. Object.defineProperties
// Set properties
Object.defineProperties(newObject, {
    someKey: {
        value: 'Hello World',
        writable: true,
    },

    anotherKey: {
        value: 'Foo bar',
        writable: false,
    },
});
const driver = Object.create(person);
// Set
defineProp(driver, 'topSpeed', '100mph');
/*
（4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，
作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
*/
Proxy(target, {
    set: function(target, name, value, receiver) {
      var success = Reflect.set(target, name, value, receiver);
      if (success) {
        console.log('property ' + name + ' on ' + target + ' set to ' + value);
      }
      return success;
    }
  });

  var loggedObj = new Proxy(obj, {
    get(target, name) {
      console.log('get', target, name);
      return Reflect.get(target, name);
    },
    deleteProperty(target, name) {
      console.log('delete' + name);
      return Reflect.deleteProperty(target, name);
    },
    has(target, name) {
      console.log('has' + name);
      return Reflect.has(target, name);
    }
  });

/*
静态方法
Reflect对象一共有 13 个静态方法。
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
  */