
// 这个文件是处理axios有关的封装

import axios from 'axios'
import { Toast } from 'vant'

// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 保存axios请求的基准路径到本地方便以后的使用
localStorage.setItem('baseURL', axios.defaults.baseURL)

// 添加请求拦截器:每一个请求都会经过
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么:将token以请求头的方式传递给服务器，服务器可以根据当前的token进行处理
  // console.log(config)
  const token = localStorage.getItem('usertoken')
  if (token) {
    config.headers.Authorization = token
  }
  // 请求并不是拦截器来发送的，它只是发送过程中的一个插曲
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

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
