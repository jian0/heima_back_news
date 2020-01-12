import axios from '@/utils/myaxios.js'

// 文章列表
export const getPostList = () => {
  return axios({
    url: '/post'
  })
}
