import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { getToplistInfo, getToplistDetail } from '../../../service/toplist';
import { getSizeImage, } from '../../../utils/format-utils';

import ToplistMain from './ToplistMain';
import './index.scss'
export default function Toplist() {
    let [list, setList] = useState([]);
    let [playlist, setPlaylist] = useState({});
    let [tracks, setTracks] = useState([]);

    useEffect(async () => {
        let res = await getToplistInfo();
        console.log(res.data);
        setList(res.data.list);
        let res1 = await getToplistDetail(19723756);
        console.log(res1.data)
        console.log(res1?.data?.playlist?.tracks);
        setPlaylist(res1.data.playlist);
        setTracks(res1?.data?.playlist.tracks);
    }, [])
    return (
        <Fragment>
            <div className="main-content">
                <div className="toplist">
                    <div className="left-side">
                        <div className="rank-title">
                            云音乐特色榜
                        </div>
                        {
                            list.slice(0, 4).map((item) => {
                                return (
                                    <NavLink to={"/discover/toplist/" + item.id} className="ls-list-item" key={item.id}>
                                        <div className="item-content">

                                            <img src={getSizeImage(item.coverImgUrl, 40)} alt="榜单图片" />
                                            <div className="toplist-info">
                                                <div>
                                                    <a>{item.name}</a>
                                                </div>
                                                <div>{item.updateFrequency}</div>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                        <div className="rank-title">全球媒体榜</div>
                        {
                            list.slice(5, list.length - 1).map((item) => {
                                return (
                                    <NavLink to={"/discover/toplist/" + item.id} className="ls-list-item" key={item.id}>
                                        <div className="item-content">

                                            <img src={getSizeImage(item.coverImgUrl, 40)} alt="榜单图片" />
                                            <div className="toplist-info">
                                                <div>
                                                    <a>{item.name}</a>
                                                </div>
                                                <div>{item.updateFrequency}</div>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }

                    </div>
                    <div className="toplist-main">
                        <Switch>
                            <Route path="/discover/toplist/:id" component={ToplistMain}></Route>
                            <Redirect to="/discover/toplist/19723756" />
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
