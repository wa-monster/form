import axios from '@/util/request'

export const getDataList = function(params){
  return axios({
    method:'get',
    url:'/datalist',
    params
  })
}

<<<<<<< HEAD
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
=======
>>>>>>> b24703754b7bad26151c1859ca09129698f342ea

