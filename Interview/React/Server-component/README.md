# Server-Component
## SSR和CSR的比较
- 传统 CSR 的弊端：
    1. 由于页面显示过程要进行 JS 文件拉取和 React 代码执行，首屏加载时间会比较慢
    2. 对于 SEO (Search Engine Optimazition, 即搜索引擎优化)，完全无能为力，因为搜索引擎爬虫只认识 html 结构的内容，而不能识别 JS 代码内容。
SSR 的出现，就是为了解决这些传统 CSR 的弊端



1. 提出的原因
因为大量的**React**组件依赖数据请求才能做渲染。如果每个组件自己去请求数据的话会出现子组件要等父组件数据请求完成渲染子组件的时候才会开始去请求子组件的数据，也就是官方所谓的 WaterFall 数据请求队列的问题。而将数据请求放在一起请求又非常不便于维护。

2. 解决方案
方案的大概就是将 React 组件拆分成 Server 组件（.server.tsx）和 Client 组件（.client.tsx）两种类型。其中 Server 组件会在服务端直接渲染并返回。与 SSR 的区别是 Server Components 返回的是序列化的组件数据，而不是最终的 HTML

### 非Server-component解决办法
使用if条件语句，在未取得数据的情况下，子compoennt直接返回null或其他形式不需要的component
3. 问题
- 心智模型负担
    在server-side渲染，无法使用useState, useReduce, useEffect, DOM API 等方法
- 增加开发者负担
    学习新的API，区分server component， client component和shared component
- 服务成本
    之前在前端做的渲染改在服务器执行，增加服务器负担
- 接口返回
常规做法里前端 JS 中加载组件，接口返回组件需要的数据。而 React Server Components 中则是将二者合二为一，虽然在打包体积上有所优化，但是明显是把这体积转义到了接口返回中。特别是在类似列表这种有分页的请求中，这种劣势会更明显。明明组件只需要在初始的时候进行加载，但是因为被融合进接口里了，每次接口都会返回冗余的组件结构，这样也不知道是好还是不好。可能后续需要优化一下接口二次返回只返回数据会比较好

