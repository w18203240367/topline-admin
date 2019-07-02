/**
* Vuex： 集中式 状态 （数据） 管理
* 我们把 不好进行组件通讯交互的组件数据放到这里
* 使用在这里使用，
*   在组件中，this.$store.state.xxx使用
* 修改在这里修改
*   不要直接在组件中 this.store.state = xxxx 不要这样操作修改
*  正确做法：
*  mutation  就好比容器 的 methods
* 1.在store 中 定义 mutation 修改 state 状态
* 2.在组件中调用 mutation 函数完成对状态的修改
*  this.$store.commit("mutation函数名称") 调用mutation 函数 或者提交mutation 函数
* 这里的数据和任何组件无关
* 而且这里的数据也是响应式的，数据改变也会影响视图更新
*/
import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, saveUser } from '@/utils/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
  // state 中的数据可以被任何组件访问
  // 在组建中直接 this.$store.state.xxx 进行访问
  state: {
    user: getUser() || {}
  },
  mutations: {
    // mutation 函数默认接收一个参数 state ，也就是容器的 state
    // 我们可以通过 state.xxx = xxx 完成状态的修改
    changeUser (state, user) {
      // 将参数 user 合并到state.user 中 （对象拷贝）
      Object.assign(state.user, user)
      // 将程序中最新的用户信息 重新写入本地存储，防止刷新得到的是旧的本地存储信息
      saveUser(state.user)
    }
  }
})
export default store
