import axios from '@/util/request'

export const getOriginList = function(params){
  return axios({
    method:'get',
    url:'/datalist',
    params
  })
}

export const addOrigin = function(data){
  return axios({
    method:'post',
    url:'/addData',
    data
  })
}

export const editOrigin = function(data){
  return axios({
    method:'post',
    url:'/editData',
    data
  })
}

export const activeOrigin = function(data){
  return axios({
    method:'post',
    url:'/activeData',
    data
  })
}

export const deleteOrigin = function(data){
  return axios({
    method:'post',
    url:'/deleteData',
    data
  })
}



