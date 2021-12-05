import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

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
import { loginAction } from '../header/store/actionCreators';
import { Login } from '../header';
import { getSizeImage } from '../../utils/format-utils';

import './index.scss';

export default function Recommend(props) {
    let [albums, setAlbums] = useState([]);
    let [singer, setSinger] = useState([]);
    let [djradio, setDjradio] = useState([]);
    let [upList, setUpList] = useState([]);
    let [newList, setNewList] = useState([]);
    let [originList, setOriginList] = useState([]);
    let [recommends, setRecommends] = useState([]);
    let [loginModalVisible, setLoginModalVisible] = useState(false);
    let { isLogin, profile } = useSelector((state) => ({
        isLogin: state['login']['isLogin'],
        profile: state['login']['profile'],
    }), shallowEqual);
    const dispatch = useDispatch();

    let getRecommends = async () => {
        try {
            let res = await getHotRecommends(8)
            setRecommends([...res.data.result]);
        } catch (error) {
            console.log(error)
        }
    }
    let getAlbums = async () => {
        try {
            let res = await getNewAlbums();
            setAlbums([...res?.data?.albums]);
        } catch (error) {
            console.log(error)
        }
    }
    let getSinger = async () => {
        try {
            let res = await getSettleSinger();
            console.log('singer', res.data.artists)
            setSinger([...res?.data?.artists])
        } catch (error) {
            console.log(error)
        }
    }
    let getDjradio = async () => {
        try {
            let res = await getDjradios();
            setDjradio([...res?.data?.djradios])
        } catch (error) {
            console.log(error)
        }
    }
    let getUpList = async () => {
        try {
            let res = await getToplistDetail(19723756);
            setUpList([...res.data.playlist.tracks.slice(0, 10)])
        } catch (error) {
            console.log(error)
        }
    }
    let getNewList = async () => {
        try {
            let res = await getToplistDetail(3779629);
            setNewList([...res.data.playlist.tracks.slice(0, 10)])
        } catch (error) {
            console.log(error)
        }

    }
    let getOriginList = async () => {
        try {
            let res = await getToplistDetail(2884035);
            setOriginList([...res.data.playlist.tracks.slice(0, 10)])
        } catch (error) {
            console.log(error)
        }
    }

    function test() {
        dispatch(loginAction({ phone: 13631044564, password: '000123456' }));
    }
    useEffect(() => {
        getRecommends();
        getAlbums();
        getSinger();
        getDjradio();
        getUpList();
        getNewList();
        getOriginList();
    }, []);
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

                    <NDList props={albums}></NDList>


                    <Bill></Bill>

                </div>

                <div className="discover-side">
                    <div className="myinfo">
                        {isLogin ? <MyInfo/>: <>
                            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                            <button onClick={() => {
                                setLoginModalVisible(true);
                            }}>用户登录</button>
                        </>}
                        <Login {...{ loginModalVisible, setLoginModalVisible }} />
                    </div>
                    <Singer props={singer}></Singer>
                    <Djradio props={djradio}></Djradio>
                </div>
            </div>
        </div >
    )
}

function MyInfo({...props}) {

    let { isLogin, profile } = useSelector((state) => ({
        isLogin: state['login']['isLogin'],
        profile: state['login']['profile'],
    }), shallowEqual);

    return (
        <div>
            <div>
                <a >
                    <img src={getSizeImage(profile.avatarUrl, 80)} />
                </a>
                <div class="info">
                    <h4>{profile.nickname}</h4>
                </div>
            </div>
            <div>
                动态： {profile.eventCount} 关注：{profile.follows} 粉丝：{profile.followeds}
            </div>
        </div>
    )
}