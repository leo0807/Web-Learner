class ReadImg{
    constructor(filename){
        this.filename = filename;
        this.loadFromDisk();
    }
    display(){
        console.log('display...' + this.filename);
    }
    loadFromDisk(){
        console.log('Loading...' + this.filename);
    }
}

class ProxyImg{
    constructor(filename){
        this.realImg = new ReadImg(filename);
    }
    display(){
        this.realImg.display();
    }
}
// 场景
// 1.网页事件代理
var div = document.getElementById('div1');
div1.addEventListener('click', function(e){
    var target = e.target;
    if(target.nodeName === 'A'){
        alert(target.innerHTML);
    }
});
// 2.Es6 Proxy
let star = {
    name: 'Taylor',
    age: 25,
    phone: '12345678901'
}
let agent = new Proxy(star, {
    get: function(target, key){
        if(key === 'phone'){
            return '18611112222'
        }
        if(key === 'price'){
            return 1200000;
        }
        return target[key];
    },
    set:function(target, key, val){
        if(key === 'customerPrice'){
            if(val < 100000){
                throw new Error('Too Low Price');
            }else{
                target[key] = val;
                return true;
            }
        }
    }
})
console.log(agent.name);
console.log(agent.phone);
console.log(agent.age);
console.log(agent.price);
// 3.$.proxy
