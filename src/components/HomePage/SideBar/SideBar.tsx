import React from "react";
import style from "./style/sideBar.module.scss";

import close from '../../../img/icons/close.svg'
import poster from '../../../img/icons/Screenshot 2022-06-04 at 20.09.svg'
import likeIcon from '../../../img/icons/like.svg'
import singerlogo from '../../../img/icons/524c4e0f49acbe954e60ee867c910b4a.jpg'
import galochkaIcon from '../../../img/icons/galochka.svg'

const SideBar = () => {
  return (
    <>
      <div className={style.sidebar}>
        <div className={style.block}>
          <div className={style.nav}>
            <h4>Chill mix</h4>
            <div className={style.close__wrapper}>
              <img src={close} alt="" />  
            </div>
          </div>

          <img className={style.music__poster} src={poster} alt="" />
          
          <div className={style.name__wrapper}>
            <div className={style.name__block}>
              <h4>Название песни</h4>
              <h5>Название альбома</h5>
            </div>
            <div className={style.name__icons}>
              <img src={likeIcon} alt="" />
            </div>
          </div>

          <div className={style.singer__logo}>
            <img src={singerlogo} alt="" />
            <div className={style.singer__wrapper}>
              <div className={style.singer__access}>
                <img src={galochkaIcon} alt="" />
                <h4>Подтвержденный испольнитель</h4>
              </div>

              <div className={style.singer__text}>
                <h5>66 000 000 слушателя</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quam amet rerum evenie...</p>
              </div>
            </div>
          </div>

          <div className={style.info__block}>
            <h4>Сведения</h4>
            <h5>Исполнители</h5>
            <h6>Coldplay</h6>
            <h5>Авторы</h5>
            <h6>Coldplay</h6>
            <h5>Продюсеры</h5>
            <h6>Coldplay</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
