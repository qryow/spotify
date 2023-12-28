import React, { useState, useRef, useEffect } from 'react'
import style from "./style/main.module.scss"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import arrowIcon from '../../../img/icons/Arrow.svg'
import ava from '../../../img/icons/Frame 11.png'
import arrowDownIcon from '../../../img/icons/Frame 12.svg'
import poster from '../../../img/icons//Screenshot 2022-06-04 at 20.09.svg'
import { useClickOutside } from '../../../helpers/hooks';
import { getPlaylists } from '../../../store/Slices/SongSlice';

interface RootState {
  //account: AccountState;
  songs: SongsState;
}
interface SongsState {
  playlists: Playlists | [];
}
interface PlaylistSong {
  
}
interface Playlists {
  PlaylistName: string;
  PlaylistBg: string;
  PlaylistSongs: PlaylistSong[];
  author: string,
  id: string,
}

const MainComponent = () => {
  const [sortDrop, setSortDrop] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setSortDrop(false)
  });
  
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

  const { playlists } = useSelector((state: RootState) => state.songs)

  useEffect(() => {
    dispatch(getPlaylists() as any)
    //dispatch(createPlaylist(playlistObj) as any)
  }, [])

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

            <div className={style.account__block}  onClick={() => setSortDrop(!sortDrop)} ref={menuRef}>
              <img className={style.acc__ava} src={ava} alt="" />
              <h4>Название акк</h4>
              <img className={sortDrop ? `${style.active__img}` : `${style.acc__arrow}`} src={arrowDownIcon} alt="" />
            </div> 
            <div className={sortDrop ? `${style.sort__block} ${style.active}` : `${style.sort__block}`}>
              {/*<h4>Сортировка</h4>*/}

              <div className={style.sort__item} onClick={() => navigate('/account')}>
                <h5>Аккаунт</h5>
              </div>
              <div className={style.sort__item} >
                <h5>Пока ничего</h5>
              </div>
              <div className={style.sort__item}>
                <h5>Пока ничего</h5>
              </div>
              <div className={style.sort__item}>
                <h5>Пока ничего</h5>
              </div>
            </div>
          </div>

          <h1 className={style.main__title}>Good afternoon</h1>
          <div className={style.playlists__wrapper}>
            <div className={style.playlist__item} onClick={() => navigate('/allsongs/')}>
              <img src={poster} alt="" />
              <h4>Все песни</h4>
            </div>

          </div>

          <div className={style.list} >
            <h2>Плейлисты</h2>
            <Carousel 
              responsive={responsive}
              className={style.slider}
              >
              {Array.isArray(playlists) && playlists.map((playlist: Playlists) => (
                <div className={style.one__slide} onClick={() => navigate(`/playlist/${playlist.id}/`)} key={playlist.id}>
                <img src={playlist.PlaylistBg} alt="" />
                <h4>Название плейлиста</h4>
                <h5>Автор, Автор, Автор и другие...</h5>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainComponent