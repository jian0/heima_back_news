import axios from '@/utils/myaxios.js'

// 登录请求
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
