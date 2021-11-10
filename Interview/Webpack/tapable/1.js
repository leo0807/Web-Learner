let { SyncHook } = require('tapable');

class Lesson {
    constructor() {
        this.hook = {
            arch: new SyncHook(['name']),

        }
    }

    tap() { //注册监听函数

    }
    start() {

    }
}

let l = new Lesson();
l.start();