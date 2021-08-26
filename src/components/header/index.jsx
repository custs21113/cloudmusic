// import { Switch } from 'antd';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss'
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
                                        ref = { this.inputRef }type="text" 
                                        onFocus={ ()=>{ this.inputRef.current.placeholder=''}}
                                        onBlur={()=>{if(this.inputRef.current.value==='')this.inputRef.current.placeholder="音乐/视频/电台/用户"}} 
                                        placeholder="音乐/视频/电台/用户" />
                                </span>
                            </div>
                            <a className="creator" href="https://music.163.com/login?targetUrl=%2Fcreatorcenter">创作者中心</a>
                            <a className="login" href="/login">登录</a>
                        </div>
                    </div>
                    <div className="red-line"></div>
                    {this.state.hasScrolled ? <a className="backtop" href="#header" onClick={this.handleBacktop} > </a> : <></>}
                </div>

            </Fragment>
        )
    }
}
