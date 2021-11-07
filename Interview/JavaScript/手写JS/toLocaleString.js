function getNumber(val){
  if(val){
    return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }else{
    return '0.00';
  }
}

// console.log(getNumber('123.456'));
// console.log(getNumber(1423.456));
function getToLocaleString(num){
  num = typeof num === 'number'? num : Number(num);
  console.log(typeof num);
  let [int, points] = num.toFixed(2).split('.');
  int = int.split('').reverse();
  for(let i = 0; i < int.length; i += 2){
    if(i % 3 === 2) int[i] = int[i];
  }
  int = int.reverse()
  if(int[0] === ',') int[0].shift();
  if(int[1] === ',') int.splice(1,1);
  int = int.join('');
  return int + '.' + points;
}
console.log(getToLocaleString('-122212233'));