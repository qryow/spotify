import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../../helpers/hooks';

import style from "./navbar.module.scss";
import homeIcon from '../../../img/icons/Home.svg'
import homeIconActive from '../../../img/icons/HomeActive.svg'
import searchIcon from '../../../img/icons/Search.svg'
import searchIconActive from '../../../img/icons/SearchActive.svg'
import playlistIcon from '../../../img/icons/Playlist.svg'
import plusIcon from '../../../img/icons//Union.svg'
import arrowIcon from '../../../img/icons/Arrow.svg'
import arrowDownIcon from '../../../img/icons/ArrowDown.svg'
import closeIcon from '../../../img/icons/close.svg'
import Icon from '../../../img/icons/e699fb7cd6ce72d00445fac66fdfc997.jpg'


const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [SearchInput, setSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sortDrop, setSortDrop] = useState(false)
  
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    if (inputValue.trim() === '') {
      setSearchInput(false);
      setSortDrop(false)
    }
  });

  const clearInp = () => {
    setInputValue('')
  }

  const [selectedCategory, setSelectedCategory] = useState("Недавние");
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSortDrop(false);
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.navbar}>
          <div className={style.menu__item}>
            <div className={style.icon__wrapper}>
              <img src={`${location.pathname === '/homepage' ? homeIconActive : homeIcon}`} alt="home" onClick={() => navigate('/homepage')} />
            </div>
            <h3 className={`${location.pathname === '/homepage' ? `${style.menu__name} ${style.active__text}` : `${style.menu__name}`}`} onClick={() => navigate('/homepage')} >Главная</h3>
            
          </div>
          <div className={style.menu__item}>
            <div className={style.icon__wrapper}>
              <img src={`${location.pathname === '/search' ? searchIconActive : searchIcon}`} alt="search" onClick={() => navigate('/search')} />
            </div>
            <h3 className={`${location.pathname === '/search' ? `${style.menu__name} ${style.active__text}` : `${style.menu__name}`  }`} onClick={() => navigate('/search')} >Поиск</h3>
          </div>
        </div>

        <div className={style.sidebar}>
          <div className={style.sidebar__block}>\

            <div className={style.side__nav}>
              <div className={style.icon__wrapper2}>
                <img src={playlistIcon} alt="playlist" />
              </div>
              <h3 className={style.side__title}>Моя медиатека</h3>

              <div className={style.icons__wrapper}>
                <div className={style.round__icon}>
                  <img src={plusIcon} alt="" />
                </div>
                <div className={style.round__icon}>
                  <img src={arrowIcon} alt="" />
                </div>
              </div>

            </div>

            <div className={style.playlists__list}>
              <div className={style.search__block}>
                  {SearchInput ? (
                    <>
                      <div className={style.inp__wrapper}>
                        <img className={style.search__icon} src={searchIcon} alt="" />
                        <input className={style.search__inp} placeholder='Искать в медиатеке' type="text" value={inputValue} ref={menuRef} onChange={(e) => setInputValue(e.target.value)} />
                        {inputValue && (
                          <div className={style.close__wrapper} onClick={() => clearInp()} >
                            <img className={style.close__inp} src={closeIcon} alt=""/>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={style.search__wrapper} onClick={() => setSearchInput(true)}>
                        <img src={searchIcon} alt="" />
                      </div>
                    </>
                  )}
                  
                  <div className={style.sort__drop} onClick={() => setSortDrop(!sortDrop)} ref={menuRef}>
                    <h4>{selectedCategory}</h4>
                    <img className={sortDrop ? `${style.active__img}` : ``} src={arrowDownIcon} alt="" />
                  </div>
                  <div className={sortDrop ? `${style.sort__block} ${style.active}` : `${style.sort__block}`}>
                    <h4>Сортировка</h4>

                    <div className={style.sort__item} onClick={() => handleCategoryClick("Недавние")}>
                      <h5>Недавние</h5>
                    </div>
                    <div className={style.sort__item} onClick={() => handleCategoryClick("По дате обновления")} >
                      <h5>По дате обновления</h5>
                    </div>
                    <div className={style.sort__item} onClick={() => handleCategoryClick("По алфавиту")}>
                      <h5>По алфавиту</h5>
                    </div>
                    <div className={style.sort__item} onClick={() => handleCategoryClick("Автор")}>
                      <h5>Автор</h5>
                    </div>
                  </div>
              </div>

              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>

              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>

              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>

              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>

              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>

              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>

              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>

              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>
              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>
              <div className={style.one__playlist}>
                <img className={style.one__img} src={Icon} alt="" />
                <div className={style.one__texts}>
                  <h4>Название плейлиста</h4>
                  <h5>Плейлист - мой</h5>
                </div>
              </div>




            
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar