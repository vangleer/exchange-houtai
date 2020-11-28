import axios from 'axios'
import qs from 'querystring'
import nprogress from 'nprogress'
import {BASE_URL} from '../config/index'
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  withCredentials: true,
})
// 请求拦截器
instance.interceptors.request.use((config)=>{
  // 开起进度条
  nprogress.start()
  // 这里可以修改config配置，但是必须要返回config，否则服务器收不到请求数据
  config.data = typeof config.data === 'object' ? config.data : {}
  config.data.token = localStorage.getItem('token')
  config.data = qs.stringify(config.data)
  return config
})

// 响应拦截器
instance.interceptors.response.use((res)=>{
  nprogress.done()
  return res.data
})

export default instance