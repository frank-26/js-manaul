function New() {
    const [Func,...args] = [...arguments]
    const instance = {};
    const result = Func.apply(instance, args);

    if (Func.prototype !== null) {
        instance.__proto__ = Func.prototype;
    }
    // 如果 Func 调用后返回的是对象，则直接返回调用结果
    if ((typeof result === "object" || typeof result === "function") && result !== null) {
        return result;
    }
    // 否则返回 instance
    return instance;
}
function A(a,b){return a+b}
const obj = New(A, 1, 2);// equals to
//const obj = new A(1, 2);


/*
new操作符做了这些事：
1. 创建一新对象。
2. 被执行 [[Prototype]]，通过new创建的每个实例将最终被[[Prototype]]链接到这个函数的 prototype 对象上。
3. 使 this 指向新创建的对象。。
4. 如果函数没有返回对象类型 Object，那么 new 表达式中的函数调用将返回该对象引用。
*/