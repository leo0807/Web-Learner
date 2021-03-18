let lastEffectDependices;
function useEffect(callback, dependices) {
    if (lastEffectDependices) {
        let changed = !dependices.every((item, index) => {
            return item === lastEffectDependices[index];
        })
        if (changed) {
            setTimeout(callback());
            lastEffectDependices = dependices;
        }
    } else {
        setTimeout(callback());
        lastEffectDependices = dependices;
    }
}
// useEffect的调用时机是浏览器渲染结束后执行的，而useLayoutEffect是在DOM构建完成，浏览器渲染前执行的。
let lastLayoutEffectDependices;
function useLayoutEffect(callback, dependices) {
    if (lastLayoutEffectDependices) {
        let changed = !dependices.every((item, index) => {
            return item === lastEffectDependices[index];
        });
        if (changed) {
            Promise.resolve().then(() => callback());
            lastLayoutEffectDependices = dependices;
        }
    } else {
        Promise.resolve().then(() => callback());
        lastLayoutEffectDependices = dependices;
    }
}