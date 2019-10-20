
// 这个js 文件是负责获取当前栏目的文章列表的

import axios from '@/utils/myaxios.js'

export const getArticalList = (params) => {
  return axios({
    method: 'get',
    url: '/post',
    params
  })
}

export const getArticalDetailById = (id) => {
  return axios({
    method: 'get',
    url: `/post/${id}`
  })
}

export const likeThis = (id) => {
  return axios({
    method: 'get',
    url: `/post_like/${id}`
  })
}

export const collection = (id) => {
  return axios({
    method: 'get',
    url: `/post_star/${id}`
  })
}
