// 超时取消XHR
function cancelableXHR(URL) {
    let req = new XMLHttpRequest();
    let promise = new Promise(function (resolve, reject) {
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };

        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.onabort = function () {
            reject(new Error('Abort this request'));
        };

        req.send();
    });
    let abort = function () {
        if (req.readyState !== XMLHttpRequest.UNSENT) {
            req.abort();
        }
    };
    return {
        promise: promise,
        abort: abort
    }
}


function delayPromise(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function timeoutPromise(promise, ms) {
    let timeout = delayPromise(ms).then(function () {
        throw new Error('Operation timeout');
    });
    return Promise.race([timeout, promise]);
}

let taskPromise = new Promise(function (resolve) {
    let delay = Math.random() * 2000;
    setTimeout(function () {
        resolve(delay + "ms");
    }, delay);
});

timeoutPromise(taskPromise, 1000).then(function (value) {
    console.log("taskPromise在规定时间内结束 : " + value);
}).catch(function (error) {
    console.log("Timeout!!!", error);
})
