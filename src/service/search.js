import request from './request'

export function getSearchDefault(keywords) {
  return request({
    url: '/cloudsearch',
    data: {
        keywords
    },
    method: 'POST'
  })
}