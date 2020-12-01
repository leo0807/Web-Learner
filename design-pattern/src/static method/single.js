class DB{
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }
    constructor() {
        console.log('实例化会出发构造函数');
        this.connect();
    }
    connect() {
        console.log('连接数据库');
    } 
    find() {
        console.log('查询数据库');
    }
}
// static 方法 和 属性
// 以下两种操作方法作用相同
class User{
    static staticMethod() {
        console.log(this === User);
    }
}
User.staticMethod(); 
class User1{ }
User1.staticMethod = () => {
    console.log(this === User1);
}
User1.staticMethod();
// 属性有同样的效果