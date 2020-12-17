function Person(name, age){
    var description = 'test';
    this.getName = function(){
        return name;
    }
    this.setName = function(value){
        name = value;
    }
}
var p = new Person('Bob', 18);
console.log(p.getName());// Bob
p.setName('Jack');
console.log(p.getName());// Jack

// 通过闭包实现