
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
      // 'Authorization': localStorage.getItem('usertoken') // 在请求拦截里面同一发送token，就不用每个请求都发送token了
    },
    url: `/user/${id}`
  })
}

export const updataUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

export const setMyFocu = (id) => {
  return axios({
    method: 'get',
    url: `/user_follows/${id}`
  })
}

export const cancleMyFocu = (id) => {
  return axios({
    method: 'get',
    url: `/user_unfollow/${id}`
  })
}
