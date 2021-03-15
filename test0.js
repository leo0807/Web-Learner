// const validPalindrome = function(s){
  
//   function isValid(left, right){
//     while (left < right) {
//       if(s[left] !== s[right]){
//         return false;
//       }
//       left++;
//       res--;
//     }
//   }
//   let res = [];
//   let left = 0;
//   let right = s.length - 1;
//   while(left < right){
//     if(s[left] !== s[right]){
//       return isValid(left + 1, right) || isValid(left, right - 1);
//     }
//     res.push(s[left], s[right]);
//     left++;
//     right--;
//   }
//   console.log(1, res);
//   return res.join("");是
// }
//   // let line = "abda";
//   //   let res = validPalindrome(line);
//   //   console.log(res);

//   function compileSeq( input ) {
//     // write code here
//     let map = new Map();
//     for(let i = 0; i < input.length; i++){
//         map.set(i, input[i]);
//     }
//     let findKey = [-1];
//     let res = [];
//     console.log(map);
//     return;
//     while(true){
//         let tmp = [],
//             start = findKey.shift();
//         console.log(start);
//         for(let [key, val] of map){
//           console.log(key, val);
//             if(val === start){
//               console.log(findKey.length === 0, start, findKey[findKey.length - 1] !== key);
//               if(findKey.length === 0 || findKey[findKey.length - 1] !== key){
//                   findKey.push(key);
//                 }
//                 tmp.push(key);
//                 map.delete(key);
//             }
//         tmp.sort((a, b) => a - b);
//         res.push(...tmp);
        
//         if(Object.keys(map).length === 0) break;
//     }
//   }
//     return res;
// }
// let inputs = [1, 2, -1, 1];
// // console.log(compileSeq(inputs));

// function unique(arr) {
//    // 编写代码
//     // const res = [];
//     // arr.forEach(item => {
//     //     if (res.indexOf(item) < 0) res.push(item);
//     // })
//     // return res;
//     let res = [];
//     for(let i = 0, len = arr.length; i < len; i++){
//       if(!res.length) res.push(arr[i]);
//       else{
//         let tmp = true;
//         for(let j of res){
//           if(isEqual(j, arr[i])){
//             tmp = false;
//             break;
//           }
//         }
//         tmp && res.push(arr[i]);
//       }
//     }
//     return res;
// }
// function isObject(obj){
//   return typeof obj == 'object' && obj !== null;
// }
// function isEqual(obj1, obj2){
//   if(!isObject(obj1) || !isObject(obj2)) return obj1 === obj2;
//   if(obj1 === obj2) return true;
//   const obj1KeyArr = Object.keys(obj1);
//   const obj2KeyArr = Object.keys(obj2);
//   if(obj1KeyArr.length !== obj2KeyArr.length) return false;
//   for(let key in obj1){
//     const res = isEqual(obj1[key], obj2[key]);
//     if(!res) return false;
//   }
//   return true;
// }
// // console.log(isEqual([1,2,3], [1,"2",3]));
// const readline = require('readline');
// const rl = readline.createInterface({
//   input:process.stdin,
//   output:process.stdout
// });
// rl.on('line', (line) => {
//   let arr = JSON.parse(line)
//   console.log(unique(arr))
// });

// // [ 123,[1,2,3],[1,"2",3],[1,2,3], "hello", "123", "world", 123 ]

// 链接：https://www.nowcoder.com/questionTerminal/9c4a4e879b4f49939dfaebea8948f976
// 来源：牛客网

// let temp = readline().split(" ");
// let n = parseInt(temp[0]);
// let x = parseInt(temp[1]);//最小值
// let y = parseInt(temp[2]);//最大值
// let arr = [];
// temp = readline().split(" ");
// temp.forEach((item)=>{
//     arr.push(parseInt(item));
// })
// //降序排列
// arr.sort((a,b)=>{
//     return b - a;
// })
// //先找到可以晋级y人的分数线arr[y]
// let cur = y;
// while(cur >=0 ){
//     if(n-cur >= x && n-cur <= y){
//         print(arr[cur]);
//         break;
//     }
//     if(n-cur < x){
//         cur--;//再去判断
//     }
//     if(n-cur > y){
//         print(-1);
//         break;
//     }
// }


var readline = require('readline');
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let row, col, begin = true, rowIndex = 0;
let inputArr;
r1.on('line', function(line){
  let tokens = line.split(' ');
  if(begin){
    row = parseInt(tokens[0]);
    col = parseInt(tokens[1]);
    begin = false;
    inputArr = new Array(row);
  }else{
    inputArr[rowIndex] = [];
    for(let i = 0; i < col; i++){
        inputArr[rowIndex].push(parseInt(tokens[i]));
    }
    rowIndex++;
    if(rowIndex >= row){
      let res = Array.from(new Array(col), ()=>new Array(row).fill(0));
      for(let i = 0; i < row; i++){
          for(let j = 0; j < col; j++){
              res[j][i] = inputArr[i][j];
          }
      }
      console.log(res);
      return;
    }
  }
})

// let data = read_line().split(' ');
// let row = parseInt(data[0]),
//     col = parseInt(data[1]);
// let inputArr = new Array(row);
// let rowIndex = 0
// while(rowIndex < row){
//     inputArr[rowIndex] = [];
//     let tmp = read_line().split(' ');
//     for(let i = 0; i < col; i++){
//         inputArr[rowIndex].push(parseInt(tmp[i]));
//     }
//     rowIndex++;
// }




// let begin = true, row, col, inputArr,rowIndex = 0, line;
// while(line = readline()){
//     line = line.split(' ');
//     if(beigin){
//         row = line[0];
//         col = line[1];
//         begin = false;
//         inputArr = new Array(row);
//     }else{
//         inputArr[rowIndex] = [];
//         let tmp = line.split(' ');
//         for(let i = 0; i < col; i++){
//             inputArr[rowIndex].push(parseInt(tmp[i]));
//         }
//         rowIndex++;
//         if(rowIndex >= row){
//           let res = Array.from(new Array(col), ()=>new Array(row).fill(0));
//           for(let i = 0; i < row; i++){
//               for(let j = 0; j < col; j++){
//                   res[j][i] = inputArr[i][j];
//               }
//           }
//           console.log(res);
//         }
//     }
// }