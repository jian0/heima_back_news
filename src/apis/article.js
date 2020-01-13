import axios from '@/utils/myaxios.js'

// 文章列表
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 文章列表
export const getCategory = () => {
  return axios({
    url: '/category'
  })
}
