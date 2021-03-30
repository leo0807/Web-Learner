function isPrime(num) {
  return !/^.?$|^(..+?)\1+$/.test(Array(num + 1).join("1"));
}

function getSum(arr) {
  if (arr.length === 0) {
    return 0
  }
  return arr.shift() + getSum(arr);
}
// console.log(getSum([1, 2, 3, 4, 5, 6, 7]));

function spReduce(arr) {
  return arr.reduce((prev, curr) => {
    return Array.isArray(curr) ? prev + spReduce(curr) : prev + curr;
  }, 0);
}
// let arr1 = [1, 2, 3, [[4, 5], 6], 7, 8, 9];
// console.log(spReduce(arr1));

function flatRmDuplicate(arr) {
  return [...new Set(flatten(arr))].sort((a, b) => a - b);
}

function flatten(arr) {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}

// let arr2 = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// console.log(flatRmDuplicate(arr2));
function add(x) {
  return function (...args) {
    return [x, ...args].reduce((prev, curr) => prev + curr, 0);
  };
}

Function.prototype.myCall = function (context = window, ...args) {
  if (context === Function.prototype) return undefined;
  const fn = Symbol();
  context[fn] = this;
  let res = context[fn](...args)
  delete context[fn];
  return res;
}

// console.log(Math.max.myCall(Math, 7, 2, 3, 4, 5));


// var a = 10
// var obj = {
//   a: 20,
//   say: () => {
//     console.log(this.a)
//   }
// }
// obj.say()
// var anotherobj = { a: 30 }
// obj.say.apply(anotherobj)



// function foo() {
//   console.log(this.a);
// }

// function doFoo() {
//   foo();
// }

// var obj = {
//   a: 1,
//   doFoo: doFoo
// };

// var a = 2;
// obj.doFoo()




// 引用一个未声明的变量
// function Bar() {
//   baz = 42; // it's ok
// }
// const bar = new Bar();

let str1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let res = "";
function fillHead(num) {

  while (num > 25) {
    let first = Math.floor(num / 26) - 1;

    res += str[first];
    num = Math.floor(num / 26);
  }
  if (num >= 0) res += str[num];
  return res;
}

function getStr(num) {
  if (num >= 0 && num <= 25) {
    return str1[num];
  } else {
    return getStr(Math.floor(num / 26) - 1) + getStr(num % 26);
  }
}

// console.log(fillHead(700), fillHead(72), fillHead(25));
// console.log(getStr(702), getStr(703), getStr(72), getStr(25));
// function f1() {

//   var n = 999;

//   nAdd = function () { n += 1 }

//   function f2() {
//     console.log(n);
//   }

//   return f2;

// }

// var result = f1();

// result();

// nAdd();

// result();


// function Parent() {
//   this.a = 'Parent'
// }

// function Child() {
//   this.a = 'Child'
// }

// Function.prototype.print = function () {
//   console.log(this.a)
// }

// Parent.print()
// Child.print()

// var p = new Parent()
// p.print()

function solver(nums) {
  let first = nums.reduce((prev, curr) => prev + curr, 0);
  let len = nums.length
  let res = 0
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (i === j) continue;
      res += (nums[i] | nums[j]);
    }
  }
  return res + first;
}
console.log(solver([]));