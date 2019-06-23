import Vue from 'vue'
import App from './App.vue'
// 引入 路由
import router from './router/router'
// 引入 element-ul
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
// 公共css
import '@/styles/index.less'
// 引入bootstrap
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
