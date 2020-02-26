import layout from '../layout/Index.vue'


const base =   {
  path:'/base',
  component:layout,
  meta:{
    name:'基础设置'
  },
  children:[
    {
      path: 'data',
      name: 'Data',
      component: ()=> import(/* webpackChunkName: "BaseData" */ '../views/Base/Data.vue'),
      meta:{
        name:'数据源设置',
      },
    },
    {
      path: 'style',
      name: 'Style',
      component: ()=> import(/* webpackChunkName: "BaseStyle" */ '../views/Base/Style.vue'),
      meta:{
        name:'样式设计',
      }
    },
  ]
}

const platform = {
  path:'/platform',
  component:layout,
  meta:{
    name:'开发平台'
  },
  children:[
    {
      path: 'auto',
      name: 'Auto',
      component: ()=> import(/* webpackChunkName: "PlatformAuto" */ '../views/Platform/Auto.vue'),
      meta:{
        name:'自动生成器',
      }
    },
    {
      path: 'form',
      name: 'Form',
      component: ()=> import(/* webpackChunkName: "PlatformAuto" */ '../views/Platform/Form.vue'),
      meta:{
        name:'表单库',
      }
    },
    {
      path: 'directive',
      name: 'Directive',
      component: ()=> import(/* webpackChunkName: "PlatformAuto" */ '../views/Platform/Directive.vue'),
      meta:{
        name:'指令库',
      }
    },
    {
      path: 'router',
      name: 'Router',
      component: ()=> import(/* webpackChunkName: "PlatformAuto" */ '../views/Platform/Router.vue'),
      meta:{
        name:'路由表',
      }
    },
    {
      path: 'page',
      name: 'Page',
      component: ()=> import(/* webpackChunkName: "PlatformAuto" */ '../views/Platform/Page.vue'),
      meta:{
        name:'页面管理',
      }
    },
    {
      path: 'menu',
      name: 'Menu',
      component: ()=> import(/* webpackChunkName: "PlatformAuto" */ '../views/Platform/Menu.vue'),
      meta:{
        name:'菜单管理',
      }
    },
  ]
}

const application = {
  path:'/application',
  component:layout,
  meta:{
    name:'应用'
  },
  children:[]
}

export default   [
  base,
  platform,
  application
]