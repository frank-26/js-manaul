//根据现有对象，创建其一实例。
function create(proto) {
    function F() {}
    F.prototype = proto;
  
    return new F();
  }
  
  // test 
  const o = {a:1}
  create(o).__proto__ === o // true