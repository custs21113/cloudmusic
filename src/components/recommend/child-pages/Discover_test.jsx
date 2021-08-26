import React, { Fragment, useState, useEffect } from 'react'
import { getHotRecommends } from '../../../service/recommend';

export default function Discover(props) {
    let [recommends, setRecommends] = useState([]);
    let getRecommends = async () => {
        try {
            let res = await getHotRecommends(8)
            setRecommends([...res.data.result]);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getRecommends();
    },[])
    return (
        <Fragment>
            <div className="discover-header">
                <a className="recommend-title" href="/discover/playlist">热门推荐</a>
                <div className="tab">
                    <a href="https://music.163.com/discover/playlist/?cat=%E5%8D%8E%E8%AF%AD">华语</a><span className="line">|</span>
                    <a href="https://music.163.com/discover/playlist/?cat=%E6%B5%81%E8%A1%8C">流行</a><span className="line">|</span>
                    <a href="https://music.163.com/discover/playlist/?cat=%E6%91%87%E6%BB%9A">摇滚</a><span className="line">|</span>
                    <a href="https://music.163.com/discover/playlist/?cat=%E6%B0%91%E8%B0%A3">民谣</a><span className="line">|</span>
                    <a href="https://music.163.com/discover/playlist/?cat=%E7%94%B5%E5%AD%90">电子</a>
                </div>
                <span className="more">
                    <a href="/discover/playlist">更多</a>
                    <i>&nbsp;</i>
                </span>
            </div>
            <div className="discover-playlist">
                {
                    recommends.map((item, index = 0) => {
                        let playlistUrl = `https://music.163.com/playlist?id=${item.id}`;
                        let coverUrl = `${item.picUrl}?param=140y140`;
                        return (
                            <div className="playlist-item" key={item.id}>
                                <div className="item-detail">
                                    <a title={item.name} href={playlistUrl}> </a>
                                    <img src={coverUrl} alt="d" />
                                    <div className="item-bottom">
                                        <button className="icon-play" title="播放"></button>
                                        <span className="icon-headset"></span>
                                        <span className="playnumber">{getCount(item.playCount)}</span>
                                    </div>
                                </div>
                                <p>
                                    <a title={item.name} href={playlistUrl}>
                                        {item.name}</a>
                                </p>
                            </div>
                        )
                    })
                }
            </div>

        </Fragment>
    )
}