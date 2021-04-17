function jsonStringfy(obj) {
    let type = typeof obj;
    if (type !== 'object' || obj === null) {
        if (['funciton', 'undefined', 'string'].includes(type)) {
            return '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = [];
        let isArr = obj instanceof Array;
        for (let item in obj) {
            let t = obj[item];
            let type = typeof t;
            if (['function', 'string', 'undefined'].includes(type)) {
                t = '"' + t + '"';
            } else if (type === 'object') {
                t = jsonStringfy(t);
            }
            json.push((isArr ? "" : '"' + item + '":') + String(t));
        }
        return (isArr ? '[' : '{') + String(json) + (isArr ? ']' : '}');
    }
}

console.log(jsonStringfy({ x: 5 }));