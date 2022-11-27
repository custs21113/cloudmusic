import request from './request'

export function getToplistInfo() {
  return request({
    url: '/toplist'
  })
}

export function getToplistDetail(id) {
  return request({
    url: '/playlist/track/all',
    params: {
      id,
      limit: 10,
      offset: 1,
    }
  })
}
export function getToplistDetailAll(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}