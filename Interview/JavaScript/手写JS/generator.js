// Normal generator function
// function* webCanteenGenerator() {
//     yield '店小二儿，给我切两斤牛肉来';
//     yield '再来十八碗酒';
//     return '好酒！这酒有力气！';
// }

// var canteen = webCanteenGenerator();
// canteen.next();
// canteen.next();
// canteen.next();
// canteen.next();

// {value: "店小二儿，给我切两斤牛肉来", done: false}
// {value: "再来十八碗酒", done: false}
// {value: "好酒！这酒有力气！", done: true}
// {value: undefined, done: true}


// Implmented generator function

function myWebCanteenGenerator(list) {
    let index = 0;
    let length = list.length;
    return {
        next: function () {
            let done =  index  < length ;
            let value = done? list[index++]: undefined;
            // return {
            //     value: value,
            //     done:done
            // }
            return value;
        }
    }
}

var canteen = myWebCanteenGenerator(['道路千万条', '安全第一条', '行车不规范', '亲人两行泪 ']);

console.log(canteen.next())
console.log(canteen.next())
console.log(canteen.next())