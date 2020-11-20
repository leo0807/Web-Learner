const prototype = {
    getName: function(){
        return this.first + ' ' +this.last;
    },
    say: function(){
        alert('Hello');
    }
}

let x = Object.create(prototype);
x.first = 'A';
x.last = 'B';
alert(x.getName());
x.say();

let y = Object.create(prototype);
y.first = 'C';
y.last = 'D';
alert(y.getName());
y.say();