function asyncPool(poolLimit, arr, iteratorFn){
    let i = 0;
    const res = [];
    const executing = [];
    const enqueue = function(){
        if(i === arr.length){
            return Promise.resolve();
        }
        const item = arr[i++];
        const p = Promise.resolve().then(()=>iteratorFn(item, arr));
        // 放入promises数组
        res.push(p);
        // promise执行完毕之后，从数组中剔除
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        // 插入executing， 表示正在执行的promise
        executing.push(e);
        // 使用Promise.race，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
        let r = Promise.resolve();
        if(executing.length >= poolLimit){
            r = Promise.race(executing);
        }
        // 递归 直到遍历玩arr
        return r.then(()=>enqueue());
    }
    return enqueue().then(()=> Promise.all(res));
}

//从array第1个元素开始，初始化promise对象，同时用一个executing数组保存正在执行的promise
//不断初始化promise，直到达到poolLimt
//使用Promise.race，获得executing中promise的执行情况，当有一个promise执行完毕，继续初始化promise并放入executing中
//所有promise都执行完了，调用Promise.all返回
// ————————————————
// 版权声明：本文为CSDN博主「上天注定的姻缘最大嘛！」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/qq_38876038/article/details/110132345

const timeout = i => new Promise(resolve=>setTimeout(()=>resolve(i), i));
return asyncPool(2, [1000, 5000, 3000, 4000], timeout).then(res=>{

});