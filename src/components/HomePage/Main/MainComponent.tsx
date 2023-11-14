import React from 'react'
import style from "./style/main.module.scss"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import arrowIcon from '../../../img/icons/Arrow.svg'
import ava from '../../../img/icons/Frame 11.png'
import arrowDownIcon from '../../../img/icons/Frame 12.svg'
import poster from '../../../img/icons//Screenshot 2022-06-04 at 20.09.svg'

const MainComponent = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <div className={style.main}>
        <div className={style.main__block}>
          <div className={style.gradient}></div>
          <div className={style.main__nav}>
            <div className={style.icons__wrapper}>
              <div className={style.round__icon1}>
                <img src={arrowIcon} alt="" />
              </div>
              <div className={style.round__icon}>
                <img src={arrowIcon} alt="" />
              </div>
            </div>

            <div className={style.account__block}>
              <img className={style.acc__ava} src={ava} alt="" />
              <h4>Название акк</h4>
              <img className={style.acc__arrow} src={arrowDownIcon} alt="" />
            </div> 
          </div>

          <h1 className={style.main__title}>Good afternoon</h1>
          <div className={style.playlists__wrapper}>
            <div className={style.playlist__item}>
              <img src={poster} alt="" />
              <h4>Chill mix</h4>
            </div>
            
            <div className={style.playlist__item}>
              <img src={poster} alt="" />
              <h4>Chill mix</h4>
            </div>

            <div className={style.playlist__item}>
              <img src={poster} alt="" />
              <h4>Chill mix</h4>
            </div>

            <div className={style.playlist__item}>
              <img src={poster} alt="" />
              <h4>Chill mix</h4>
            </div>

            <div className={style.playlist__item}>
              <img src={poster} alt="" />
              <h4>Chill mix</h4>
            </div>

            <div className={style.playlist__item}>
              <img src={poster} alt="" />
              <h4>Chill mix</h4>
            </div>

          </div>

          <div className={style.list} >
            <h2>Недавно прослушано</h2>
            <Carousel 
              responsive={responsive}
              className={style.slider}
              >
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
            </Carousel>
          </div>;

          <div className={style.list} >
            <h2>Недавно прослушано</h2>
            <Carousel 
              responsive={responsive}
              className={style.slider}
              >
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
              <div className={style.one__slide}>
                <img src={poster} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
              </div>
            </Carousel>
          </div>;
        </div>
      </div>
    </>
  )
}

export default MainComponent