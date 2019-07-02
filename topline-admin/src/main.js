import Vue from 'vue'
import App from './App.vue'
// 引入 路由
import router from './router'
// 引入 element-ul
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
// 公共css
import '@/styles/index.less'
// 引入bootstrap
import 'bootstrap/dist/css/bootstrap.css'
// 引入进度条
import 'nprogress/nprogress.css'

import { getUser, removeUser } from '@/utils/auth'

import JSONbig from 'json-bigint'

import store from './store'

import axios from 'axios'
Vue.use(ElementUI)

// 配置axios 基础路径  发请求的时候就不需要每次都写 http://xxxx
// 直接请求 axios({url:'/接口'})   路径后面的杠 多退少补
// axios.defaults.baseURL = `http://toutiao.course.itcast.cn/mp/v1_0`
axios.defaults.baseURL = `http://ttapi.research.itcast.cn/mp/v1_0`

/**
 * 如何解决后端返回来的数据超出安全证书范围的问题？
 * axios 预留的自定义处理后端返回的原始数据
 * 可以理解成是一个响应拦截器这个比较特殊
 * 这里的data是后端返回的未经处理的原始数据
 * axios 默认使用JSON.parse 去转换原始数据，如果期货在那个有超出安全整数范围的数据就有问题
 * 所以 我们在这里可以手动 处理原始数据
 *  npm i json-bigint
*/

axios.defaults.transformResponse = [function (data) {
  // console.log('transformResponse =>' + data)
  // 这里使用 JSONbig.parse 转换原始数据
  // 类似于 JSON.parse
  // 但是它会处理其中超出安全整数范围的整数问题。
  // 严谨一点，如果 data 不是json 格式字符串就会报错
  try {
    // 如果 是json 格式字符串，就会转回并返回后续代码使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错意味着 data 不是json 格式字符串， 这里就直接原样返回后续使用
    return data
  }
}]

/**
 * axios 请求拦截器：axios 发出去的请求会先经过这里
 * return config 允许请求发送的开关
 * config 是本次请求相关的配置对象
 * axios 默认使用JSON.parse 去转换原始数据，如果其中有超出
 */
axios.interceptors.request.use(config => {
  const user = getUser()
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 在这里之前添加一些业务逻辑操作
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * axios 响应拦截器：axios 收到的响应会先经过这里
 */
axios.interceptors.response.use(response => { // >=200 <400 的状态码先进入这里
  // response 响应结果对象
  // 这里将response 原样返回，那你收到的就是 response
  // 我们可以控制请求响应回来的数据格式
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => { // >=400 的状态码先进入这里
  console.log(error)
  // 如果用户 token 无效，让其跳回登录页面
  if (error.response.status === 401) {
    // 清除本地缓存 token
    removeUser()
    // 跳转登录页面
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

// 所有的组件都是Vue的实例
// 我们可以把一些需要在组件中 频繁使用的成员放到 Vue.prototype 中
// 给Vue 原型对象扩展成员的时候最好加上一个 $ 前缀，避免和组件内部的数据成员冲突
// 几乎所有组件都要去发请求，这样配置完之后我们在组价中发请求 可以直接 this.$http({method、url})
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  store, // 将store 配入到根实例中， 然后所有组件就可以通过  this.$store 来访问容器中的数据
  render: h => h(App)
}).$mount('#app')
