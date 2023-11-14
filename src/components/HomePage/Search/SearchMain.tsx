import React from 'react'
import style from './Search.module.scss'

import arrowIcon from '../../../img/icons/Arrow.svg'
import ava from '../../../img/icons/Frame 11.png'
import arrowDownIcon from '../../../img/icons/Frame 12.svg'
import search from '../../../img/icons/Search.svg'
import poster from '../../../img/icons//Screenshot 2022-06-04 at 20.09.svg'

const SearchMain = () => {
  return (
    <>
      <div className={style.main}>
        <div className={style.main__block}>
          <div className={style.main__nav}>
            <div className={style.icons__wrapper}>
              <div className={style.round__icon1}>
                <img src={arrowIcon} alt="" />
              </div>
              <div className={style.round__icon}>
                <img src={arrowIcon} alt="" />
              </div>
            </div>

            <div className={style.input__wrapper}>
              <img src={search} alt="" />
              <input type="text"/>
            </div>

            <div className={style.account__block}>
              <img className={style.acc__ava} src={ava} alt="" />
              <h4>Название акк</h4>
              <img className={style.acc__arrow} src={arrowDownIcon} alt="" />
            </div> 
          </div>

          <div className={`${style.list} ${style.mt}`}>
            <h4>История поиска</h4>
            <h6>Показать больше</h6>
            <div className={style.list__slide}>
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
            </div>
          </div>

          <div className={style.list}>
            <h4>Все остальное</h4>
          </div>

        </div>
      </div>
    </>
  )
}

export default SearchMain