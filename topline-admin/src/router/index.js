import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth' // 按需加载
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      // name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          // 加载一个目录可以默认加载它的index.js  index.json  index.vue....
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        {
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        }
      ]
    }
  ]
})
/**
 * 全局前置守卫
 * 当你访问路由页面的时候会先进入这里
 * to 要去哪里的相关数据
 * from 来自哪里的相关数据
 * next 允许通过的方法
 */
router.beforeEach((to, from, next) => {
  // 路由导航前 开启进度条
  nprogress.start()
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser()
  if (to.path !== '/login') {
    // 如果是非登录页面
    // 没有登录，跳转到登录项
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      next()
    }
    // 登录了,允许通过
  } else {
    // 如果是登录页面
    if (!userInfo) {
      next()
    } else {
      //   没有登录,允许通过
      //  登录了 不允许通过
      window.location.href = '/#/'
      window.location.reload()
    }
  }
})
// 路由导航后置钩子
router.afterEach((to, from) => {
  // 路由导航完成结束进度条
  nprogress.done()
})
export default router
