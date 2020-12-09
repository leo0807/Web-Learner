class Person{};
const people: Person = new Person();
const sister:() =>string =() =>{return '222';};
const arr:(number | string)[] = [1,'string', 2];
type Lady = {name:string, age: number};
//元组
const ladies: [string,string,number] = ['name', 'address', 22];
interface Girl{
    name:string;
    age:number;
    bust:number;
    wastline?:number;//可有可无
    [propname: string]:any;//任意添加属性
    say():string;
}
interface Teacher extends Girl{};

function join<name>(first:name, second:name){
    return `${first}${second}`;
}