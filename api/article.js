import {request} from '@/plugins/request'
// 公共文章list
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 用户关注的list
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}


// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const delFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

export const postComments = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`
  })
}

export const delComments = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments`
  })
}

export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 创建文章
export const createArticles = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

// 更新文章
export const updateArticles = data => {
  return request({
    method: 'PUT',
    url: '/api/articles/${data.slug}',
    data
  })
}

// 删除文章
export const delArticles = slug => {
  return request({
    method: 'DELETE',
    url: '/api/articles/${slug}'
  })
}
