import axios from '@/util/request'
export const getMenuData=function(params){
  return axios({
    method:'get',
    url:'/menuData',
    params
  }) 
}