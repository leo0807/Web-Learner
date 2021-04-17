let compose = function (...args) {
    let len = args.length;
    let count = len - 1;
    return function f1(...s) {
        let res = args[count].apply(this, s);
        if (count <= 0) {
            return res;
        } else {
            count--;
            return f1(res);
        }
    }
}
// const compose = (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)))
const greeting = (first, last) => `hello ${first} ${last}!`
const toUpper = str => str.toUpperCase()
const split = str => str.split(' ')
const fn = compose(split, toUpper, greeting)
console.log(fn('Shopee', 'Team'));
