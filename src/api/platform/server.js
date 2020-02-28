import axios from '@/util/request'
export const getServerData=function(params){
  return axios({
    method:'get',
    url:'/serverData',
    params
  }) 
}
export const addServerData=function(params){
  return axios({
    method:'post',
    url:'/addServerData',
    data:params
  }) 
}
export const delServerData=function(params){
  return axios({
    method:'post',
    url:'/delServerData',
    data:params
  }) 
}

export const editServerData=function(params){
  return axios({
    method:'post',
    url:'/editServerData',
    data:params
  }) 
}