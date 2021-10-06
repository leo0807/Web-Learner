/**
建造者模式适用于通过构建简单型的对象来构造出复杂的对象，通过灵活的方式来一步步进行构建；
一个很好的例子是 DOM，您可能需要在其中创建大量节点和属性。如果您正在构建一个复杂的 DOM 对象，构建过程可能会变得非常混乱。在这种情况下，可以使用构建器模式。
 */

 function Meal() {
  this.make = function(builder){
    builder.step1();
    builder.step2();
    builder.step3();
    builder.step4();
    return builder.get();
  }
}
 
function MealBuilder(pattie,side,soda) {
   this.meal = null;
   this.step1 = function() {
        this.meal = new Order();
    };
 
    this.step2 = function() {
        this.meal.addBurger(pattie);
    };

    this.step3 = function(){
      this.meal.addSide(side);
    }
    
    this.step4 = function(){
      this.meal.addSoda(soda);
    }
 
    this.get = function() {
        return this.meal;
    };
}
 
function Order() {
    this.burger = null;
    this.side = null;
    this.soda = null; 
 
    this.addBurger = function(pattie) {
        this.burger = pattie;
    };
 
    this.addSide = function(side) {
        this.side = side;
    };

    this.addSoda = function(soda){
      this.soda = soda;
    }

    this.display = function(){
      console.log(`You meal has a ${this.burger} burger, ${this.side} on the side, and a ${this.soda}.`)
    }
}
 
var meal = new Meal();
var mealBuilder = new MealBuilder("chicken","curly fries","coke");
var chickenBurgerMeal = meal.make(mealBuilder);
chickenBurgerMeal.display();   


function Assignment() {
  this.make = function(builder){
    builder.step1();
    builder.step2();
    builder.step3();
    builder.step4();
    return builder.get();
  }
}
 
function AssignmentBuilder(subject,level,dueDate) {
   this.assignment = null;
   this.step1 = function() {
        this.assignment= new Task();
    };
 
    this.step2 = function() {
        this.assignment.addSubject(subject);
    };

    this.step3 = function(){
      this.assignment.addLevel(level);
    }
    
    this.step4 = function(){
      this.assignment.addDuedate(dueDate);
    }
 
    this.get = function() {
        return this.assignment;
    };
}
 
function Task() {
    this.subject = null;
    this.level = null;
    this.dueDate = null; 
 
    this.addSubject = function(subject) {
        this.subject = subject;
    };
 
    this.addLevel = function(level) {
        this.level = level;
    };

    this.addDuedate = function(dueDate){
      this.dueDate = dueDate;
    }

    this.announcement = function(){
      console.log(`Your ${this.subject} assigment is: ${this.level}. It is due on ${this.dueDate}.`)
    }
}
 
var assignment = new Assignment();
var assignmentBuilder = new AssignmentBuilder("Math","Hard","12th June, 2020");
var mathAssignment = assignment.make(assignmentBuilder);
mathAssignment.announcement(); 