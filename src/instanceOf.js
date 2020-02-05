// 实例（及其的__proto__）的 __proto__ 是否恒等于构造函数的 prototype
function instanceOf(left,right) {
    let proto = left.__proto__;
    const prototype = right.prototype
    while(true) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__;
    }
}