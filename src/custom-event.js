class EventEmeitter {
    constructor() {
      this._events = this._events || new Map(); 
      this._maxListeners = this._maxListeners || 10; 
    }
  }
  
  EventEmeitter.prototype.emit = function(type, ...args) {
    let handler;
    handler = this._events.get(type);
    if (Array.isArray(handler)) {
      while (handler.length) {
        const fn = handler.shift()
        fn.apply(this, args);
      }
    } else {
      handler.apply(this, args);
    }
  
    return true;
  };
  
  // 监听名为type的事件
  EventEmeitter.prototype.addListener = function(type, fn) {
    const handler = this._events.get(type); 
    if (!handler) {
      this._events.set(type, fn);
    } else if (handler && typeof handler === "function") {
      this._events.set(type, [handler, fn]);
    } else {
      handler.push(fn); 
    }
  };
  
  EventEmeitter.prototype.removeListener = function(type, fn) {
    const handler = this._events.get(type); 
    if (handler && typeof handler === "function") {
      this._events.delete(type, fn);
    } else {
      let postion;// locate
      for (let i = 0; i < handler.length; i++) {
        if (handler[i] === fn) {
          postion = i;
        } else {
          postion = -1;
        }
      }
      // 如果找到匹配的函数,从数组中清除
      if (postion !== -1) {
        // 找到数组对应的位置,直接清除此回调
        handler.splice(postion, 1);
        // 对齐
        if (handler.length === 1) {
          this._events.set(type, handler[0]);
        }
      } else {
        return this;
      }
    }
  };