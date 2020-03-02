import axios from '@/util/request'
export const getMenuData=function(params){
  return axios({
    method:'get',
    url:'/menuData',
    params
  }) 
}
export const addMenuData=function(params){
  return axios({
    method:'post',
    url:'/addMenuData',
    data:params
  }) 
}
export const addMenuChildData=function(params){
  return axios({
    method:'post',
    url:'/addMenuChildData',
    data:params
  })   
}
export const editMenuData=function(params){
  return axios({
    method:'post',
    url:'/editMenuData',
    data:params
  })   
}
export const delMenuData=function(params){
  return axios({
    method:'post',
    url:'/delMenuData',
    data:params
  })   
}