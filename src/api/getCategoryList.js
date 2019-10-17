
// 获取栏目列表的js文件

import axios from '@/utils/myaxios.js'

export const getCategoryList = () => {
  return axios({
    method: 'get',
    url: '/category'
  })
}
