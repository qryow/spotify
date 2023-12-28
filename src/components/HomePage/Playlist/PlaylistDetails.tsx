import React, { useState, useRef, useEffect } from 'react'
import style from "./playlist.module.scss"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editPlaylist, setSelectedSong } from '../../../store/Slices/SongSlice';

import arrowIcon from '../../../img/icons/Arrow.svg'
import ava from '../../../img/icons/Frame 11.png'
import arrowDownIcon from '../../../img/icons/Frame 12.svg'
import close from '../../../img/icons/close.svg'
import poster from '../../../img/icons//Screenshot 2022-06-04 at 20.09.svg'
import { useClickOutside } from '../../../helpers/hooks';
import { getOneUser } from '../../../store/Slices/AuthSlice';
import { getOnePlaylist } from '../../../store/Slices/SongSlice';
import OneSong from './OneSong';

const PlaylisDetails = () => {
  const [sortDrop, setSortDrop] = useState(false);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setSortDrop(false);
    setModal(false)
  });
  
  const responsive = {
    superLargeDesktop: {
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

  interface AccountState {
    activeAcc: ActiveAccount | null;
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
  interface SongsState {
    playlists: Playlists | [];
    onePlaylist: Playlists | undefined;
  }
  interface PlaylistSong {
    id: '',
    songName: '',
    songAlbum: '',
    songPoster: '',
    songUrl: ''
  }
  interface Playlists {
    PlaylistName: string;
    PlaylistBg: string;
    PlaylistSongs: PlaylistSong[];
    author: string,
    id: string,
  }

  const dispatch = useDispatch()

  const [active, setActive] = useState(false)
  
  const { activeAcc } = useSelector((state: RootState) => state.account);

  const { onePlaylist } = useSelector((state: RootState) => state.songs);

  const { id } = useParams();

  const [playlistObj, setPlaylistObj] = useState({
    PlaylistName: '',
    PlaylistBg: '',
    id: id,
  })

  useEffect(() => {
    if (activeAcc) {
      localStorage.setItem('accountObj', JSON.stringify({username: activeAcc.username, isActive: activeAcc.isActive, id: activeAcc.id}))
    }
    if (activeAcc && activeAcc.isActive === true) {
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

  useEffect(() => {
    setPlaylistObj({ ...playlistObj, id: id});
    dispatch(getOnePlaylist({ id }) as any);
  }, [id]);

  return (
    <>
      {activeAcc && (
        <>
        {onePlaylist && (
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

                  <div className={style.account__block} onClick={() => setSortDrop(true)} ref={menuRef} >
                    <img className={style.acc__ava} src={activeAcc.avatar} alt="" />
                    <h4> {activeAcc.username} </h4>
                    <img className={sortDrop ? `${style.active__img}` : `${style.acc__arrow}`} src={arrowDownIcon} alt=""/>
                  </div> 
                  <div className={sortDrop ? `${style.active__block}` : `${style.sort__block}`}>
                    {/*<h4>Сортировка</h4>*/}

                    <div className={style.sort__item} onClick={() => navigate('/profile')}>
                      <h5>Аккаунт</h5>
                    </div>
                    <div className={style.sort__item}>
                      <h5>Пока ничего</h5>
                    </div>
                    {activeAcc.isVerified ? (
                        <>
                        </>
                    ) : (
                      <div className={style.sort__item} onClick={() => navigate('/verify')}>
                        <h5>Стать испольнителем</h5>
                      </div>
                    )}
                    <div className={style.sort__item}>
                      <h5>Выйти из аккаунта</h5>
                    </div>
                  </div>
                  
                </div>

                <div className={style.profile__block}>
                  <div className={style.profile__ava} onClick={() => setModal(true)}>
                    <img src={onePlaylist.PlaylistBg} alt="picture" />
                  </div>
                  <div className={style.profile__names}>
                    <h1>Плейлист</h1>

                    <h3 onClick={() => setModal(true)}> {onePlaylist.PlaylistName} </h3>

                    <h4>Количество песен 82</h4>
                  </div>
                </div>

                <div className={style.songs__list}>
                  <div className={style.songs__item}>
                    <div className={style.num__title}>
                      <h2>#</h2>
                    </div>
                    <div className={style.name__title}>
                      <h2>Название</h2>
                    </div>
                    <div className={style.album__title}>
                      <h2>Альбом</h2>
                    </div>
                    <div className={style.date__title}>
                      <h2>Дата публикации</h2>
                    </div>
                    <div className={style.time__icon}>
                      <h2>. . .</h2>
                    </div>
                  </div>
                  <hr />
                  {Array.isArray(onePlaylist.PlaylistSongs) &&
                    onePlaylist.PlaylistSongs.map((music: PlaylistSong) => (
                      <React.Fragment key={music.id}>
                        <OneSong music={music} />
                      </React.Fragment>
                    ))}
                </div>


              </div>
            </div>
            <div className={modal ? `${style.modal__wrapper} ${style.modal__active}` : `${style.modal__wrapper}`} >
              <div className={style.modal} ref={menuRef}>
                <h2>Плейлист</h2>
                <div className={style.close__img} onClick={() => setModal(false)}>
                  <img src={close} alt="" />
                </div>
                <div className={style.modal__content}>
                  <div className={style.modal__ava}>
                    <img src={playlistObj.PlaylistBg === '' ? onePlaylist.PlaylistBg : playlistObj.PlaylistBg} alt="" />
                  </div>
                  <div className={style.modal__inputs}>
                    <input placeholder='name' value={playlistObj.PlaylistName} type="text" onChange={(e) => setPlaylistObj({ ...playlistObj, PlaylistName: e.target.value })}  />
                    <input placeholder='url' type="text" onChange={(e) => setPlaylistObj({ ...playlistObj, PlaylistBg: e.target.value })}  />
                    <button onClick={() => {dispatch(editPlaylist(playlistObj) as any); setModal(false)}}>Сохранить</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        </>
      )}
    </>
  )
}

export default PlaylisDetails
