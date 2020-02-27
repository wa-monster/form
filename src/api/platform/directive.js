export const getDirectiveData=function(params){
  return axios({
    method:'get',
    url:'/DirectiveData',
    params
  }) 
}
export const addDirectiveData=function(params){
  return axios({
    method:'post',
    url:'/addDirectiveData',
    data:params
  }) 
}
export const delDirectiveData=function(params){
  return axios({
    method:'post',
    url:'/delDirectiveData',
    data:params
  }) 
}