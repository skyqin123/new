
// 这个文件是处理axios有关的封装

import axios from 'axios'
import { Toast } from 'vant'

// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 保存axios请求的基准路径到本地方便以后的使用
localStorage.setItem('baseURL', axios.defaults.baseURL)

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 处理所有状态码为400的错误信息
  let { message, statusCode } = response.data
  // console.log(response.data)
  // console.log(statusCode)
  // console.log(message)
  // console.log(this)
  if (statusCode === 401) {
    // console.log(123)
    Toast(message)

    // this.$toast.fail(message)
  }

  return response // 保留
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
