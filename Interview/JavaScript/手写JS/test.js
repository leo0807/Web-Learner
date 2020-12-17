new Promise(function (resolve, reject){
    console.log('a')
    setTimeout(function(){
        console.log('b')
    })
    resolve()
}).then(() => {
    console.log('c')
})
setTimeout(function () {
    console.log('d')
})
console.log('e')

function Mother(){
    this.name = "Wendy";
    this.age = 18;
    this.skills = function(){
        console.log("cook", "work");
    }
}
function Child(){
    Mother.call(this);
    this.name = "Harry";
    this.play = functio(){
        console.log("play");
    }
}
Child.prototype = Object.create(Mother.prototype);
