import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 安装插件
Vue.use(Vuex)

// 创建Store对象
const state = {
  // 购物车数据
  cartList: []
}
const store = new Vuex.Store({
  state,
  // mutations修改state中的状态
  // mutations中每一个方法尽可能完成的事件比较单一
  mutations,
  actions,
  getters
})

// 挂载Vue实例上
export default store