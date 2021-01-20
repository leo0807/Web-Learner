class MyPromise{
  static PENDING =  'pending';
  static FULLFILLED = 'fullilled';
  static REJECTED = 'rejected';

  constructor(exeuctor){
    this.status = MyPromise.PENDING;
    this.value = null;
    this.callbacks = [];
    try{
      exeuctor(this.resolve, this.reject);
    }catch(error){
      this.reject(error);
    }
  }

  resolve = value => {
    if(this.status === MyPromise.PENDING){
      this.status = MyPromise.FULLFILLED;
      this.value = value;
      setTimeout(()=>{
        this.callbacks.map(callback =>{
          callback.onFullfilled(value);
        })
      })
    }
  }
  reject = reason => {
    if(this.status === MyPromise.PENDING){
      this.status = MyPromise.REJECTED;
      this.value = reason;
      setTimeout(()=>{
        this.callbacks.map(call => {
          callback.onRejected(reason);
        })
      })
    }
  }

  then = (onFullfilled, onRejected)=> {
    if(typeof onFullfilled !== 'function'){
      onFullfilled = () => {return this.value};
    }

    if(typeof onRejected !== 'function'){
      onRejected = () => throw Error(this.value);
    }
    let promise = MyPromise((resolve, reject)=>{
      if(this.status === MyPromise.FULLFILLED){
        setTimeout();
      }
    })
  }

  parse = (promise, result, resolve, reject) => {
    if(promise === result){
      throw TypeError('chaining cycle dected');
    }
    try{
      if(result instanceof  MyPromise){
        result.then(resolve, reject);
      }else{
        resolve(result);
      }
    }catch(error){
      reject(error);
    }
  }


  all =  (promises) => {
    let values = [];
    return MyPromise((resolve, reject) => {
      promises.forEach((promise, i) => {
        promise.then(value=>{
          values.push(value);
          if(values.length === promises.length){
            resolve(values);
          }
        }, reason=>{
          reject(reason);
        })
      });
    })
  }

  race = promises=> {
    return new MyPromise((resolve, reject)=>{
      promises.map(promise=>{
        promise.then(value=> resolve(value),
                      reason => reject(reason))
      })
    })
  }

  raceAll = async promises =>{
    const success = Array.from(promises).map(promise =>{
      Promise.resolve(promise).then(val => resolve(val)).catch(err=> reject(err));
    })
    return await Promise.all(success)
  }
}
