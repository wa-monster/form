import Vue from 'vue'
import Vuex from 'vuex'
import menuRouter from '@/router//menuRouter'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: menuRouter || [],
    openTop:true,
    openMenu:true
  },
  mutations: {
    SET_TOP(state){
      state.openTop = !state.openTop
    },
    SET_MENU(state){
      state.openMenu = !state.openMenu
    }
  },
  actions: {
  },
  modules: {
  }
})
