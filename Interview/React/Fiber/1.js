// Fiber中多用链表来记录数据
// payload数据或者元素

class Update {
    constructor(payload, nextUpdate) {
        this.payload = payload;
        this.nextUpdate = nextUpdate;//指向下一个更新
    }
}
class UpdateQueue {
    constructor() {
        this.baseState = null;  //原状态
        this.firstUpdate = null;//第一个更新
        this.lastUpdate = null; //最后一个更新
    }
    enqueueUpdate(update) {
        if (this.firstUpdate == null) {
            this.firstUpdate = this.lastUpdate = update;
        } else {
            this.lastUpdate.nextUpdate = update; //上一个的next指向当前update
            this.lastUpdate = update; //lastupdate指向当前update
        }
    }
    //获取以前的状态，然后遍历这个链表，进行更新
    forceUpdate() {
        let currentState = this.baseState || {}; //初始状态
        let currentUpdate = this.firstUpdate;
        while (currentUpdate) {
            // 判断下一个payload是否是函数，是的话则执行，否则直接添加
            let nextState = typeof currentUpdate.payload == 'function' ?
                currentUpdate.payload(currentState) :
                currentUpdate.payload;
            currentState = { ...currentState, ...nextState };//使用当前更新得到新的状态
            currentUpdate = currentUpdate.nextUpdate;//找下一个节点
        }
        this.firstUpdate = this.lastUpdate = null; //更新完成把链表清空
        this.baseState = currentState;
        return currentState;
    }
}
let queue = new UpdateQueue();
queue.enqueueUpdate(new Update({ name: 'Junxu1' }));
queue.enqueueUpdate(new Update({ number: 0 }));
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })));
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })));

queue.forceUpdate();
console.log(queue.baseState);