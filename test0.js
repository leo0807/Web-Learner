function isPrime(num) {
  return !/^.?$|^(..+?)\1+$/.test(Array(num + 1).join("1"));
}


console.log(1);
console.log(Promise.resolve().then(() => console.log(2)));
console.log(3);