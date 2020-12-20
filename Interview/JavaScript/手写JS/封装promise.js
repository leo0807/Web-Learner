// 原方法是一个对象的方法，这个对象对于我来说是黑盒，接受一个回调方法。
// 而我想要一个能够返回promise的方法，从而方便异步操作，因此我进行了封装，在这记录一下

const testEvent = {
    uploadImg: (callback) => {
        setTimeout(callback('uplaodImg'), 1000);
    }
}

const bridge = {
    call: function (method, callback, ...args) {
        return new Promise((resolve, reject) => {
            const realCallBack = (...args) => {
                try {
                    resolve(callback(...args));
                } catch (e) {
                    reject(e);
                }
            }
            const callbackId = window.callBackArr.push(realCallBack) - 1;
            testEvent[method](...args, callbackId);
        })
    }
}

test(image){
    return bridge.call('uploadImg', (res) => console.log(res), 'imagName')
}