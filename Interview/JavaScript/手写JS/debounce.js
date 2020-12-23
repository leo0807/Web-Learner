// 监听输入框，用户输入结束或暂停时候才出发

function debounce(fn, delay) {
    // timer在闭包中
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null;
        }, delay)
    }
}