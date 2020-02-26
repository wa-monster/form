import axios from '@/util/request'

export const getDataList = function(){
  return axios({
    method:'get',
    url:'/datalist'
  })
}


