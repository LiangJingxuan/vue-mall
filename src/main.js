import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from './components/common/toast'
// 等待加载图片
import loading from './assets/img/common/placeholder.png'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// 自定义插件 toast
Vue.use(toast)

// 解决移动端300ms的延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
Vue.use(VueLazyLoad, {
  loading
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
