import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './mock/api'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
