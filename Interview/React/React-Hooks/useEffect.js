let lastEffectDependices;

function useEffect(callback, dependices) {
    if (lastEffectDependices) {
        let changed = !dependices.every((item, index) => {
            return item === lastEffectDependices[index];
        })
        if (changed) {
            callback();
            lastEffectDependices = dependices;
        }
    } else {
        callback();
        lastEffectDependices = dependices;
    }
}