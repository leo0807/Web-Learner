// 如果要使用创建的上下文，需要通过 Context.Provider 最外层包装组件，
// 并且需要显示的通过 < MyContext.Provider value = {{ xx: xx }}> 的方式传入 value，指定 context 要对外暴露的信息。

// 子组件在匹配过程中只会匹配最新的 Provider，也就是说如果有下面三个组件：
// ContextA.Provider -> A -> ContexB.Provider -> B -> C


function useContext(context) {
    return context._currentValue
}