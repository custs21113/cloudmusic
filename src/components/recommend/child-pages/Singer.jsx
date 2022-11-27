import React, { Fragment, useState, useEffect } from 'react'
import { getSizeImage } from '../../../utils/format-utils';
import {  getSettleSinger } from '../../../service/recommend';

export default function Singer(props) {
    let [singer, setSinger] = useState([]);
    
    let getSinger = async () => {
        try {
            let res = await getSettleSinger();
            setSinger([...res?.data?.artists])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSinger();
    }, []);
    return (
        <Fragment>
            <div className="singer">
                <div className="singer-content">

                    <div className="hd">
                        <span>入驻歌手</span>
                        <a href="https://music.163.com/discover/artist/signed/">查看全部&nbsp;&gt;</a>
                    </div>
                    <div className="singer-list">
                        {
                            singer?.map((item, index) => {
                                return (
                                    <a key={index} href={item.artistHomeUrl}>
                                        <div className="head">
                                            <img alt="歌手头像" src={ getSizeImage(item.headPicUrl, 62 )} />
                                        </div>
                                        <div className="info">
                                            <span className="f-thide">{item?.artistName}</span>
                                            <p className="f-thide">{item?.artistOther}</p>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                    <a className="apply" href="/">申请成为网易音乐人</a>
                </div>
            </div>
        </Fragment>
    )
}