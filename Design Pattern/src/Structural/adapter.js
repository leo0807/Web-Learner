/**
适配器模式
- 将一个类的接口转化为另外一个接口，以满足用户需求，使类之间接口不兼容问题通过适配器得以解决。
当我们需要旧的 API 与新的重构 API 一起工作时，或者当一个对象需要与具有不兼容接口的类合作时，就会使用适配器模式。它还可用于重用类的现有功能。
优点
1. 可以让两个没有关联的类一起使用
2. 提高了类的复用
3. 适配对象，适配库，适配数据
缺点
1. 额外对象的创建，非直接调用，存在一定的开销（且不像代理模式在某些功能点上可实现性能优化)
2. 如果没必要使用适配器模式的话，可以考虑重构，如果使用的话，尽量把文档完善
使用场景
1. Vue的computed
2. 封装第三方SDK
3. 封装旧接口
 */

 //E.g.1
class Adaptee{
    specificRequest(){
        return '德国标准插头';
    }
}

class Target{
    constructor(){
        this.adaptee = new Adaptee();
    }
    request(){
        let info = this.adaptee.specificRequest();
        return `${info} - 转换器 - 中国标准插头`;
    }
}

let target = new Target();
target.request();
// Vue Computed
//旧窗口的代替
// eg. Ajax

//E.g.2
class SimpleEarphones{
  constructor(){
    this.attach = function(){
    console.log("Use Earphones with Type C phone")
  }
  }
  
}

class EarPhoneAdapter extends SimpleEarphones{
  constructor(typeCphone){
    super()
    this.attach = function(){
      typeCphone.attach()
    }
  }
}

class TypeCPhone {
  constructor(){
    this.attach = function(){
     console.log("Earphones attached to Type C phone")
  }
  } 
}

var typeCphone = new TypeCPhone()
var adapter = new EarPhoneAdapter(typeCphone)
adapter.attach()
// E.g.3
// old interface
class TruthAndDare {
  constructor(){
    this.turn = Math.floor(Math.random() * 2) + 1;
  }
  Getturn(){
    if(this.turn == 1){
      this.turn = 2
    }else{
      this.turn = 1
    }
    return this.turn
  }
  playGame(playerOnename,playerTwoname){
    if(this.Getturn() == 1){
      return`${playerOnename}'s turn`
    }else{
      return `${playerTwoname}'s turn`
    }
  }
}

// new interface
class NewTruthAndDare {
  constructor(randomValue){
   this.turn = randomValue;
  }

  newplayGame(playerOnename,playerTwoname){
     //write-your-code-here
     if(this.turn % 2){
       return `${playerTwoname}'s turn`;
     }else{
       return `${playerOnename}'s turn`;
     }
  }
}

// Adapter Class
class Adapter {
  constructor(randomValue){
    //write-your-code-here
    const newGame = new NewTruthAndDare(randomValue);
    this.playGame = function (playerOneName, playerTwoName){
      return newGame.playGame(playerOnename, playerTwoname);
    }
  }
      
}