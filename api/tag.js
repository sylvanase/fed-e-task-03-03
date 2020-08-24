import {request} from '@/plugins/request'
// taglist
export const getTags = params => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}
