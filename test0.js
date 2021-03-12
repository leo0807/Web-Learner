const validPalindrome = function(s){
  
  function isValid(left, right){
    while (left < right) {
      if(s[left] !== s[right]){
        return false;
      }
      left++;
      res--;
    }
  }
  let res = [];
  let left = 0;
  let right = s.length - 1;
  while(left < right){
    if(s[left] !== s[right]){
      return isValid(left + 1, right) || isValid(left, right - 1);
    }
    res.push(s[left], s[right]);
    left++;
    right--;
  }
  console.log(1, res);
  return res.join("");是
}
  // let line = "abda";
  //   let res = validPalindrome(line);
  //   console.log(res);

  function compileSeq( input ) {
    // write code here
    let map = new Map();
    for(let i = 0; i < input.length; i++){
        map.set(i, input[i]);
    }
    let findKey = [-1];
    let res = [];
    console.log(map);
    return;
    while(true){
        let tmp = [],
            start = findKey.shift();
        console.log(start);
        for(let [key, val] of map){
          console.log(key, val);
            if(val === start){
              console.log(findKey.length === 0, start, findKey[findKey.length - 1] !== key);
              if(findKey.length === 0 || findKey[findKey.length - 1] !== key){
                  findKey.push(key);
                }
                tmp.push(key);
                map.delete(key);
            }
        tmp.sort((a, b) => a - b);
        res.push(...tmp);
        
        if(Object.keys(map).length === 0) break;
    }
  }
    return res;
}
let inputs = [1, 2, -1, 1];
// console.log(compileSeq(inputs));


window.name = "by";
class A{
  constructor(){
    this.name = 123;
  }
  getName(){
    console.log(this.name);
  }
}
const a = new A();
const fn = a.getName;
fn();