
// 这个文件是负责和用户有关的业务，如发起axios请求

// 引入axios
import axios from '@/utils/myaxios.js'

// 向后台服务器发起axios请求
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

export const getUserInfo = (id) => {
  return axios({
    method: 'get',
    headers: {
      'Authorization': localStorage.getItem('usertoken')
    },
    url: `/user/${id}`
  })
}
