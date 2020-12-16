function add(){
    let args = Array.from.call([], arguments);
    let _add = function(){
        args.push(...arguments);
        return _add;
    }
    _add.toString = function(){
        return args.reduce(function(pre,cur){
            return pre + cur;
        }, 0)
    }
        
    
    return _add;
}
let x = add(1)(3)(3,4);
console.log(x.toString());