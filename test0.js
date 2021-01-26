class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, callback)
}

let res = [];
function flat(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flat(arr[i]);
    } else {
      res.push(arr[i]);
    }
  }
}