class Iterator{
    constructor(container){
        this.list = container.list;
        this.index = 0;
    }
    next(){
        if(this.hasNext()){
            return this.list[this.index++];
        }
        return null;
    }
    hasNext(){
        if(this.index >= this.list.length){
            return false;
        }
        return true;
    }
}
class Container{
    constructor(list){
        this.list = list;
    }
    // Generate Iterator
    getIterator(){
        console.log(this);
        return new Iterator(this);
    }
}
var arr = [1,2,3,4];
const container = new Container(arr);
const iterator = container.getIterator();
while(iterator.hasNext()){
    console.log(iterator.next());
}

function each(data){
    let iterator = data[Symbol,iterator]();

    let item = {done: false};
    while(!item.done){
        item = iterator.next();
        if(!item.done){
            console.log(item.value);
        }
    }
}
// for of Syntax => Iterato