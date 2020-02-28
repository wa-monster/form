import axios from '@/util/request'
export const getPageData=function(params){
  return axios({
    method:'get',
    url:'/PageData',
    params
  }) 
}
export const addPageData=function(params){
  return axios({
    method:'post',
    url:'/addPageData',
    data:params
  }) 
}
export const delPageData=function(params){
  return axios({
    method:'post',
    url:'/delPageData',
    data:params
  }) 
}

export const editPageData=function(params){
  return axios({
    method:'post',
    url:'/editPageData',
    data:params
  }) 
}