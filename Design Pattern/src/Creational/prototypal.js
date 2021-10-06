//原型模式，就是创建一个共享的原型，通过拷贝这个原型来创建新的类，用于创建重复的对象，带来性能上的提升
const prototype = {
    getName: function(){
        return this.first + ' ' +this.last;
    },
    say: function(){
        console.log('Hello');
    }
}

let x = Object.create(prototype);
x.first = 'A';
x.last = 'B';
console.log(x.getName());
x.say();

let y = Object.create(prototype);
y.first = 'C';
y.last = 'D';
console.log(y.getName());
y.say();
// 用在实例化对象很复杂或者代价很大的情况（new）
// 使用原型进行复制

const Ninja = function(name) {
  this.points = 100
  this.name = name 
}

Ninja.prototype.punch = function(otherNinja) {
  if(otherNinja.points > 0 && this.points > 0){
    otherNinja.points -= 20
    return `${otherNinja.name}'s points are ${otherNinja.points}`
  }else{
    return `Can't punch ${otherNinja.name}`
  }
  
}

Ninja.prototype.kick = function(otherNinja) {
  if(otherNinja.points > 0 && this.points > 0){
    otherNinja.points -= 50
    return `${otherNinja.name}'s points are ${otherNinja.points}`
  }else{
    return `Can't kick ${otherNinja.name}`
  }
}