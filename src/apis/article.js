import axios from '@/utils/myaxios.js'

// 文章列表
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 栏目列表
export const getCategory = () => {
  return axios({
    url: '/category'
  })
}

// 文章详情
export const getPostListById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
