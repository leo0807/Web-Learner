// 对于前端项目开发过程中，偶尔会出现层叠数据结构的数组，我们需要将多层级数组转化为一级数组（即提取嵌套数组元素最终合并为一个数组），使其内容合并且展开。那么该如何去实现呢？
// 需求:多维数组=>一维数组

let ary1 = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(ary1);

function flat(arr) {
  const isDeep = arr.some(itme => item instanceof Array);
  if (!isDeep) return arr;
  const res = Array.prototype.concat.apply([], arr);
  return flat(res);
}

// 1. 调用ES6中的flat方法

ary1 = ary1.flat(Infinity);



// 2. replace + split

ary1 = str.replace(/(\[|\])/g, '').split(',')



// 3. replace + JSON.parse

str = str.replace(/(\[|\])/g, '');
str = '[' + str + ']';
ary1 = JSON.parse(str);



// 4. 普通递归

let result = [];
// @ts-ignore
let fn = function (ary) {
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (Array.isArray(ary[i])) {
      fn(item);
    } else {
      result.push(item);
    }
  }
}


// 5. 利用reduce函数迭代

function flatten(ary) {
  return ary.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))



// 6. 扩展运算符

//只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}

// 7.层数

function flatLevel(arr, level) {
  return level > 0 ?
    arr.reduce((prev, curr) => {
      return prev.concat(Array.isArray(curr) ? flatLevel(curr, level - 1) : curr);
    }, []) :
    arr.slice();
}

const arrL = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, ["string", { type: "对象" }]];
console.log(flatLevel(arrL, 4));

Array.prototype.transfer = function (depth) {
  let res = [];
  let arr = this;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      let tmpDepth = depth;
      while (tmpDepth > 1 && Array.isArray(arr[i])) {
        arr[i] = [].concat(...arr[i]);
        tmpDepth--;
      }
      res.push(...arr[i]);
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}