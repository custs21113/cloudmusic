import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getHotRecommends, getNewAlbums, getSettleSinger, getDjradios } from '../../service/recommend';
import { getToplistDetail } from '../../service/toplist';
import { getCount } from '../../utils/format-utils';
import { changeCurrentSong, addSongToList, playSongById, playSongBySelect } from '../player/store/actionCreators';

import store from '../../store';
import NDList from './child-pages/NDList';
import Singer from './child-pages/Singer';
import Djradio from './child-pages/Djradio';
import DiscoverPlaylist from './child-pages/DiscoverPlaylist';
import Bill from './child-pages/Bill';
import './index.scss';

export default function Recommend(props) {
    return (
        <div className="recommend">
            <div className="discover-module">
                <div className="discover-content">
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
                    <DiscoverPlaylist></DiscoverPlaylist>

                    <NDList></NDList>


                    <Bill></Bill>

                </div>

                <div className="discover-side">
                    <div className="myinfo">
                        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                        <button onClick={()=>alert('登录功能尚未完成')}>用户登录</button>
                    </div>
                    <Singer></Singer>
                    <Djradio></Djradio>
                </div>
            </div>
        </div >
    )
}

