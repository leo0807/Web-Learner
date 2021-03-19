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
let arr1 = [1, 2, 3, [[4, 5], 6], 7, 8, 9];
console.log(spReduce(arr1));