/*
发布-订阅模式是面向调度中心编程的，而观察者模式则是面向目标和观察者编程的。
前者用于解耦发布者和订阅者，后者用于耦合目标和观察者~
*/
class PubSub {
    constructor() {
        this.subscribers = [];
    }
     
    subscribe(topic, callback) {
        letcallbacks = this.subscribers[topic];
        if(!callbacks) {
            this.subscribers[topic] = [callback];
        } else{
            callbacks.push(callback);
        }
    }
     
    publish(topic, ...args) {
        letcallbacks = this.subscribers[topic] || [];
        callbacks.forEach(callback => callback(...args));
    }
}
 
// 创建事件调度中心，为订阅者和发布者提供调度服务
let pubSub = newPubSub();
// A订阅了SMS事件（A只关注SMS本身，而不关心谁发布这个事件）
pubSub.subscribe('SMS', console.log);
// B订阅了SMS事件
pubSub.subscribe('SMS', console.log);
// C发布了SMS事件（C只关注SMS本身，不关心谁订阅了这个事件）
pubSub.publish('SMS', 'I published `SMS` event');

class Subject {
    constructor() {
        this.observers = [];
    }
 
    add(observer) {
        this.observers.push(observer);
    }
 
    notify(...args) {
        this.observers.forEach(observer => observer.update(...args));
    }
}
 
class Observer {
    update(...args) {
        console.log(...args);
    }
}
 
let ob1 = newObserver();
let ob2 = newObserver();

let sub = newSubject();

sub.add(ob1);
sub.add(ob2);
sub.notify('I fired `SMS` event');
