import Vue from 'vue'
import Router from 'vue-router'


// import Home from '../components/Home.vue'
// import About from '../components/About.vue'
// import User from '../components/User.vue'

// 实现懒加载
const Home = () => import('../components/Home.vue')
const About = () => import('../components/About.vue')
const User = () => import('../components/User.vue')
const HomeMessage = () => import('../components/HomeMessage.vue')
const HomeNews = () => import('../components/HomeNews.vue')
const Profile = () => import('../components/Profile.vue')


// 安装插件
Vue.use(Router)

// 创建VueRouter对象
// 导出Router

const router =  new Router({
  // 配置路由和组件之间的应用关系
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      },
      children: [
        {
          path: '',
          redirect: 'news'
        },
        {
          path: 'news',
          name: HomeMessage,
          component: HomeMessage,
          meta: {
            title: 'HomeMessage'
          },
        },
        {
          path: 'message',
          component: HomeNews,
          meta: {
            title: 'HomeNews'
          },
          beforeEnter: (to, from, next) => {
            console.log("路由独享导航");
            next()
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: 'About'
      },
    },
    {
      path: '/user/:userId',
      name: 'User',
      component: User,
      meta: {
        title: 'User'
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        title: 'Profile'
      },
    },


  ]
  ,
  // Has模式改为HTML5模式
  mode: 'history',
  linkActiveClass: "active"
  // 当router-link对应的路由匹配成功时候，会自动给当前元素设置一个router-link-active的class
  // 设置active-class可以修改名字
})
// 前置守卫
router.beforeEach((to, from, next) => {
  // document.title = to.meta.title
  document.title = to.matched[0].meta.title
  next()
})
// 后置钩子不需要主动调用next()
router.afterEach((to, from) =>{
  console.log('---');
});

export default router;
