import {deprecate, readonly} from 'core-decorators';

class Person{
    @readonly
    name(){
        return 'Junxu';
    }
    @deprecate
    facepalm(){}
}
let p = new Person();
alert(p.name());
