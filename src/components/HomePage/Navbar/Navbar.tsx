import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../../helpers/hooks';
import { useDispatch, useSelector } from 'react-redux';

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
import { getOneUser } from '../../../store/Slices/AuthSlice';
import { createPlaylist, getPlaylists } from '../../../store/Slices/SongSlice';


const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [SearchInput, setSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sortDrop, setSortDrop] = useState(false);

  const dispatch = useDispatch()

  const [playlistObj, setPlaylist] = useState({
      PlaylistName: 'Название вашего плейлиста',
      PlaylistBg: 'https://i.pinimg.com/564x/85/df/5e/85df5ede384599060330d838c8415174.jpg',
      PlaylistSongs: [
        // Массив объектов PlaylistSong
      ],
      author: '',
      id: '',
  })
  
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

  interface AccountState {
    activeAcc: ActiveAccount | null;
  }
  interface SongsState {
    myPlaylists: Playlists | [];
  }
  interface PlaylistSong {
    // Определите структуру элемента плейлиста
  }
  interface Playlists {
    PlaylistName: string;
    PlaylistBg: string;
    PlaylistSongs: PlaylistSong[];
    author: string,
    id: string,
  }
  interface ActiveAccount {
    isActive: boolean;
    id: string | number;
    username: string;
    avatar: string;
    isVerified: boolean,
  }
  interface RootState {
    account: AccountState;
    songs: SongsState;
  }
  interface OnePlaylist {

  }

  const [active, setActive] = useState(false)
  
  //const { activeAcc } = useSelector((state: RootState) => state.account);
  //const { playlists } = useSelector((state: RootState) => state.songs);
  const { myPlaylists } = useSelector((state: RootState) => state.songs)

  const { activeAcc } = useSelector((state: RootState) => state.account);


  useEffect(() => {
    dispatch(getPlaylists() as any)
    //dispatch(createPlaylist(playlistObj) as any)
  }, [])

  useEffect(() => {
    if (activeAcc) {
      localStorage.setItem('accountObj', JSON.stringify({username: activeAcc.username, isActive: activeAcc.isActive, id: activeAcc.id}))
    }
    if (activeAcc && activeAcc.isActive === true) {
      setPlaylist({ ...playlistObj, author: activeAcc.username })
      //dispatch(getOneUser({ id: activeAcc.id }) as any);
      return setActive(true);
    }
  }, [activeAcc])

  useEffect(() => {
    const accountObjString = localStorage.getItem('accountObj');
    if (accountObjString) {
      const parsedAccountObj = JSON.parse(accountObjString);
      dispatch(getOneUser({ id: parsedAccountObj.id }) as any);
    }
  }, []);


  return (
    <>
      <div className={style.wrapper}>
        <div className={style.navbar}>
          <div className={style.menu__item}>
            <div className={style.icon__wrapper}>
              <img src={`${location.pathname === '/' ? homeIconActive : homeIcon}`} alt="home" onClick={() => navigate('/')} />
            </div>
            <h3 className={`${location.pathname === '/' ? `${style.menu__name} ${style.active__text}` : `${style.menu__name}`}`} onClick={() => navigate('/')} >Главная</h3>
            
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
                <img src={playlistIcon} alt="playlistObj" />
              </div>
              <h3 className={style.side__title}>Моя медиатека</h3>

              <div className={style.icons__wrapper}>
                <div className={style.round__icon} onClick={() => {dispatch(createPlaylist(playlistObj) as any)}}>
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
                    

              {Array.isArray(myPlaylists) && myPlaylists.map((playlist: Playlists) => (
                <div className={style.one__playlist} onClick={() => navigate(`/playlist/${playlist.id}/`)} key={playlist.id}>
                  <img className={style.one__img} src={playlist.PlaylistBg} alt="" />
                  <div className={style.one__texts}>
                    <h4>{playlist.PlaylistName}</h4>
                    <h5>Плейлист - {playlist.author}</h5>
                  </div>
                </div>
              ))}


            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar