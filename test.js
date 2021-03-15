// function getNum(str, isFilter){
//     isFilter = isFilter || false;
//     if(typeof str === "string"){
//         let arr = str.match(isFilter? /[1-9]\d{0,}/g: /\d{2,}/g);
//         return arr.map(num => Number(num)).sort((a,b)=>a - b);
//     }
// }
// console.log(getNum("He15l154lo87wor7l87d"));


// let len, range, begin = true;
// while(line = readline()){
//     line = line.split(' ');
//     if(begin){
//         begin = false;
//         len = parseInt(line[0]);
//         range = parseInt(line[1]);
//     }
//     else{
//         let arr = new Array(len).fill(0);
//         for(let i = 0; i < len; i++){
//             arr[i] = parseInt(line[i]);
//         }
//         let map = new Map(), start = 0;
//         let maxCount = -Infinity,
//             mostNum;
//         while(start <= len - range){
//             for(let i = start; i < (start + range); i++){
//                 map.set(arr[i],(map.has(arr[i])? map.get(i) + 1: 1));
//                 if(map.get(arr[i]) > maxCount){
//                     maxCount = map.get(arr[i]);
//                     mostNum = arr[i];
//                 }else if(map.get(arr[i]) === maxCount){
//                     mostNum = mostNum < arr[i]? mostNum: arr[i];
//                 }
//             }
//             console.log(mostNum);
//             let tmp = arr.shift();
//             map.set(tmp, map.get(tmp) - 1);
//             start++;
//         }
//     }
// }

//     let arr = [3, 9, 3, 2, 5, 6, 7, 3, 2, 3, 3, 3];
//     const len = arr.length;
//     let map = new Map();
//     for(let i = 0; i < len; i++){
//         map.set(arr[i], map.has(arr[i])? map.get(arr[i]) + 1: 1);
//         if(map.get(arr[i]) >= len / 2){
//             console.log(arr[i]);
//         }
//     }

//     Promise
// .resolve('a')
// .then('b')
// .then(Promise.resolve('c'))
// .then(console.log)

// var readline=require('readline');
// const rl=readline.createInterface({
//  input:process.stdin,
//  output:process.stdout
// })
// rl.on('line',function(line){
//  var arr=line.split(' '),
//  obj={},
//  result=[],
//  k=Math.floor(arr.length/2);
//  for(var i=0;i<arr.length;i++){
//         if(!obj[arr[i]]){
//             obj[arr[i]]=1;
//         }else{
//             obj[arr[i]]++;
//             if(obj[arr[i]]>=k){
//  result.push(arr[i]);
//  }
//  }
//  }
//  console.log(result.join(' '))
// })
    // let line = "abcd12345ed125ss123456789";
    // // let arr = line.split('');
    // const len = line.length;
    // let tmp = [], res = [],
    //     maxLen = -Infinity;
    // for(let i = 0; i < len; i++){
    //     let n = parseInt(line[i])
    //     if(!isNaN(n)){
    //         tmp.push(line[i]);
    //     }else{
    //         if(tmp.length > maxLen){
    //             res = tmp;
    //             maxLen = tmp.length;
    //         }
    //         tmp = [];
    //     }
    // }
    // if(tmp.length > maxLen){
    //     res = tmp;
    // }
    // console.log(res.join(''));

function dfs(n, m, res, k){
    if(m === 0){
        console.log(res.join(' '));
    }
    for(let i = k; k <= n; i++){
        if(i > m) break;
        res.push(i);
        dfs(n, m - i, res, i + 1);
        res.pop();
    }
}
let res = [];
dfs(5, 5, res, 1);