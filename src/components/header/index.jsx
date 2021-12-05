import { Button, Modal, Input, BackTop, Space, Avatar, Select } from 'antd';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
// import { login } from '../../service/login';
import store from '../../store';
import { loginAction } from './store/actionCreators';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import './index.scss';
import { getSearchDefault } from '../../service/search';
import { playSongBySelect } from '../player/store/actionCreators';
const Option = Select.Option;
// const { Row, Col} = Grid;
export default function Header() {
    let inputRef = useRef();
    let selectRef = useRef();
    let dispatch = useDispatch();
    let [loginModalVisible, setLoginModalVisible] = useState(false);
    let [options, setOptions] = useState([]);
    let { isLogin, profile } = useSelector((state) => ({
        isLogin: state['login']['isLogin'],
        profile: state['login']['profile'],
        songlist: state['player']['songlist']
    }), shallowEqual);
    // useEffect(async () => {
    //     let res = await getSearchDefault();
    //     let { data: {showKeyword} } = res;
    //     set
    //     console.log(res);
    // }, [])
    let searchSong = async (keywords) => {
        if(!keywords) return ;
        let data = await getSearchDefault(keywords);
        setOptions(data.data.result.songs);
        console.log(data.data.result.songs)
    }
    let playSong = (id) => {
        dispatch(playSongBySelect(id));
    }
    return (
        <Fragment>
            <div className="header" id="header">
                <div className="header_content">
                    <div className="header_left">
                        <a className="logo" href="/">网易云音乐</a>
                        <ul>
                            <NavLink to="/discover" activeClassName="link-active">发现音乐
                                <i className="icon"></i></NavLink>
                            <NavLink to="/mine" activeClassName="link-active">我的音乐
                                <i className="icon"></i></NavLink>
                            <NavLink to="/friend" activeClassName="link-active">朋友
                                <i className="icon"></i></NavLink>
                            <a href="https://music.163.com/store/product">商城</a>
                            <a href="https://music.163.com/st/musician">音乐人</a>
                            <a href="https://music.163.com/#/download" activeClassName="link-active">下载客户端
                                <i className="icon"></i></a>
                        </ul>
                    </div>
                    <div className="header_right">
                        <div className="search" style={{position: "relative"}}>
                            <span>
                                <input
                                    ref={inputRef} type="text"
                                    onFocus={() => { inputRef.current.placeholder = '' }}
                                    onBlur={() => { 
                                        if (inputRef.current.value === '') {
                                            inputRef.current.placeholder = "音乐/视频/电台/用户" 
                                        } else {
                                            debounce(() => searchSong(inputRef.current.value))
                                        }
                                    }}
                                    onChange={debounce(() => searchSong(inputRef.current.value))}
                                    placeholder="音乐/视频/电台/用户" />
                            </span>
                                
                                    {/* <Select  showSearch ref={selectRef}
                                     onChange={(value) => playSong(options[value].id)} style={{position: "absolute", top: "20px", right: "20px", width: "100%", borderRadius: ""}}>
                                        {
                                            options.map((item, index) => {
                                                return (
                                                    <Option key={index}>
                                                        {item.name}-{item.id}
                                                    </Option>
                                                )
                                            })
                                        }
                                    </Select> */}
                        </div>
                        <a className="creator" href="https://music.163.com/login?targetUrl=%2Fcreatorcenter">创作者中心</a>
                        {isLogin ? <Avatar className="login" src={profile.avatarUrl}></Avatar> : <Button className="login" type="link" onClick={() => setLoginModalVisible(true)} >登录</Button>}
                        <Login {...{ loginModalVisible, setLoginModalVisible }} />
                    </div>
                </div>
                <div className="red-line"></div>
                <BackTop className="backtop">
                    <a className="backtop"> </a>
                </BackTop>
            </div>

        </Fragment>
    )
}
function debounce(fn, time = 1000) {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.call(this);
        }, time)
    }
}
export function Login({ ...props }) {
    let { loginModalVisible, setLoginModalVisible } = props;
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let { isLogin } = store.getState().login;
    let dispatch = useDispatch();
    let handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    let handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    function test() {
        dispatch(loginAction({ phone: 13631044564, password: '000123456' }));
        isLogin = store.getState().login.isLogin;
    }

    return (
        // <Fragment>

        <Modal title={"手机号登录"}
            visible={loginModalVisible}
            okText={"登录"}
            footer={null}
            onOk={() => {
                setLoginModalVisible(false);
            }}
            onCancel={
                () => setLoginModalVisible(false)
            }
        >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Space direction="vertical">
                    <Input placeholder={"请输入手机号"} value={phone} onChange={handlePhoneChange} />
                    <Input placeholder={"请输入密码"} value={password} onChange={handlePasswordChange} />
                    <Button style={{ width: "100%" }} type={"primary"} onClick={() => {
                        test();
                        setLoginModalVisible(false);
                    }}>登录</Button>
                </Space>
            </div>
        </Modal>
        // </Fragment>

    )
}