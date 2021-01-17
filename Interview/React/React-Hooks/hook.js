let isMount = true,
// 指针， 指向哪个hook
    workInProgressHook = null;
const fiber = {
    stateNode: App,
    // 链表保存数据
    memoizedState: null
}

function useState(initialState){
    let hook;
    if(isMount){
        hook = {
            memoizedState: initialState,
            next: null,
            queue: {
                pending: null
            }
        }
        if(!fiber.memoizedState){
            fiber.memoizedState = hook;
        }else{
            workInProgressHook.next = hook;
        }
        workInProgressHook = hook;
    }else{
        // update 取得当前hook
        hook = workInProgressHook;
        workInProgressHook = workInProgressHook.next;
    }

    // 前一次第状态
    let baseState = hook.memoizedState;
    if(hook.queue.pending){
        let firstUpdate = hook.queue.pending.next;
        do{
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next
        }while(firstUpdate !== hook.queue.pending.next)
        hook.queue.pending = null;
    }
    hook.memoizedState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action){
    const update = {
        action,
        next: null
    }
    // 因为优先级 设置为环形链表
    if(queue.pending === null){
        update.next = update;
    }else{
        // queue.pending 为第一个节点  
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;
    schedule();
}

function schedule(){
    workInProgressHook = fiber.memoizedState;
    const app = fiber.stateNode();
    isMount = false;
    return app;
}

function App(){
    const [num, updateNum] = useState(0);

    return {
        onClick(){
            updateNum(num => num + 1);
        }
    } 
}
window.app = schedule();