import { Button, Modal, Col, Input, Row, Space, Avatar } from 'antd';
import React, { Component, Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { login } from '../../service/login';
import store from '../../store';
import { loginAction } from './store/actionCreators';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import './index.scss';
// const { Row, Col} = Grid;
export default class Header extends Component {
    state = {
        hasScrolled: false
    }
    inputRef = React.createRef();
    handleBacktop = () => {
        document.documentElement.scrollTop = 0
    }
    componentDidMount() {
        window.onscroll = this.onScroll;
    }
    component 
    onScroll = () => {
        if (document.documentElement.scrollTop > 0 && !this.state.hasScrolled) {
            this.setState({ hasScrolled: true })
        } else if (document.documentElement.scrollTop <= 0 && this.state.hasScrolled) {
            this.setState({ hasScrolled: false })
        }
    }
    render() {
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
                            <div className="search">
                                <span>
                                    <input
                                        ref={this.inputRef} type="text"
                                        onFocus={() => { this.inputRef.current.placeholder = '' }}
                                        onBlur={() => { if (this.inputRef.current.value === '') this.inputRef.current.placeholder = "音乐/视频/电台/用户" }}
                                        placeholder="音乐/视频/电台/用户" />
                                </span>
                            </div>
                            <a className="creator" href="https://music.163.com/login?targetUrl=%2Fcreatorcenter">创作者中心</a>
                            {/* <a className="login" href="/login">登录</a> */}
                            <Login></Login>
                            {/* <Button className="login" type="link" onClick={() => {
                                this.setState({ loginModalVisible: true })
                            }}>登录</Button>
                            <Modal title={"手机号登录"}
                                visible={this.state.loginModalVisible}
                                okText={"登录"}
                                onOk={() => {
                                    console.log('login')
                                    this.setState({ loginModalVisible: false })
                                }}
                                onCancel={
                                    () => this.setState({ loginModalVisible: false })
                                }
                                footer={null}
                            >
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Space direction="vertical">
                                        <Input placeholder={"请输入手机号"} value={this.state.phone} onChange={this.handlePhoneChange} />
                                        <Input placeholder={"请输入密码"} value={this.state.password} onChange={this.handlePasswordChange} />
                                        <Button style={{ width: "100%" }} type={"primary"} onClick={
                                            this.test
                                            // ()=>{
                                            // let {phone, password } = this.state;
                                            // login({phone, password});
                                            // login({phone, password}).then(res => {
                                            //     let {data, status} = res;
                                            //     if(status === 200) {
                                            //         this.setState({data}, () => console.log(this.state.data))
                                            //     }
                                            // }).catch(err => {
                                            //     console.log(err);
                                            // });
                                            // }
                                        }
                                        >登录</Button>
                                        <Avatar></Avatar>
                                    </Space>
                                </div>
                            </Modal> */}
                        </div>
                    </div>
                    <div className="red-line"></div>
                    {this.state.hasScrolled ? <a className="backtop" href="#header" onClick={this.handleBacktop} > </a> : <></>}
                </div>

            </Fragment>
        )
    }
}

function Login() {
    let [loginModalVisible, setLoginModalVisible] = useState(false);
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let {isLogin, profile} = store.getState().login;
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
        debugger
    }
    useEffect(()=>{
        console.log(store.getState().login);
    }, [])
    return (
        <Fragment>
            {/* <Button className="login" type="link" onClick={() => {
                setLoginModalVisible(true);
            }}>登录</Button> */}
            
            { isLogin ? <Avatar  className="login" src={profile.avatarUrl}></Avatar> : <Button className="login" type="link" onClick={() => { setLoginModalVisible(true) }}>登录</Button> }
            <Modal title={"手机号登录"}
                visible={loginModalVisible}
                okText={"登录"}
                onOk={() => {
                    setLoginModalVisible(false);
                }}
                onCancel={
                    () => setLoginModalVisible(false)
                }
                footer={null}
            >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Space direction="vertical">
                        <Input placeholder={"请输入手机号"} value={phone} onChange={handlePhoneChange} />
                        <Input placeholder={"请输入密码"} value={password} onChange={handlePasswordChange} />
                        <Button style={{ width: "100%" }} type={"primary"} onClick={ () => {
                            test();
                            setLoginModalVisible(false);
                        } }>登录</Button>
                    </Space>
                </div>
            </Modal>
        </Fragment>

    )
}