import React, { Fragment } from 'react'
import { NavLink} from 'react-router-dom'
import './index.scss'
export default function Navbar() {
    return (
        <Fragment>
            <div className="navbar">
                <div className="narbar-content">
                    <div className="nav">
                        <NavLink to="/discover/recommend" activeClassName="link-active"><em>推荐</em></NavLink>
                        <NavLink to="/discover/toplist" activeClassName="link-active"><em>排行榜</em></NavLink>
                        <NavLink to="/discover/playlist" activeClassName="link-active"><em>歌单</em></NavLink>
                        <NavLink to="/discover/djradio" activeClassName="link-active"><em>主播电台</em></NavLink>
                        <NavLink to="/discover/artist" activeClassName="link-active"><em>歌手</em></NavLink>
                        <NavLink to="/discover/album" activeClassName="link-active"><em>新碟上架</em></NavLink>
                    </div>
                </div>
            </div>
            {/* <Switch> */}
                {/* <Route path="/discover/recommend" component={ RecommendPage }></Route>
                <Route path="/discover/toplist" render={()=> <h1>Toplist</h1>}></Route>
                <Redirect to="/discover/recommend"/> */}
            {/* </Switch> */}
        </Fragment>
    )
}
