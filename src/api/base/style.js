import axios from '@/util/request'

export const addStyle = function(params){
  return axios({
    method:'get',
    url:'/addStyle',
    params
  })
}

export const activeStyle = function(params){
  return axios({
    method:'get',
    url:'/activeStyle',
    params
  })
}