import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Login } from '../../components/header';
import './index.scss';

export default function Mine() {
    let [loginModalVisible, setLoginModalVisible] = useState(false);
    let { isLogin } = useSelector((state) => ({
        isLogin: state['login']['isLogin'],
    }), shallowEqual);
    return (
        <div className="mine">
            <div className="mine-content">
                {
                    isLogin ? <>wode</> :
                        <div className="mine-pic">
                            <button onClick={() => setLoginModalVisible(true)}>立即登录</button>
                            <Login {...{ loginModalVisible, setLoginModalVisible }} />
                        </div>
                }
            </div>
        </div>
    )
}
