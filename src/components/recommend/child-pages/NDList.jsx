import React, { Fragment, useRef, useEffect, useState } from 'react';
import { getNewAlbums } from '../../../service/recommend'
import { Carousel } from 'antd';

export default function NDList(props) {
    let ablumRollerRef = useRef();
    let [albums, setAlbums] = useState([]);
    let getAlbums = async () => {
        try {
            let res = await getNewAlbums();
            setAlbums([...res?.data?.albums]);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAlbums()
    }, [])

    return (
        <Fragment>
            <div className="new-disk-content">
                <div className="nd-header">
                    <a className="nd-title" href="/discover/playlist">新碟上架</a>
                    <span className="nd-more">
                        <a href="/discover/playlist">更多</a>
                        <i>&nbsp;</i>
                    </span>
                </div>
            </div>
            <div className="nd-list">
                <button className="click-flag-previous"
                    onClick={(e) => ablumRollerRef.current.prev()}></button>

                <div className="ablum-roller" >
                    <Carousel ref={ablumRollerRef} dots={false}>
                        {
                            [0, 1].map(index => {
                                return (
                                    <div className="ablum-list" key={index}>
                                        {
                                            albums && albums.slice(index * 5, (index + 1) * 5).map(item => {
                                                let coverUrl = `${item.blurPicUrl}?param=100y100`;
                                                let albumUrl = `https://music.163.com/album?id=${item.id}`
                                                let artistUrl = `https://music.163.com/artist?id=${item?.artist?.id}`
                                                return (
                                                    <div className="ablum-item" key={item.id}>
                                                        <div className="item-cover">
                                                            <img src={coverUrl} alt="d" />
                                                            <a title={item?.name} href={albumUrl} className="msk"> </a>
                                                        </div>
                                                        <p className="f-thide">
                                                            <a title={item?.name} href={albumUrl}>{item?.name}</a>
                                                        </p>
                                                        <p className="f-thide" title={item?.artist?.name}>
                                                            <a href={artistUrl}>{item?.artist?.name}</a>
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <button className="click-flag-next"
                    onClick={(e) => ablumRollerRef.current.next()}></button>
            </div>
        </Fragment>
    )
}