1 导入路由对象，并且调用Vue.use（VueRouter）
2 创建路由实例， 并且传入路由配置
3 在Vue实例中挂载创建的路由实例

 router-link
 router-link会被渲染成一个a标签 , router-view标签会根据当前的路径动态渲染出不同的组件
 tag 渲染不同标签
 replace 实现 history.replace()
 active-class active的class


## 路由的懒加载
* 业务逻辑代码 -- app.js
* 底层支撑代码 -- main.js
- 原因：当打包构建应用时，JavaScript包会变得非常大，影响页面加载
        路由中通常会定义很多不同的页面，这个页面最后被打包在一个JS文件中，造成页面过大，
        所以服务器一次性请求会需要大量时间
- 结局方案：对不同路由对应对组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更高效了

# Example
'''
// import Home from '../components/Home.vue'
// import About from '../components/About.vue'
// import User from '../components/User.vue'

// 实现懒加载
const Home = () => import('../components/Home.vue')
const About = () => import('../components/About.vue')
const User = () => import('../components/User.vue')
'''
## 路由懒加载的方式
* 结合Vue的异步组件和Webpack的代码分析
  const Home = resolve => {require.ensure(['../component/Home.vue'], ()=>
    {
      resolve(require('../component/Home.vue));
    })}
* AMD写法
  const Home = resolve => require(['../component/Home.vue], resolve);
* 在ES6中，我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割
  const Home = () => import('../components/Home.vue')

## 路由嵌套
* 创建对应的子组件，并且在路由映射中配置对应的子路由
* 在组件內部使用<router-view>标签
## 传递参数主要有两种类型: params & query
# params --
  1 配置路由格式: /router/:id
  2 传递的方式: 在path后面跟上对应的值
  3 传递后形成的路径: /router/123， /router/abc
# query -- 传递大量数据时候使用
  1 默认路由配置格式 /router
  2 传递的方式 对象中使用query的key作为传递方式
  3 传递后形成的路径 /router?id=123
# $router & $route
  - $route为VueRouter实例 想要导航到不同URL 则使用$router.push方法
  - $route为当前router跳转对象里面可以获取name, path, query, params等
# 全局导航守卫 - 监听跳转 类似中间件
router.beforeAll
next()

组件切换的时候 会随着切换而重复的创建和销毁 keep-alive
