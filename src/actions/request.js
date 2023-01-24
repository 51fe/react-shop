import axios from 'axios'
import { toastr } from "react-redux-toastr"

// 创建axios实例
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API ,
  timeout: 20000 // axios gloable setting
})
// http response interceptor
service.interceptors.response.use(data => {
  return data
}, error => {
  const msg = error.toString()
  toastr.error('消息', msg)
  return Promise.reject(error)
})

export default service
