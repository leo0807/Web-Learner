# lazy and suspence
React.lazy 用于做 Code-Splitting，代码拆分。类似于按需加载，渲染的时候才加载代码。
用法如下：
```

import React, {lazy} from 'react';
const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
return (
    <div>
        <OtherComponent />
    </div>
    );
}
```
lazy(() => import('./OtherComponent'))使用 es6 的 import()返回一个 promise，类似于：
```
lazy(() => new Promise(resolve =>
setTimeout(() =>
resolve(
// 模拟 ES Module
{
// 模拟 export default
default: function render() {
return <div>Other Component</div>
}
}
),
3000
)
));
```

## React.lazy 的提出是一种更优雅的条件渲染解决方案。

之所以说他更优雅，是因为他将条件渲染的优化提升到了框架层。
这里我们引出**suspense**。
当我们组件未渲染完成，需要 loading 时，可以这么写：
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <OtherComponent />
        </Suspense>
    </div>
    );
}
```
在我们的业务场景中，OtherComponent 可以代表多个条件渲染组件，我们全部加载完成才取消 loding。
只要 promise 没执行到 resolve，suspense 都会返回 fallback 中的 loading。
代码简洁，loading 可提升至祖先组件，易聚合。相当优雅的解决了条件渲染。
关于 suspense 的异步渲染原理有篇文章写的很好，感兴趣的在文末查看。
