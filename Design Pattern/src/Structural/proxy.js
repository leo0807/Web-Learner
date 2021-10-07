/**
优点： 
1. 代理模式能将代理对象与被调用对象分离，降低了系统的耦合度。代理模式在客户端和目标对象之间起到一个中介作用，这样可以起到保护目标对象的作用
2. 代理对象可以拓展目标对象的功能；通过代理对象即可，复合开闭原则；
缺点：
处理请求速度可能有差别。非直接访问存在开销
与装饰器模式的不同点：
装饰器模式： 拓展原有功能，原有功能不改变且可以直接使用
代理模式：显示原有功能，但是是经过限制之后的

使用场景：
代理模式试图减少目标对象的工作量。您可以在处理执行大量网络请求的繁重应用程序时使用它。由于响应此类请求时可能会发生延迟，因此使用代理模式将使目标对象不会因请求而负担过重。
一个真实的例子是 HTTP 请求。这些都是昂贵的操作，因此，代理模式有助于减少转发到目标的请求数量。
 */
//  E.g.1
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
// var div = document.getElementById('div1');
// div1.addEventListener('click', function(e){
//     var target = e.target;
//     if(target.nodeName === 'A'){
//         alert(target.innerHTML);
//     }
// });
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

agent.customerPrice = 1500000;
console.log(agent.customerPrice);
agent.customerPrice = 15000;
console.log(agent.customerPrice);
// 3.$.proxy
// E.g.3
class GetCapital{
   getMycapital(country) {
        if (country === "Pakistan") {
            return "Islamabad";
        } else if (country === "India") {
            return "New Delhi";
        } else if (country === "Canada") {
            return "Ottawa";
        } else if (country === "Egypt") {
            return "Cairo";
        } else {
            return "";
        }
    }
}
 
class ProxyGetCapital {
  constructor(){
    this.capital = new GetCapital()
    this.cache = {};
  }

  getMycapital(country){
    if(!this.cache[country]){
      var value = this.capital.getMycapital(country)
      this.cache[country] = value
      return `${value}--Returning From GetCapital`
    }else{
      return `${this.cache[country]}--Returning from Cache`
    }
    
  }
};
 

var capital = new ProxyGetCapital();
console.log(capital.getMycapital("Pakistan"))
console.log(capital.getMycapital("India"))
console.log(capital.getMycapital("Canada"))
console.log(capital.getMycapital("Egypt"))
console.log(capital.getMycapital("Egypt"))
console.log(capital.getMycapital("Egypt"))
console.log(capital.getMycapital("Pakistan"))
console.log(capital.getMycapital("Pakistan"))
console.log(capital.getMycapital("Canada"))

// E.g.4
class LibraryKiosk{
    open(app){
        console.log(`Opening ${app}`)
    }
    connectTo(website){
         console.log("Connecting to "+ website); 
    }
}
class ProxyLibraryKiosk{
    constructor(){
        this.library = new LibraryKiosk();
        this.blockedApps = ['camera', 'photos', 'music', 'settings'];
        this.blockedWebs = ['cfb.com', 'instagram.com', 'snapchat.com', 'google.com', 'gmail.com'];
    }
    open(app){
        if(this.blockedApps.includes(app)){
            console.log(`You can't access the ${app}`);
        }else{
            console.log(`Opening ${app}`)
        }
    }
    connectTo(website){
        if(this.blockedWebs.includes(website)){
            console.log(`Access to ${website} denied`);
        }else{
         console.log("Connecting to "+ website); 
        }
    }
}