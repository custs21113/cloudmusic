// import { request } from 'express';
import request from './request';
import request2 from './request2';

export function getTopBanners() {
    return request({
        url: "/banner"
    })
}

// 热门推荐
export function getHotRecommends(limit) {
    return request({
        url: "/personalized",
        params: {
            limit
        }
    })
}

// 首页下的新碟上架
export function getNewAlbums() {
    return request({
        url: '/album/newest'
    })
}

// 入驻歌手
export function getSettleSinger() {
    return request2({
        url: '/artist/list'
    })
}

//热门主播
export function getDjradios() {
    return request2({
        url: '/djradio/list'
    })
}