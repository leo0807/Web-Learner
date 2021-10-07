/** 
    桥接模式
    桥接模式允许分离的组件和分离的接口组合在一块工作。它将对象的接口与其实现分开，允许两者独立变化。
    桥接模式允许输入和输出设备一起工作但独立变化。
    优点
    1. 有助于独立地管理各组成部分， 把抽象化与实现化解耦
    2. 提高可扩充性
    3. 在对象之间共享实现
    缺点
    大量的类将导致开发成本的增加，同时在性能方面可能也会有所减少。

*/
class Applications{
    constructor(name, type){
        this.name = name
        this.type = type
    }
    display(){}
    displayMode(){}
}

class Mode{
    constructor(app){
        this.app = app
        this.lightMode = function(){
            this.app.setLightMode()
        }
        this.darkMode = function(){
            this.app.setDarkMode()
        }
    }
}

class Facebook extends Applications{
    constructor(name,type){
        super(name,type)
        this.mode = "light"
        this.setLightMode = function(){
            this.mode = "light"
        }
        this.setDarkMode = function(){
            this.mode = "dark"
        }
    }
    display(){
        console.log(`Welcome to Facebook for ${this.type}.`)
    }
    displayMode(){
        console.log(`You are using facebook in ${this.mode} mode.`)
    }
}



class WhatsApp extends Applications{
    constructor(name,type){
        super(name,type)
          this.setLightMode = function(){
            this.mode = "light"
        }
        this.setDarkMode = function(){
            this.mode = "dark"
        }
    }
    display(){
        console.log(`Welcome to Whatsapp for ${this.type}.`)
    }
    displayMode(){
        console.log(`You are using whatsapp in ${this.mode} mode.`)
    }    
}