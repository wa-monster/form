import axios from '@/util/request'
export const getAutoList=function(params){
  return axios({
    method:'get',
    url:'/getAutoList',
    params
  }) 
}

export const createAutoList=function(params){
  return axios({
    method:'get',
    url:'/createAutoList',
    params
  }) 
}