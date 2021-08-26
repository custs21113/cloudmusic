import React, { Fragment, useState, useRef, useEffect, useCallback } from 'react'
import { getSizeImage, formatMinuteSecond, getPlayUrl } from '../../utils/format-utils';
import store from '../../store'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { playSongById, addSongToList } from './store/actionCreators';
import './index.scss';
import { Slider } from 'antd';

export default function Player(props) {
    let dispatch = useDispatch();
    let audioRef = useRef();
    let playbarRef = useRef();
    let bufferRef = useRef();
    let [isPlaying, setIsPlaying] = useState(false);
    let [isVolumeBarShow, setIsVolumeBarShow] = useState(false);
    let [currentTime, setCurrentTime] = useState(0);
    let isChanging = false;

    let { songlist, currentSongIndex, currentSong, firstLoad } = useSelector((state) => ({
        songlist: state['player']['songlist'],
        currentSongIndex: state['player']['currentSongIndex'],
        currentSong: state['player']['currentSong'],
        firstLoad: state['player']['firstLoad'],
    }), shallowEqual);

    useEffect(() => {
        console.log('34', songlist.length, songlist)
        if (songlist.length === 1) {
            console.log(`songlist'length is 1, play the first song`)
            audioRef.current.src = getPlayUrl(currentSong?.id);
            setIsPlaying(true + Math.random())
            console.log('uest44>>>>', store.getState().player)
            console.log(audioRef.current.src)
        } else {
            setIsPlaying(true + Math.random())
            console.log(`songlist's length is not change, loading the songlist: `, songlist)
            console.log('uest51>>>>', store.getState().player.songlist)
        }
    }, [songlist, currentSongIndex]);
    useEffect(() => {
        console.log('songDetail:__', currentSong)
        audioRef.current.src = getPlayUrl(currentSong.id);
        bufferRef.current.style.width = '0px';
    }, [currentSong, firstLoad])

    useEffect(() => { // 切歌时播放
        isPlaying && audioRef.current.play();
        bufferRef.current.style.width = '0px';

        console.log('61......', currentSongIndex, audioRef.current.src)
    }, [isPlaying]);

    let printTest = () => {
        console.log(currentSongIndex, store.getState().player.songlist, audioRef.current.currentTime, currentSong);
    }
    let addTest = () => {
        let id1 = 1871099430;
        dispatch(addSongToList(id1));
        console.log(`songIndex: ${currentSongIndex} --- ${songlist}`)
    }
    let play = useCallback(
        () => {
            setIsPlaying(!isPlaying);
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
        }, [isPlaying]
    )
    let prev = () => {
        if (songlist.length === 0) {
            alert("error: songlist is null")
        } else {
            dispatch(playSongById(-1));
            setIsPlaying(false + Math.random());
        }
        console.log(`songIndex: ${currentSongIndex} --- ${songlist}`)
    }
    let nxt = () => {
        if (songlist.length === 0) {
            alert("error: songlist is null")
        } else {
            dispatch(playSongById(1));
            setIsPlaying(false + Math.random());
        }
        console.log(`songIndex: ${currentSongIndex} --- ${songlist}`)
    }
    let handleTimeEnd = () => {
        let duration = currentSong.dt;
        playbarRef.current.style['width'] = (((0 * 1000) / duration)) * 466 + 'px';
        bufferRef.current.style.width = '0px';
        dispatch(playSongById(1));
        setIsPlaying(true + Math.random());
        console.log('HandleTimeEnd')
    }

    let timeUpdate = (e) => {
        let currentTime = e.target.currentTime;
        let duration = currentSong.dt;
        if (!isChanging) {
            setCurrentTime(currentTime * 1000);
        }

        let buffered = e.target.buffered;
        playbarRef.current.style['width'] = (((currentTime * 1000) / duration)) * 466 + 'px';
        if (buffered.length) {
            bufferRef.current.style.width = (((buffered.end(buffered.length - 1) * 1000) / duration)) * 466 + 'px';
        } else {
            bufferRef.current.style.width = '0px';
        }
    }
    return (
        <Fragment>
            {/* <button className="prinntTest" onClick={printTest}>PrintTEST</button>
            <button className="addTest" onClick={addTest}>AddTest</button>
            <div className="songlist">
                {
                    songlist.map((item, index) => {
                        return <a key={index}>{item}</a>

                    })
                }
                <br />
                <p>{currentSong.dt}-{formatMinuteSecond(currentSong.dt)}-{ currentSong.dt / 3600 }</p>
                <Slider min = {0} max={parseInt(currentSong.dt/1000)} tooltipVisible={false} value={currentTime/1000} onChange={(value)=>setCurrentTime(value)} onAfterChange={
                    (value)=>{
                        audioRef.current.currentTime = value;
                    }

                }></Slider>
            </div> */}
            <div className="player">
                <div className="bg"></div>
                <div className="player-content">
                    <div className="buttons">
                        <button className="previous" onClick={prev} title="上一首(ctrl+←)"></button>
                        <button className={isPlaying ? "pause" : "play"} title="播放/暂停(p)" onClick={play}>播放/暂停</button>
                        <button className="next" onClick={nxt} title="下一首(ctrl+→)">下一首</button>
                    </div>
                    <div className="head">
                        <img src={currentSong?.al?.picUrl ? getSizeImage(currentSong?.al?.picUrl, 34) : "http://s4.music.126.net/style/web2/img/default/default_album.jpg"} alt="专辑封面" />
                        <a href="/"> </a>
                    </div>
                    <div className="play">
                        <div className="play-left">
                            <div className="song-info">
                                <a href={`https://music.163.com/song?id=${currentSong.id}`}>{currentSong?.name}</a>
                                {currentSong.mv ? <a href={`https://music.163.com/mv?id=${currentSong.mv}`}>MV</a> : <a> </a>}
                                <span>
                                    <span>
                                        {
                                            currentSong?.ar && currentSong?.ar.map(item => <a className="test" onClick={() => alert({ ...item })} key={item.id}>{item.name}</a>)

                                        }
                                    </span>
                                </span>
                            </div>
                            <div className="player-bar">
                                
                                <div className="ready" ref={bufferRef}></div>
                                <div ref={playbarRef} className="current">
                                    <span><i></i></span>
                                </div>
                            </div>

                        </div>
                        <span className="time">
                            <em>{currentTime === currentSong.dt ? '00:00/00:00' : formatMinuteSecond(currentTime)}/{currentSong.dt ? formatMinuteSecond(currentSong.dt) : '00:00'}</em>
                        </span>
                    </div>
                    <div className="operation">
                        <button className="collection">Collection</button>
                        <button className="share">Share</button>
                    </div>
                    <div className="control">
                        {isVolumeBarShow ? <div className="volume-bar"><Slider defaultValue={0.3} onChange={(value) => { audioRef.current.volume = value / 100 }} min={0} max={100} step={1} vertical={true} style={{ 'height': '90px' }}></Slider>
                        </div> : <></>}

                        <button className="volume" onClick={() => setIsVolumeBarShow(!isVolumeBarShow)}>音量</button>
                        <button className="mode">播放模式</button>
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                onTimeUpdate={timeUpdate}
                onEnded={handleTimeEnd}
            ></audio>
        </Fragment>
    )
}

