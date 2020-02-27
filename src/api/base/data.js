import axios from '@/util/request'

export const getDataList = function(params){
  return axios({
    method:'get',
    url:'/datalist',
    params
  })
}

export const addData = function(data){
  return axios({
    method:'post',
    url:'/addData',
    data
  })
}

export const editData = function(data){
  return axios({
    method:'post',
    url:'/editData',
    data
  })
}

export const activeData = function(data){
  return axios({
    method:'post',
    url:'/activeData',
    data
  })
}

export const deleteData = function(data){
  return axios({
    method:'post',
    url:'/deleteData',
    data
  })
}



