import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/reset.css'
import '@/common/css/custom.css'
import '@/common/css/css3-modify.css'


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
