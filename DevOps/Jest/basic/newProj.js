export default class NewProj{
    people(number){
        this.user = number === 1? 'Mary': 'Wendy';
    }
    services(){
        this.help = this.user + ' is comming';
    }
    wait(){
        this.help = this.user + ' is waiting';
    }
}