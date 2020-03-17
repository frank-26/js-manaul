class ObserverList {
  constructor() {
    this.observerList = [];
  }

  add(obj) {
    return this.observerList.push(obj);
  }

  count() {
    return this.observerList.length;
  }

  get(index) {
    if (index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
  }

  indexOf(obj, startIndex) {
    let i = startIndex;

    while (i < this.observerList.length) {
      if (this.observerList[i] === obj) {
        return i;
      }
      i++;
    }

    return -1;
  }

  removeAt(index) {
    this.observerList.splice(index, 1);
  }
}

class Subject {
  constructor() {
    this.observers = new ObserverList();
  }

  addObserver(observer) {
    this.observers.add(observer);
  }

  removeObserver(observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
  }

  notify(context) {
    const observerCount = this.observers.count();
    for (let i = 0; i < observerCount; i++) {
      this.observers.get(i).update(context);
    }
  }
}

class PubSub {
  constructor() {
    this.topics = {};
    // A topic identifier
    this.subUid = -1;
  }

  publish(topic, args) {
    //  集散中心
    if (!this.topics[topic]) {
      return false;
    }

    const subscribers = this.topics[topic];
    let len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return this;
  }

  subscribe(topic, func) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    const token = (++this.subUid).toString();
    this.topics[topic].push({
      token,
      func,
    });
    return token;
  }

  unsubscribe(token) {
    for (const m in this.topics) {
      if (this.topics[m]) {
        for (let i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);

            return token;
          }
        }
      }
    }
    return this;
  }
}

const pubsub = new PubSub();