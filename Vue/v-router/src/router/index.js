import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
// 安装插件
Vue.use(Router)

// 创建VueRouter对象
// 导出Router
export default new Router({
  // 配置路由和组件之间的应用关系
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      // name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },

  ]
  ,
  // Has模式改为HTML5模式
  mode: 'history',
  linkActiveClass: "active"
  // 当router-link对应的路由匹配成功时候，会自动给当前元素设置一个router-link-active的class
  // 设置active-class可以修改名字
})
