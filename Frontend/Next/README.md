# NextJS

## 记录NexJS的学习和使用

- `Nextjs` 中如果想要创建页面，只需要在 pages 文件夹下面添加一个文件，因为 Nextjs 的路由系统是基于文件系统的，所以该文件的路径对应着访问该文件的 URL，例如：如果增加 home.js 文件，则可以通过 http://localhost:3000/home 路径访问。

- 默认情况下`，Nextjs` 会预渲染每个页面，这表明 Nextjs 会将 pages 文件下的每个文件生成对应的 HTML 文件，每个生成的 HTML 文件都与该页面最少的 JavaScript 代码相关联，当页面加载时，JavaScript 代码将会运行显示最终的完整页面，这个处理过程被称为水合（hydration）。


## `use client`
默认情况，所有NextJs的组件都是SSR的，但是一些情况（如onClick事件）是无法通过SSR实现的，则需要使用`use client`这种`directive`进行CSR

##
-
