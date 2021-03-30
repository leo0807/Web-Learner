// ES5
function sleep(callback, time) {
    if (typeof callback === 'function') {
        setTimeout(callback, time);
    } else {
        throw new Error("xxx");
    }
}
function output() { console.log(1) };
sleep(output, 1000)

// Promise

const sleep2 = time => {
    return new Promise(resolve => setTimeout(resolve, time));
}
sleep2(1000).then(() => console.log(2));

// Async
function sleep3(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
async function output3() {
    let out = await sleep3(1000);
    console.log(1);
    return out;
}
output3();