let lastCallback;
let lastCallbackDependices;
const useCallback = (callback, dependencies) => {
    if (lastCallbackDependices) {
        let changed = !dependencies.every((item, index) => {
            return item === lastCallbackDependices[index];
        });
    } else {
        // 没有传入依赖项
        // 等同于第一次渲染
        lastCallback = callback;
        lastCallbackDependices = dependencies;
    }
    return lastCallback;
}