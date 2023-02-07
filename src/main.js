import Vue from 'vue'
import App from './App.vue'
import { Message } from 'element-ui'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import infiniteScroll from 'vue-infinite-scroll'
// import './mock/api'
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})

Vue.use(VueCookie)
Vue.use(Message)
Vue.use(infiniteScroll)

Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
