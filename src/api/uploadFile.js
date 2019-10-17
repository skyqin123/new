
// 这里是主要负责处理文件上传的相关业务的

import axios from '@/utils/myaxios.js'

export const uploadFile = (file) => {
  return axios({
    method: 'post',
    url: '/upload',
    data: file
  })
}
