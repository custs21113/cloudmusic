import React, { useState, useEffect, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Login } from '../../components/header';
import { Select, Button, List, Slider } from 'antd';
import { getPlayUrl } from '../../utils/format-utils';
import './index.scss';
import { playSongBySelect } from '../../components/player/store/actionCreators';
import { switchSong, nextSong, previousSong, addSongs, clearSonglist } from './store/actionCreators';
import { getSearchDefault } from '../../service/search';
const { Option } = Select;
const ListItem = List;
export default function Friend() {
    let dispatch = useDispatch();
    let audioRef = useRef();
    let [loginModalVisible, setLoginModalVisible] = useState(false);
    let [keyWord, setKeyWord] = useState(undefined)
    let [options, setOptions] = useState([]);
    let [flag, setFlag] = useState(true);
    let [num, setNum] = useState(30);
    let { isLogin, isPlay, songIndex, songlist, current } = useSelector((state) => ({
        isLogin: state['login']['isLogin'],
        isPlay: state['friend']['isPlay'],
        songIndex: state['friend']['songIndex'],
        songlist: state['friend']['songlist'],
        current: state['friend']['current']
    }), shallowEqual);
    useEffect(() => {
        console.log(current, songlist)
        if (songlist.length !== 0) {

            audioRef.current.src = getPlayUrl(songlist[songIndex].value);
            isPlay && audioRef.current.play();


        }
        //`https://music.163.com/song/media/outer/url?id=1888915574.mp3`;
    }, [songIndex])
    useEffect(() => {
        isPlay ? audioRef.current.play() : audioRef.current.pause();
    }, [isPlay])
    function debounce(fn, time = 1000) {
        let timer;
        return function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.call(this, ...arguments);
            }, time)
        }
    }
    let searchSong = async (keyword) => {
        if (keyword) {
            console.log('keyword', keyword);
            let res = await getSearchDefault(keyword);
            let { data: { result: { songs } } } = res;
            console.log('songs', songs);
            songs = songs.map(item => {
                return {

                    label: item.name,
                    value: item.id,
                    singer: item.ar[0].name
                }
            })
            setOptions(songs);

            setKeyWord(keyword);
        } else {
            setOptions([]);
        }
    }

    let handleChange = (value) => {
        console.log('handleChange', value);
        setKeyWord(value);
    }
    return (
        <div className="friend">
            <div className="friend-content">
                {
                    !isLogin ? <section style={{ width: "100%", height: "100px", backgroundColor: "red" }}>
                        <div class="search" style={{
                            width: "158px",
                            height: "32px",
                            backgroundPosition: "0 -99px",
                            backgroundColor: "#fff",
                            borderRadius: "32px",
                            border: "1px solid black;",
                            zIndex: "100",
                        }}>

                            {/* <Select
                                showSearch
                                defaultValue={keyWord}
                                placeholder={"音乐/视频/电台/用户"}
                                showArrow={false} bordered={false}
                                style={{ width: "100%", zIndex: "0",
                                fontSize: "12px" }}
                                defaultActiveFirstOption={false}
                                notFoundContent={null}
                                filterOption={false}
                                onChange={
                                    handleChange
                                }
                                onSearch={
                                    debounce(searchSong)
                                }
                                onSelect={() => {
                                    console.log('onSelect', options[parseInt(keyWord)])
                                    dispatch(playSongBySelect(keyWord))
                                }}
                                options={options}
                            >
                            </Select> */}
                            <Select
                                showSearch
                                defaultValue={keyWord}
                                placeholder={"音乐/视频/电台/用户"}
                                showArrow={false} bordered={false}
                                style={{
                                    width: "100%", zIndex: "0",
                                    fontSize: "12px"
                                }}
                                defaultActiveFirstOption={false}
                                notFoundContent={null}
                                filterOption={false}
                                onChange={
                                    handleChange
                                }
                                onSearch={
                                    debounce(searchSong)
                                }
                                onSelect={() => {
                                    console.log('onSelect', options[parseInt(keyWord)])
                                    dispatch(playSongBySelect(keyWord))
                                }}
                                options={options}
                            >
                            </Select>

                        </div>
                        <div>
                            <section>
                                <div>
                                    <b>{songIndex} </b>
                                    <Button onClick={() => {
                                        console.log(options);
                                        dispatch(addSongs(options));
                                    }}>Add Options To SongList</Button>
                                    <Button onClick={() => {
                                        console.log(songlist);
                                        dispatch(clearSonglist());
                                    }}>Clear Songlist</Button>
                                </div>
                                <div>
                                    <Button onClick={() => {
                                        dispatch(previousSong())
                                    }}> &lt;- </Button>


                                    <Button onClick={() => {
                                        dispatch(switchSong())
                                    }} >{isPlay ? 'Pause' : 'Play'}</Button>

                                    <Button onClick={() => {
                                        dispatch(nextSong())
                                    }}> -&gt;</Button>
                                </div>
                            </section>
                            <section >
                                <List style={{
                                    height: "200px",
                                    overflow: 'auto'
                                }}>
                                    {
                                        songlist.map((item, index) => {
                                            return (
                                                <ListItem key={item.value} onClick={
                                                    () => {
                                                        dispatch(playSongBySelect(item.value))
                                                    }
                                                }>{index + 1} - {item.label} - {item.singer}</ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </section>
                        </div>
                        <Slider defaultValue={num} TooltipVisible={false} onChange={(value) => setNum(value)} tipFormatter={ null} />
                        <audio
                            ref={audioRef}
                        ></audio>

                    </section> : <div className="friend-pic">
                        <button onClick={() => setLoginModalVisible(true)}>立即登录</button>
                        <Login {...{ loginModalVisible, setLoginModalVisible }} />
                    </div>
                }
            </div>
        </div >
    )
}
