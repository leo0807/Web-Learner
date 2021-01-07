function LRU(operators, k) {
    let res = [];
    let map = new Map();
    for (let i = 0; i < operators.length; i++) {
        let [op, key, value] = operators[i];
        if (op === 1) {
            if (map.size >= k) {
                map.delete(map.keys().next().value)
                map.set(key, value);
            } else {
                if (map.has(key)) {
                    map.delete(key)
                }
                map.set(key, value);
            }
        } else if (op === 2) {
            if (!map.has(key)) {
                res.push(-1);
            } else {
                let value = map.get(key);
                res.push(value);
                map.delete(key);
                map.set(key, value);
            }
        }
    }
    return res;
}
