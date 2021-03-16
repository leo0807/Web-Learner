function toBinary(num, res){
    Math.floor(num / 2) !== 0 && toBinary(Math.floor(num / 2), res);
    res.push(num % 2);
}
let res = [];
toBinary(3, res);
console.log(res.join(""));