import request from './request'
export function getSongDetail(ids){
    return request({
        url: '/song/detail',
        data: {
            ids
        },
        method: 'POST'
    })
}
export function getSD(id){
    try {
        return request({
            url: `/song/detail?ids=${id}`
        })
    } catch (error) {
        console.log('service/player/getSD', error)
    }
}