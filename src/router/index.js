import Vue from 'vue'
import VueRouter from 'vue-router'
import menuRouters from '@/router/menuRouter'
import layout from '../layout/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/base/data'
  },
  ...menuRouters
]




const router = new VueRouter({
  routes
})

export default router
