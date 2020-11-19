class Circle{
    draw(){
        console.log('Draw a circle');
    }
}

class Decorator{
    constructor(circle){
        this.circle = circle;
    }
    draw(){
        this.circle.draw();
        this.setRedBorder(circle);
    }
    setRedBorder(circle){
        console.log('Set a red border');
    }
}
let circle = new Circle();
circle.draw();

let dec = new Decorator(circle);
dec.draw();
// ES7 Decorator
// core-decorators
