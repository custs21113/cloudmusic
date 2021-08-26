import React, { Fragment,useState,useEffect } from 'react'

import { getHotRecommends } from '../../../service/recommend';
import { getCount } from '../../../utils/format-utils';

export default function DiscoverPlaylist(props) {

    let [recommends, setRecommends] = useState([]);
    
    let getRecommends = async () => {
        try {
            let res = await getHotRecommends(8)
            setRecommends([...res.data.result]);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getRecommends();
    }, []);
    return (
        <Fragment>
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