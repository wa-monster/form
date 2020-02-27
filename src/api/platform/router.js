import axios from '@/util/request'
export const getRouterData=function(params){
  return axios({
    method:'get',
    url:'/RouterData',
    params
  }) 
}
export const addRouterData=function(params){
  return axios({
    method:'post',
    url:'/addRouterData',
    data:params
  }) 
}
export const delRouterData=function(params){
  return axios({
    method:'post',
    url:'/delRouterData',
    data:params
  }) 
}

export const editRouterData=function(params){
  return axios({
    method:'post',
    url:'/editRouterData',
    data:params
  }) 
}