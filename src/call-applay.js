/** Call/Apply:
 1. 将函数设为对象的属性
 2. 执行&删除这个函数
 3. 指定this到函数并传入给定参数执行函数
 4. 如果不传入参数，默认指向为 window
**/

Function.prototype.call2 = function(content = window) {
    content.fn = this;
    const args = [...arguments].slice(1);
    const result = content.fn(...args);
    delete content.fn;
    return result;
}

Function.prototype.apply2 = function(context = window) {
    context.fn = this
    const result;
    // 判断是否有第二个参数
    if(arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

const foo = {
    value: 1
}
function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}
bar.call2(foo, 'black', '18') // black 18 1
bar.apply2(foo, ['black', '18']) // black 18 1
