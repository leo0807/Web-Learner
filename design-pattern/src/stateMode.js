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

// State Machine Model

import StateMachine from 'javascript-state-machine';
import $ from 'jquery';
var fsm = new StateMachine({
    init: 'Collect',
    transition:[{
        name: 'onStore',
        from: 'Collect',
        to: 'cancle collection'
    },
    {
        name: 'deleteStore',
        from: 'cancle collection',
        to: 'Collect'
    }
    ],
    methods:{
        // Listen Collect
        onDoStore: function(){
            alert('Collect Successful');
            updateText();
        },
        onDeleteStore:function(){
            alert('Cancle Collect');
            updateText();
        }
    }
})
let btn = document.getElementById('btn1');
let $btn = btn;
$btn.click(function(){
    if(fsm.is('Collect')){
        fsm.doStore();
    }else{
        fsm.deletStore()
    }
})
function updateText(){
    $btn.text(fsm.state);
}

updateText();

// Simple Promise

var fsm = new StateMachine({
    init: 'pending', //Iinitialization
    transition: [{
        name: 'resolve', //Event Name
        from: 'pending',
        to: 'fullfilled'
    },
    {
        name: 'reject',
        from: 'pending',
        to: 'rejected'
    }],
    methods:{
        onResolve: function(state, data){
            // state => current fsm instance ; data - fsm.resolve(xxx)  the excuted parameters 
            data.successList.forEach(fn => fn());
        },
        onReject:function(state, data){
            // data - fsm.reject(xxx)  the excuted parameters 
            data.failList.forEach(fn => fn());
        }
    }
})

class MyPromise{
    constructor(fn){
        this.successList = [];
        this.failList = []
        fn(function (){
            // resolve method
            fsm.resolve(this);
        }, function(){
            // reject method
            fsm.reject(this);
        })
    }
    then(successFn, failFn){
        this.successList.push(successFn);
        this.failList.push(failFn);
    }
}

// Test code
function loadImg(src){
    const promise = new Promise(function(resolve, reject){
        let img = document.createElement('img');
        img.onload = function(){
            resolve(img);
        }
        img.onerror = function(){
            reject(img);
        }
        img.src = src;
    })
    return promise;
}
let src = '';
let result = loadImg(src);

result.then(function(){
    console.log('ok1');
}, function() {
    console.log('fail1');
})

result.then(function () {
    console.log('ok2');
},function () {
    console.log('fail2');
})