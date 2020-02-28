import axios from '@/util/request'
export const getFormList=function(params){
  return axios({
    method:'get',
    url:'/getFormList',
    params
  }) 
}

export const deleteFormList=function(data){
  return axios({
    method:'post',
    url:'/deleteFormList',
    data
  }) 
}