// 原理 CO函数 自动的执行generator
function asyncToGenerator(generatorFunc) {
    // 返回一个新的函数（Promise）
    return function () {
        const gen = generatorFunc.apply(this, arguments);

        return new Promise((resolve, reject) => {
            // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
            // key有next和throw两种取值，分别对应了gen的next和throw方法
            // arg参数则是用来把promise resolve出来的值交给下一个yield

            function step(key, arg) {
                let generatorResult;
            }
        })
    }
}