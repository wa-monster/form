import axios from '@/util/request'

export const getDataList = function(params){
  return axios({
    method:'get',
    url:'/datalist',
    params
  })
}


