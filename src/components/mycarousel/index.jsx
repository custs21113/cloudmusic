import { Carousel } from 'antd';
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { getTopBanners } from '../../service/recommend'
import './index.scss';
import 'antd/dist/antd.css';
export default function Mycarousel() {
  const [topBanners, setTopBanners ] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  let bannerChange = useCallback((from, to) => {
    setCurrentIndex(to)
  }, []);
  const banRef = useRef();
  let getData = async function () {
    try {
      const res = await getTopBanners();
      const { data } = res;
      setTopBanners([...data.banners])
    } catch (error) {
      setTopBanners([])
      console.log(error)
    }
  };

  useEffect(() => {
    getData()
  }, []);
  const bgImage = function getbgImage(currentIndex) {
    return {
      'background': `url('${topBanners && topBanners[currentIndex] && topBanners[currentIndex].imageUrl + '?imageView&blur=40x20'}') center center/100%`,
    }

  }
  return (
    <div style={bgImage(currentIndex)} >
      <div className="banner">
        <div className="banner-content">
          
        <button onClick={(e) => banRef.current.prev()} className="bc-previous" ></button>
        <div className="banner-left">
          <Carousel
            effect="fade"
            autoplay
            beforeChange={bannerChange}
            ref={banRef}
            className="banner-carousel"
          >
            {topBanners && topBanners.map(item => {
              return (
                <div key={item.imageUrl}>
                  <img src={item.imageUrl} title={item.typeTitle} alt={item.typeTitle} preload='true'/>
                </div>
              )
            })}
          </Carousel>
          <div className="download">
            <a href="https://music.163.com/#/download"> </a>
            <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
          </div>
        </div>
        <button onClick={(e) => banRef.current.next()} className="bc-next" ></button>
        </div>
      </div>
    </div>
  )

}


