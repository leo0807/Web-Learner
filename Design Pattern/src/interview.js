class Car{
    constructor(number, name){
        this.number = number;
        this.name = name;
    }
}

class Kuaiche extends Car{
    constructor(number, name){
        super(number, name);
        this.price = 1;
    }
}

class Zhuanche extends Car{
    constructor(number, name){
        super(number, name);
        this.price = 2;
    }
}

class Trip{
    constructor(car){
        this.car = car;
    }
    start(){
        console.log(`Trip is starting, name ${this.car.name}, Car number is ${this.car.number}`);
    }
    end(){
        console.log(`The trip is ended and the price is ${this.car.price * 5}`);
    }
}

// Second Question
class Carmera{
    shot(car){
        return {
            num: car.num,
            inTime: Date.now()
        }
    }
}

class Screen{
    show(car, inTime){
        console.log('Car Number', car.num);
        console.log('Stopping Time', Date.now() - inTime);
    }
}
class Park{
    constructor(floors){
        this.floors = floors || [];
        this.carmera = new Carmera();
        this.screen = new Screen();
        this.carList = {

        };
    }
    in(car){
        const info = this.carmera.shot(car);
        const i = parseInt(Math.random()*100 %100);
        const place = this.floors[0].places[i];
        place.in();
        info.place = place;
        this.carList[car.num] = info;
    }
    out(car){
        const info = this.carList[car.num];
        const place = info.place;
        place.out();
        this.screen.show(car, info.inTime);

        delete this.carList[car.num];
    }
    emptyNum(){
        return this.floors.map(floor =>{
            return `${floor.index} floor has ${floor.emptyPlaceNum()}`;
        })
    }
}

class Floor{
    constructor(index, places){
        this.index = index;
        this.places = places || [];
    }
    emptyPlaceNum(){
        let num = 0;
        this.places.forEach(p => {
            if(p.empty){
                num++;
            }
        });
        return num;
    }
}

class Place{
    constructor(){
        this.empty = true;
    }
    in(){
        this.empty = false;
    }
    out(){
        this.empty = true;
    }
}

const floors = [];
for (let i = 0; i < 3; i++) {
    const place = [];
    for (let j = 0; j < 100; j++) {
        places[j] = new Place();
        
    }
    floors[i] = new Floor(i + 1, places);
    
}
const park = new Park(floors);
const car1 = new Car(100);
const car2 = new Car(200);
const car3 = new Car(300);

console.log('The first car entered');
console.log(park.emptyNum());
park.in(car1);
console.log('The second car entered');
console.log(park.emptyNum());
park.in(car2);

console.log('The first car is leaving');
park.out(car1);
console.log('The second car is leaving');
park.out(car2);

console.log('The third car');