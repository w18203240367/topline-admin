import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
        }
      ]
    }
  ]
})
