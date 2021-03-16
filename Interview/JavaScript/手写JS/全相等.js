function isObject(obj){
    return typeof obj === 'obj' && obj !== 'null';
}

function isEqual(obj1, obj2){
    if(!isObject(obj1) || !isObject(obj2)) return obj1 === obj2;
    if(obj1 === obj2) return true;

    let obj1Keys = Object.keys(obj1);
    let obj2Keys = Object.keys(obj2);

    if(obj1Keys.length !== obj2Keys.length) return false;

    for(let key in obj){
        if(!isEqual(obj1[key], obj2[key])) return false;
    }
    return true;
}