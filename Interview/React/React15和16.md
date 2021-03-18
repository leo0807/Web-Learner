# React 15 架构分层
React 15 架构分为两部分。

1. Reconciler（协调器）：找出变化的组件。
通过 diff 算法找出变化的组件交给 Renderer 渲染器。

2. Renderer（渲染器）：将变化的组件重新渲染。
由于 React 是支持多平台，除了应用于浏览器，还可应用于原生APP，由 React Native 框架实现。所以会有独立的 Renderer 渲染器的概念。浏览器端的实现就是 react-dom 库。它的主要作用就是将变化的组件重新渲染。

# React 15 架构更新机制
首先由 Reconciler（协调器）通过 diff 算法计算出需要更新的组件，然后通过 Renderer（渲染器）去执行更新并渲染组件。接着继续由 Reconciler 计算出需要更新的组件，Renderer 继续更新渲染。整个过程是同步的，Reconciler 与 Renderer交替进行的。并且使用递归实现，所以不可中断。

# React 15 架构面临的问题
由于 React 15 的 Reconciler（协调器）是通过不可中断的递归实现，并且和 Renderer（渲染器）是交替进行。所以一旦出现中断，呈现出来的界面 UI 就会出现更新一半的现象。

比如想要将以下 1 2 3 同时乘以 2 得到 2 4 6。
```
function App() {
  const list = [1,2,3];
  const [count,setCount] = useState(1);
  return (
    <div className="App">
      <button onClick={()=>setCount(count*2)}>点击加倍</button>
     <ul>
         {list.map(item=>{
          return  <li key={item} >{item*count}</li>
         })}
     </ul>
    </div>
  );
}
```

## 更新流程如下：
通过 Reconciler 对比出需要将第一个 li 的 1 更新为 2 时，通知 Renderer 进行界面更新渲染。这时候 Reconciler 又对比出需要将第二个 li 的 2 更新为 4 ，此时更新中断。Renderer 来不及渲染。于是页面呈现出的效果是 2 2 3。
这就是 React 15 架构的问题所在，因为是递归执行，所以执行过程没法中止，导致一旦更新暂停，页面就会呈现更新不完全的 UI。

# React 16 架构分层
## React 16 架构分为三部分。
- Scheduler（调度器）：调度任务优先级，使优先级高的任务进入 Reconciler。
- Reconciler（协调器）：负责找出变化的组件。
通过 diff 算法找出变化的组件交给 Renderer 渲染器。

- Renderer（渲染器）：负责将变化的组件重新渲染。
由于 React 是支持多平台，除了应用于浏览器，还可应用于原生APP，由 React Native 框架实现。所以会有独立的 Renderer 渲染器的概念。浏览器端的实现就是 react-dom 库。它的主要作用就是将变化的组件重新渲染。

## React 16 架构更新机制
首先由 Scheduler（调度器）去调度任务的优先级，将优先级比较高的任务加入到 Reconciler（协调器）中。Reconciler（协调器）通过 diff 算法计算出需要更新的组件，并标记更新状态。等整个组件更新完成之后，再通过 Renderer（渲染器）去执行更新并渲染组件。

在 React 16 中，Reconciler （协调器）是通过可中断的循环去计算出需要更新的组件，并且是等整个组件协调完之后再通过 Renderer 渲染更新。所以不会出现像 React 15 架构更新不完全的情况。
————————————————
版权声明：本文为CSDN博主「杏子_1024」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44135121/article/details/108753231


# 在 stack reconciler 下，DOM 的更新是同步的，也就是说，在 virtual DOM 的比对过程中，发现一个 instance 有更新，会立即执行 DOM 操作。

# Fiber

module.exports = {
NoWork: 0, // No work is pending.
SynchronousPriority: 1, // For controlled text inputs. Synchronous side-effects.
AnimationPriority: 2, // Needs to complete before the next frame.
HighPriority: 3, // Interaction that needs to complete pretty soon to feel responsive.
LowPriority: 4, // Data fetching, or result from updating stores.
OffscreenPriority: 5, // Won't be visible but do the work in case it becomes visible.
};

作者：武器大师 1024
链接：https://juejin.cn/post/6844903582622285831
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

https://juejin.cn/post/6844903582622285831#heading-1
