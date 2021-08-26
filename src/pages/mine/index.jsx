import React from 'react'
import './index.scss'
export default function Mine() {
    return (
        <div className="mine">
            <div className="mine-content">
                <div className="mine-pic">
                    <button onClick={() => alert('来个弹窗')}>立即登录</button>
                </div>
            </div>
        </div>
    )
}
