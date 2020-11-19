class SingleObject{
    login(){
        console.log('login');
    }
}

SingleObject.getInstance = (function(){
    let instance;
    return function(){
        if(!instance){
            instance = new SingleObject();
        }
        return instance;
    }
})()
// 场景
// JQuery 只有一个 $
// Login Window