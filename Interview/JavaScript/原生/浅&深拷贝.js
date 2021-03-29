// ### 浅拷贝

// 拷贝简单来说就是复制，
// 由于拷贝引用类型的数据（如对象）的时候，往往会导致原始对象和拷贝对象使用同一个引用，进而导致修改拷贝数据时，
// 原始数据也发生了改变，这是拷贝错误的表现，所谓浅拷贝就是说能够成功的拷贝单层的引用类型数据，但是对于嵌套的对象无法完全拷贝。

// 1. 手动实现
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// 2. Object.assign
// 但是需要注意的是，Object.assgin() 拷贝的是对象的属性的引用，而不是对象本身。
let obj = { name: 'sy', age: 18 };
const obj2 = Object.assign({}, obj, { name: 'sss' });
console.log(obj2);//{ name: 'sss', age: 18 }

// 3. concat浅拷贝数组
let arr1 = [1, 2, 3];
let newArr1 = arr1.concat();
newArr1[1] = 100;
console.log(arr1);//[ 1, 2, 3 ]

// 4. slice浅拷贝
let arr2 = [1, 2, 3];
let newArr2 = arr2;
newArr2[0] = 100;
console.log(arr2);//[100, 2, 3]

// 5. ...展开运算符
let arr3 = [1, 2, 3];
let newArr = [...arr3];//跟arr.slice()是一样的效果


// 

function deepCopy(target) {
  let copyObjs = [];
  function _deepCopy(target) {
    if (typeof target !== 'object' || !target) return target;
    for (let i = 0, len = copyObjs.length; i < len; i++) {
      if (copyObjs[i].target === target) {
        return copyObjs[i].copyTarget;
      }
    }

    let obj = {};
    if (Array.isArray(target)) obj = [];
    copyObjs.push({ target: target, copyTarget: obj });
    Object.keys(target).forEach(key => {
      if (obj[key]) { return; }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }
  return _deepCopy(target);
}

// copyed_objs 这个数组存放的是已经递归过的目标对象。在递归一个目标对象之前，
// 我们应该检查这个数组，如果当前目标对象和 copyed_objs 中的某个对象相等，那么不对其递归。