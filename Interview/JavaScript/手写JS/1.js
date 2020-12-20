function mySetInterval(func, milliseconds) {
    function insideFunc() {
        func();
        setTimeout(insideFunc, milliseconds);
    }
    setTimeout(insideFunc, milliseconds);
}

function test() {
    console.log('test');
}
mySetInterval(test, 1000);