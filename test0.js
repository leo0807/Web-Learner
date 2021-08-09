Array.prototype.newMap = function (callback) {
  var T, A, k;
  if (this === null) {
    throw new TypeError('this is null or undefined');
  }
  var O = Object(this);
  var len = O.length >>> 0;

  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not a function');
  }

  if (arguments.length > 1) {
    T = arguments[1];
  }

  A = new Array(len);
  k = 0;
  while (k < len) {
    var kValue, mappedValue;
    if (k in O) {

      kValue = O[k];
      mappedValue = callback.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
    k++;
  }

  return A;
}

function flatten(arr) {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? arguments.callee(curr) : curr)
  }, [])
}
function getUnique(str) {
  let map = new Map();
  let res = [];
  for (let i of str) {
    if (map.has(i)) {
      map.delete(i);
    } else {
      map.set(i, 1);
    }
  }
  for (let i of map.keys()) {
    console.log(i);
  }
  return map.values()[0];
}

function extend(target, source) {
  for (var obj in source) {
    target[obj] = source[obj];
  }
  return target;
}

// var obj1 = { a: 1 };
// var obj2 = { b: 2, c: 3 };
// for (var key in obj2) {
//   if (obj2.hasOwnProperty(key) === true) {
//此处hasOwnProperty是判断自有属性，使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问会避免原型对象扩展带来的干扰
//     obj1[key] = obj2[key];
//   }
// }
// console.log(obj1);
// console.log(obj2);

// 合并对象 如果是数组就合并在一起否则就覆盖
var obj1 = {
  a: {
    c: 5,
    b: [2, 3, 4]
  },
  d() {
    console.log(5);
  }
}
var obj2 = {
  a: {
    c: 4,
    b: [5]
  },
  d: 5
}
function mergeObj(obj1, obj2) {
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key) === true) {
      if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
        obj1[key] = obj1[key].concat(obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
}
// console.log(mergeObj(obj1, obj2));

function add(...args) {
  let _add = (...args1) => add(...args1, ...args);
  _add.value = () => args.reduce((prev, curr) => prev + curr);
  return _add;
}
// console.log(add(1, 2, 3)(4)(5).value());
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  const len = nums.length;
  let mid = Math.floor(len / 2);
  let left = nums.slice(0, mid),
    right = nums.slice(mid);
  return mergeSort(sortArray(left), sortArray(right));
};
function mergeSort(left, right) {
  const res = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  while (left.length) res.push(left.shift());
  while (right.length) res.push(right.shift());
  return res;
}
console.log(sortArray([5, 1, 1, 2, 0, 0]));
