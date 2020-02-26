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

  ]
}

export default   [
  base,
  platform
]