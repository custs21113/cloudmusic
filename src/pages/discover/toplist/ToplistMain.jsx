import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getToplistInfo, getToplistDetailAll } from '../../../service/toplist';
import { getSizeImage, formatMinuteSecond } from '../../../utils/format-utils';
import { addSongToList } from '../../../components/player/store/actionCreators';
import './index.scss'
export default function Toplist(props) {
    let { id } = props.match.params;
    let [playlist, setPlaylist] = useState({});
    let [tracks, setTracks] = useState([]);
    let [trackCount, setTrackCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(async () => {
        let res = await getToplistDetailAll(id);
        setPlaylist(res?.data?.playlist);
        setTracks(res?.data?.playlist?.tracks);
        setTrackCount(res?.data?.playlist?.trackCount);
    }, [id])
    return (
        <Fragment>

            <div className="rank-info">
                {/* <div> */}
                <div className="cover">
                    <img src={getSizeImage(playlist?.coverImgUrl, 140)} alt="" />
                    <span className="msk"></span>
                </div>
                <div className="pcsdc">{/* play/collect/share/download/comment */}
                    <span className="rank-name">{playlist.name}</span>
                    <span>{playlist.updateTime}</span>
                    <div>
                        <button>Play</button>
                        <button>{playlist.subscribedCount}</button>
                        <button>{playlist.shareCount}</button>
                        <button onClick={() => window.open(`http://www.baidu.com`)}> 下载 </button>
                        <button><i></i></button>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <div className="songlist">
                <div className="songlist-hd">
                    <span>歌曲列表</span>
                    <div className="songcount">{trackCount}首歌</div>
                    <span>播放:<div className="playcount">{playlist.playCount}</div>次</span>
                </div>
                <div className="songlist-content">
                    <table>
                        <thead>
                            <tr>
                                <th className="first-th">
                                </th>
                                <th className="seconde-th">
                                    <div className="seconde-th">标题</div>
                                </th>
                                <th className="thrid-th">
                                    <div>时长</div>
                                </th>
                                <th className="forth-th">
                                    <div>歌手</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tracks.length > 0 && tracks?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {
                                                index < 3 ?
                                                    <td className="ott-td">
                                                        <div>
                                                            <a href={`https://music.163.com/song?id=${item.id}`}>
                                                                <img src={getSizeImage(item.al.picUrl, 50)} />
                                                            </a>
                                                            <div>
                                                                <a href="">{item.name}</a>
                                                            </div>
                                                        </div>
                                                    </td> :
                                                    <td><a href="">{item.name}</a></td>}
                                            <td><p>{formatMinuteSecond(item.dt)}</p>
                                                <div className="opt">
                                                    <button onClick={() => dispatch(addSongToList(item.id))} title="播放"></button>
                                                    <button onClick={() => alert('尚不支持收藏')} title="收藏"></button>
                                                    <button onClick={() => alert('尚不支持分享')} title="分享"></button>
                                                    <button onClick={() => alert('尚不支持下载')} title="下载"></button>
                                                </div>
                                            </td>
                                            <td><a>{item.ar[0].name}</a></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}