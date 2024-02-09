import React, { useState, useRef, useEffect } from 'react'
import style from "./style/main.module.scss"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../../../store/Slices/AuthSlice';

import arrowIcon from '../../../img/icons/Arrow.svg'
import ava from '../../../img/icons/Frame 11.png'
import arrowDownIcon from '../../../img/icons/Frame 12.svg'
import close from '../../../img/icons/close.svg'
import poster from '../../../img/icons//Screenshot 2022-06-04 at 20.09.svg'
import { useClickOutside } from '../../../helpers/hooks';
import galochkaIcon from '../../../img/icons/galochka.svg'
import { postSong } from '../../../store/Slices/SongSlice';

const MainVerify = () => {
  const [sortDrop, setSortDrop] = useState(false);
  const [modal, setModal] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [songModal, setSongModal] = useState(false);

  const navigate = useNavigate();

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setSortDrop(false);
    setSongModal(false);
    setEditModal(false);
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
    singerName: string,
    singerBg: string,
  }
  interface RootState {
    account: AccountState;
  }

  const dispatch = useDispatch()

  const [active, setActive] = useState(false)
  console.log(active)
  
  const { activeAcc } = useSelector((state: RootState) => state.account);
  console.log(activeAcc);

  const [songObj, setSongObj] = useState({
    id: '',
    songName: '',
    songAlbum: '',
    songPoster: 'https://i.pinimg.com/564x/c2/a2/37/c2a237797a15a483ed0be27e00a064fa.jpg',
    songUrl: '',
    author: '',
  })

  useEffect(() => {
    if (activeAcc) {
      localStorage.setItem('accountObj', JSON.stringify({username: activeAcc.username, isActive: activeAcc.isActive, id: activeAcc.id}))
    }
    if (activeAcc && activeAcc.isActive === true) {
      setSongObj({ ...songObj, author: activeAcc.username })
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
      {activeAcc && (
        <>
          <div className={style.main}>
            <div className={style.main__block}>
              {/*<div className={style.gradient2}></div>*/}
              <div className={style.nav__bg}>
                <img className={style.bg} src={activeAcc.singerBg} alt="" />
                <div className={style.verify__nav}>
                  <div className={style.icons__wrapper}>
                    <div className={style.round__icon1}>
                      <img src={arrowIcon} alt="" />
                    </div>
                    <div className={style.round__icon}>
                      <img src={arrowIcon} alt="" />
                    </div>
                  </div>

                  <div className={style.account__block} onClick={() => setSortDrop(!sortDrop)} ref={menuRef} >
                    <img className={style.acc__ava} src={activeAcc.avatar} alt="" />
                    <h4> {activeAcc.username} </h4>
                    <img className={sortDrop ? `${style.active__img}` : `${style.acc__arrow}`} src={arrowDownIcon} alt="" />
                  </div> 
                  <div className={sortDrop ? `${style.sort__block} ${style.active}` : `${style.sort__block}`}>
                    {/*<h4>Сортировка</h4>*/}

                    <div className={style.sort__item} onClick={() => navigate('/profile')}>
                      <h5>Аккаунт</h5>
                    </div>
                    <div className={style.sort__item}>
                      <h5>Пока ничего</h5>
                    </div>
                    <div className={style.sort__item}>
                      <h5>Выйти из аккаунта</h5>
                    </div>
                  </div>
                  
                </div>
                <div className={style.verify__content} onClick={() => setEditModal(true)}>
                  <div className={style.galochka}><img src={galochkaIcon} alt="" /> <h2>Подтвержденный испольнитель</h2></div>
                  <h3> {activeAcc.singerName} </h3>
                  <h4>Количество песен 8</h4> 
                </div>
              </div>

              <div className={style.btns}>
                <button className={style.btn2} onClick={() => setSongModal(true)}>Опубликовать песню</button>
              </div>

            </div>
          </div>
          <div className={songModal ? `${style.modal__wrapper} ${style.modal__active}` : `${style.modal__wrapper}`} >
            <div className={style.modal} ref={menuRef}>
              <h2>Опубликовать песню</h2>
              <div className={style.close__img} onClick={() => setSongModal(false)}>
                <img src={close} alt="" />
              </div>
              <div className={style.song__inputs}>
                <div className={style.edit__song}>
                  <div className={style.edit__poster}>
                    <img src={songObj.songPoster} alt="" />
                  </div>
                  <div className={style.edit__song_titles}>
                    <h3>{songObj.songName}</h3>
                    <h4>{songObj.songAlbum}</h4>
                  </div>
                </div>

                <div className={style.inputs__wrapper}>
                  <div className={style.two__inputs}>
                    <input type="text" placeholder='song name' onChange={(e) => setSongObj({ ...songObj, songName: e.target.value })} />
                    <input type="text" placeholder='song album' onChange={(e) => setSongObj({ ...songObj, songAlbum: e.target.value })} />
                  </div>
                  <div className={style.two__inputs}>
                    <input type="text" placeholder='song poster' onChange={(e) => setSongObj({ ...songObj, songPoster: e.target.value })} />
                    <input type="text" placeholder='song file' onChange={(e) => setSongObj({ ...songObj, songUrl: e.target.value })} />
                  </div>

                  <button className={style.add__btn} onClick={() => dispatch(postSong(songObj) as any)}>Опубликовать</button>
                </div>
              </div>
            </div>
          </div>
          <div className={editModal ? `${style.modal__wrapper} ${style.modal__active}` : `${style.modal__wrapper}`} >
            <div className={style.modal}>
              <h2>Изменить профиль</h2>
              <div className={style.close__img} onClick={() => setSongModal(false)}>
                <img src={close} alt="" />
              </div>
              <div className={style.song__inputs}>
                <div className={style.edit__song}>
                  <div className={style.singer__poster}>
                    <img src={songObj.songPoster} alt="" />
                  </div>
                </div>

                <div className={style.inputs__wrapper}>
                  <div className={style.two__inputs}>
                    <input type="text" placeholder='name' onChange={(e) => setSongObj({ ...songObj, songName: e.target.value })} />
                    <input type="text" placeholder='background url' onChange={(e) => setSongObj({ ...songObj, songAlbum: e.target.value })} />
                  </div>

                  <button className={style.add__btn} onClick={() => dispatch(postSong(songObj) as any)}>Опубликовать</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MainVerify
