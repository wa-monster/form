import axios from '@/util/request'
export const getAutoList=function(params){
  return axios({
    method:'get',
    url:'/getAutoList',
    params
  }) 
}