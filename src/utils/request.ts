import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  // TODO 如果存在token, 在请求头中加上token
  return config
}, (error) => {
  Promise.reject(error);
})

service.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 20000) {
    Message({
      message: res.message || 'error',
      type: 'error',
      duration: 5 * 1000
    })
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确认登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        // TODO 重设token
        location.reload()
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return response.data
  }
}, (error) => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service