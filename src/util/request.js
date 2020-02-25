import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
axios.defaults.timeout = 30000

const server = axios.create({
  baseURL:'http://localhost:3000'
})

server.interceptors.request.use(
  config=>{
    if(!config.params){
      config.params = {}
    }
    config.params['t'] = String(new Date().getTime());
    // if (store.getters.token) {
    //     config.headers['X-Token'] = getToken()
    // }
    // config.headers['REDIRECT-URL'] = encodeURI(window.location.href)
    // config.headers['IS-API'] = true
    return config
  },
  error => {
    console.log('req')
      console.log(error)
      return Promise.reject(error)
  }
)

server.interceptors.response.use(
  response => {
      const res = response.data
      if (res.code !== 0) {
        if (res.code === 401) {
          location.href = res.data;
          return;
        }
        Message({
            message: res.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg) || 'Error')
      } else {
          return res
      }
  },
  error => {
    Message({
      message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(new Error(error) || 'Error')
  }
)

let Axios = (option) => {
  return service({...option}).catch(err => {
    throw err
  })
}
export default Axios