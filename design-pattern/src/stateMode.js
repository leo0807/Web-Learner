// State
class State{
    constructor(color){
        this.color = color;
    }
    handle(context){
        console.log(`Turn to ${this.color} light`);
        // State Setting
        context.setState(this)
    }
}

// Main body
class Context{
    constructor(){
        this.state = null;
    }
    // Obtain State
    getState(){
        return this.state;
    }
    setState(state){
        this.state = state;
    }
}

// test
let context = new Context();
let green = new State('green');
let red = new State('red');
let yellow = new State('yellow');

// Light the greem latern
green.handle(context);
console.log(context.getState());
red.handle(context);
console.log(context.getState());
yellow.handle(context);
console.log(context.getState());
// 场景
// 1. 有限状态机
// 2. Promise

