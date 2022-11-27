import React, { Fragment, useLayoutEffect, useState } from 'react';
import { getDjradios } from '../../../service/recommend';

export default function Djradio(props) {


    let [djradio, setDjradio] = useState([]);

    let getDjradio = async () => {
        try {
            let res = await getDjradios();
            setDjradio([...res?.data?.djradios])
        } catch (error) {
            console.log(error)
        }
    }
    useLayoutEffect(() => {
        // getDjradio();
    }, [])
    return (
        <Fragment>
            <div className="dj">
                <div className="dj-content">
                    <div className="dj-hd">
                        热门主播
                    </div>
                    <div className="dj-list">
                        {
                            djradio?.map((item, index) => {
                                return (
                                    <div className="dj-item" key={index}>
                                        <a href={item.djradioUrl}>
                                            <img src={item.djradioPic} alt="dj头像" />
                                        </a>
                                        <div className="dj-info">
                                            <p>
                                                <a href={item.djradioUrl}>{item.djradioName}</a>
                                            </p>
                                            <p>{item.djradioDetail}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}