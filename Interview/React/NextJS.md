# NextJS

- SSR的优势
1. 解决首屏渲染速度延迟问题
2. 解决 SEO 搜索引擎抓取问题


- NextJS的优势
1. 直观的、 基于页面 的路由系统（并支持 动态路由）
2. 预渲染。支持在页面级的 静态生成 (SSG) 和 服务器端渲染 (SSR)
3. 自动代码拆分，提升页面加载速度
4. 具有经过优化的预取功能的 客户端路由
5. 内置 CSS 和 Sass 的支持，并支持任何 CSS-in-JS 库，如 styled-jsx，TailWindCss
6. 开发环境支持 快速刷新
7. 利用 Serverless Functions 及 API 路由 构建 API 功能
8. 完全可扩展

## Data Fetching 和 Pre-rendering
NextJs支持Data Fetching和Pre-rendering
- 预渲染
默认情况下，NextJs中的每个页面都是预渲染的，这意味着NextJS提前生成HTML页面。而不是在客户端完成全部的渲染，这有利于提高性能和利于SEO。
NextJS有两种预渲染的方式，其中的区别来源于他们生成HTML的时间不一样：
1. Static Generation
静态生成是在build time时候，生成的HTML。预渲染的HTML会被之后的每一个请求重复使用。
2. 服务器端渲染
这种方法则是在每次请求的时候产生预渲染的HTML。
- 选择
1. NextJS允许用户自己为自己的App使用混合的方式使用Pre-rendering。但是多数情况下更推荐使用Static Generation。原因是一旦应用被打包之后，整个应用就会处于CDN的服务下，这使得App在每一个请求下都会比服务端渲染速度更快；
2. 但是Static Generation也有缺点。如，当你无法提前在一个用户的请求下进行预渲染。造成这样情况的原因可能是你所请求的页面上的数据更新的频率很高或者这个页面的内容在每一个请求下都不一样。这种情况下，使用Server-sider rendering则会是更好的选择。
3. Staic Generation可以在页面有数据和无数据两种情况下均适用。在页面需要获取外部数据的时候，需要使用```getStaticProps```方法，如
```
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```
1. 在Build Time时，`getStaticProps`方法会告诉NextJS当前页面需要外部数据，所以需要在预渲染前先获取这些数据；而当应用处于生产模式下，```getStaticProps```方法则是每个请求下运行，且此种方法只能从页面导出，如果当前文件是一个非页面文件，则无法导出。
2. 如果页面更新频率很快或者页面的每次请求都不一样，则应使用```getServerSideProps```方法。该方法在每次请求的时候运行，函数的参数即为请求的具体参数，但是此种方法会比```getStaticProps```方法速度慢，原因在于，此方法需要在每次请求的时候先获取结果，而结果无法被CDN缓存。
3. 除了这两种方法外，还可以使用客户端获取数据。如NextJS研发的React Hook--```SWR```。它可以用于缓存，验证，关注痕迹，在间隔重新获取数据等功能。
```
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

## 快速刷新（Fast Refresh）
