import React, { Fragment,useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getToplistDetail } from '../../../service/toplist';
import { addSongToList, playSongBySelect } from '../../player/store/actionCreators';
export default function Bill(props) {

    const dispatch = useDispatch();
    let [upList, setUpList] = useState([]);
    let [newList, setNewList] = useState([]);
    let [originList, setOriginList] = useState([]);
    let getUpList = async () => {
        try {
            let res = await getToplistDetail(19723756);
            setUpList(res.data.songs)
        } catch (error) {
            console.log(error)
        }
    }
    let getNewList = async () => {
        try {
            let res = await getToplistDetail(3779629);
            setNewList(res.data.songs)
        } catch (error) {
            console.log(error)
        }

    }
    let getOriginList = async () => {
        try {
            let res = await getToplistDetail(2884035);
            // console.log('getOriginList', res.data.playlist.tracks.slice(0, 10));
            setOriginList(res.data.songs)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUpList();
        getNewList();
        getOriginList();
    }, []);
    return (
        <Fragment>
            <div className="bill">
                <div className="bill-hd">
                    <a className="bl-title" href="https://music.163.com/discover/toplist">榜单</a>
                    <span className="bl-more">
                        <a href="https://music.163.com/discover/toplist">更多</a>
                        <i>&nbsp;</i>
                    </span>
                </div>
                <div className="bill-content">
                    <div className="bill-item">
                        <div className="bill-top">
                            <div className="bill-cover">
                                <img src="https://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100" alt="榜单封面" />
                                <a className="msk" href="https://music.163.com/discover/toplist?id=19723756"> </a>
                            </div>
                            <div className="bill-title">
                                <a href="https://music.163.com/discover/toplist?id=19723756" title="飙升榜">飙升榜</a>
                                <div>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </div>
                        <div className="list-content">
                            <div className="list-item">
                                <ol>
                                    {
                                        upList?.map((item, index) => {
                                            let songId = `https://music.163.com/song?id=${item.id}`
                                            return (
                                                <li key={item.id}>
                                                    <span>{index + 1}</span>
                                                    <a href={songId}>{item?.name}</a>
                                                    <div>
                                                        <button className="playBtn" onClick={() => 
                                                            dispatch(playSongBySelect(item.id))
                                                        }></button>
                                                        <button className="addToListBtn" onClick={() => 
                                                            dispatch(addSongToList(item.id))
                                                        }></button>
                                                        <button className="collectBtn"></button>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                                <div className="list-more">
                                    <a href="https://music.163.com/discover/toplist?id=19723756">
                                        查看更多 &gt;
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="bill-item">
                        <div className="bill-top">
                            <div className="bill-cover">
                                <img src="https://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100" alt="榜单封面" />
                                <a className="msk" href="https://music.163.com/discover/toplist?id=19723756"> </a>
                            </div>
                            <div className="bill-title">
                                <a href="https://music.163.com/discover/toplist?id=19723756" title="新歌榜">新歌榜</a>
                                <div>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </div>
                        <div className="list-content">
                            <div className="list-item">
                                <ol>
                                    {
                                        newList?.map((item, index) => {
                                            let songId = `https://music.163.com/song?id=${item.id}`
                                            return (
                                                <li key={item.id}>
                                                    <span>{index + 1}</span>
                                                    <a href={songId}>{item?.name}</a>
                                                    <div>
                                                        <button className="playBtn" onClick={async () => {
                                                            dispatch(playSongBySelect(item.id))
                                                        }}></button>
                                                        <button className="addToListBtn" onClick={() => {
                                                            dispatch(addSongToList(item.id));
                                                        }}></button>
                                                        <button className="collectBtn"></button>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                                <div className="list-more">
                                    <a href="https://music.163.com/discover/toplist?id=19723756">
                                        查看更多 &gt;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bill-item">
                        <div className="bill-top">
                            <div className="bill-cover">
                                <img src="https://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100" alt="榜单封面" />
                                <a className="msk" href="https://music.163.com/discover/toplist?id=19723756"> </a>
                            </div>
                            <div className="bill-title">
                                <a href="https://music.163.com/discover/toplist?id=19723756" title="飙升榜">原创榜</a>
                                <div>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                        </div>
                        <div className="list-content">
                            <div className="list-item">
                                <ol>
                                    {
                                        originList?.map((item, index) => {
                                            let songId = `https://music.163.com/song?id=${item.id}`
                                            return (
                                                <li key={item.id}>
                                                    <span>{index + 1}</span>
                                                    <a href={songId}>{item?.name}</a>
                                                    <div className="opt">
                                                        <button className="playBtn" onClick={async () => {
                                                            dispatch(playSongBySelect(item.id))
                                                        }}></button>
                                                        <button className="addToListBtn" onClick={() => {
                                                            dispatch(addSongToList(item.id));
                                                        }}></button>
                                                        <button className="collectBtn"></button>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                                <div className="list-more">
                                    <a href="https://music.163.com/discover/toplist?id=19723756">
                                        查看更多 &gt;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}