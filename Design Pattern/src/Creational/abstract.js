/** 
抽象工厂模式与工厂模式类似，不同的是它提供了一个构造函数来创建相关对象系列。
它是抽象的，这意味着它不指定具体的类或构造函数。
适用于：
1. 需要重用或共享对象的应用程序
2. 具有复杂逻辑的应用程序，因为它们有多个需要一起使用的相关对象系列
3. 对象缓存
4. 当对象创建过程要对客户端屏蔽时
*/

function HomeLoan(amount,duration){
  this.amount = amount
  this.interest = 0.08
  this.duration = duration
  this.calculateInterest = function(){
    return this.amount*this.interest*this.duration
  }
}

function StudentLoan(amount,duration){
  this.amount = amount
  this.interest = 0.03
  this.duration = duration
  this.calculateInterest = function(){
    return this.amount*this.interest*this.duration
  }
}

function PersonalLoan(amount,duration){
  this.amount = amount
  this.interest = 0.05
  this.duration = duration
  this.calculateInterest = function(){
    return this.amount*this.interest*this.duration
  }
}

function Loans(){
  this.getloan = function(type,amount,duration){
    var loan;
    switch(type){
      case 'home':
        loan = new HomeLoan(amount,duration)
        break;
      case 'student':
        loan = new StudentLoan(amount,duration)
        break;
      case 'personal':
        loan = new PersonalLoan(amount,duration)
        break;
      default :
        loan = null
        break;
    }
    return loan
  }
}

var loan = new Loans()
 
var homeLoan = loan.getloan('home',3200,5)
console.log(homeLoan.calculateInterest())
 
var studentLoan = loan.getloan('student',1800,4)
console.log(studentLoan.calculateInterest())
 
var personalLoan = loan.getloan('personal',1200,2)
console.log(personalLoan.calculateInterest())