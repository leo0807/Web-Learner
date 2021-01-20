function myTimeout(fn, time, ...args){
  const start = +new Date();
  let timer, now;
  const loop = () =>{
    timer = window.requestAnimationFrame(loop);

    now = new Date();
    if(now - start >= time){
      fn(...args);
      window.cancelAnimationFrame(timer);
    }
  }
  window.requestAnimationFrame(loop);
}
function myExample(){
  console.log('tttttt');
}
myTimeout(myExample, 1000);

function myNew(obj, ...args){
  if(typeof obj !== 'function'){
    throw new Error('Not a function');
  }
  const newObj = Object.create(Object.prototype);
  const res = obj.call(newObj, ...args);
  return typeof res === 'object'? res: newObj;
}

function Parent(){
  this.name = 'zjx';
  this.play = [1,2,3];
}
function Child(){
  Parent.call(this);
  this.run = 'run';
}
Child.prototype = Object.create(Child.prototype);
Child.prototype.constructor = Child;

function debounce(fn, delay){
  let timer = null;
  return function(){
    if(timer){
      clearTimout(timer);
    }
    timer = setTimeout(()=>{
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  }
}
function throttle(fn, delay){
  let timer = null;
  return function(){
    if(timer) return;
    timer = setTimeout(()=>{
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  }
}

Function.prototype.myCall = function(thisArg, ...args){
  if(thisArg === null || thisArg ==  undefined){
    thisArg = window;
  }
  const specialMethod = Symbol();
  thisArg[specialMethod] = this;
  let res = thisArg[specialMethod](...args);
  delete thisArg[specialMethod];
  return res;
}

Function.prototype.myApply = function(thisArg, ...args){
  if(thisArg === undefined || thisArg === undefined){
    thisArg = window;
  }
  const fn = Symbol();
  thisArg[fn] = this;
  let res;
  if(Array.isArray(args)){
    res = thisArg[fn](...args);
  }else{
    res = thisArg[fn]();
  }
  delete thisArg[fn];
  return res;
}

Function.prototype.myBind = function(objcThis, ...args){
  let thisFn = this;
  let funcForBind = function(...secondArgs){
    const isNew = this instanceof funcForBind;
    let thisArg = isNew? this: objcThis;
    return thisFn.call(thisArg, ...args, ...secondArgs);
  }
  funcForBind.prototype = Object.create(thisFn.prototype);
  return funcForBind;
}

function add(){
  let args = Array.prototype.slice.call(arguments);
  let _add = function(){
    args.push(...arguments);
    return _add;
  }
  _add.toString = function(){
    return args.reduce(function(a, b){
      return a + b;
    })
  }
  return _add;
}

function myInstanceof(left, right){
  if(typeof left !== 'object' || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while(true){
    if(proto == null) return false;
    if(proto === right.prototype) return true;
    proto = Object.getPrototypeOf(left);
  }
}


const xhr = new XMLHttpRequest();
const url = "";
xhr.open("GET",  url, false);
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4 && xhr.status === 200) {
    console.log(true);
  }else{
    console.log(fasle);
  }
}
xhr,send(null);

class EventEmitter{
  constructor(){
    this.events = {};
  }
  on(eventName, callback){
    if(!this.events[eventName]){
      this.events = [callback];
    }else{
      this.events[eventName].push(callback);
    }
  }

  emit(eventName){
    this.events[eventName] && this.events[eventName].forEach((callback, i) => {
      callback();
    });
  }

  removeListener(eventName, callback){
    if(this.events[eventName]){
      this.events[eventName].filter(func => func !== callback);
    }
  }

  once(eventName, callback){
    let fn = () =>{
      callback();
      this.removeListener(eventName, callback);
    }

    this.on(eventName, fn);
  }
}

class Subject{
  constructor(){
    this.state = 0;
    this.observers = [];
  }
  getState(){
    return this.state;
  }
  setState(state){
    this.state = state;
    this.notifyAll();
  }
  notifyAll(){
    this.observers.forEach((observer, i) => {
      observer.update();
    });
  }
  attach(observer){
    this.observers.push(observer);
  }
}

class Observer{
  constructor(name, subject){
    this.name = name;
    this.subject = subject;
    this.subject.attch(this);
  }
  update(){
    console.log(this.subject.name, this.subject.getState());
  }
}

class Singleten(){
  log(){
    console.log('1231');
  }
}

Singleten.getInstance = (function(){
  let instance;
  return funciton(){
    if(!instance){
      instance = new Singleten();
    }
    return instance;
  }
})()
function race(promises){
  return new Promise((resolve, reject)=>{
    promises.map(promise => {
      promise.then(val => {
        resolve(val);
      },
      reason => {
        reject(reason);
      }
    )
    })
  })
}

function all(promises){
  let values = [];
  return new Promise((resolve, reject)=>{
    promises.forEach(promise => promise.then(value => {
      values.push(value);
      if(values.length === promises.length){
        resolve(values);
      }
    },
    reason=>{
      reject(reason)
    }
  ))
  })
}
