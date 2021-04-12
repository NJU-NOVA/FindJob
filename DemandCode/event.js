class EventEmitter {
  constructor() {
    this.handler = {};
  }
  on(eventName, cb) {
    this.handler = this.handler || {};
    this.handler[eventName] = this.handler[eventName] || [];
    this.handler[eventName].push(cb);
  }
  emit(eventName, ...args) {
    if (!this.handler[eventName]) {
      throw `Event ${eventName} hasn't been register`;
    }
    this.handler[eventName].forEach((cb) => cb.call(null, ...args));
  }
  off(eventName) {
    if (!this.handler[eventName]) {
      throw `Event ${eventName} hasn't been register`;
    }
    this.handler[eventName] = undefined;
  }
}

let e = new EventEmitter();
e.on("f", (name, id) => {
  console.log(name, id);
});
e.emit("f", 1, 2);
