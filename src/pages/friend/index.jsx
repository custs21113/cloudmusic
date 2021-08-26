import React from 'react'
import './index.scss';
export default function Friend() {
    return (
        <div className="friend">
            <div className="friend-content">
                <div className="friend-pic">
                <button onClick={() => alert('来个弹窗')}>立即登录</button>
                </div>
            </div>
        </div>
    )
}
