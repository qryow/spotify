import React, { useState, useRef, useEffect } from 'react'
import style from "./style/main.module.scss"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import arrowIcon from '../../../img/icons/Arrow.svg'
import ava from '../../../img/icons/Frame 11.png'
import arrowDownIcon from '../../../img/icons/Frame 12.svg'
import close from '../../../img/icons/close.svg'
import poster from '../../../img/icons//Screenshot 2022-06-04 at 20.09.svg'
import { useClickOutside } from '../../../helpers/hooks';
import { getOneUser, patchSinger } from '../../../store/Slices/AuthSlice';

const ProfileComp = () => {
  const [sortDrop, setSortDrop] = useState(false);
  const [modal, setModal] = useState(false);
  const [artistModal, setArtistModal] = useState(false);

  const navigate = useNavigate();

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setSortDrop(false);
    setModal(false);
    setArtistModal(false);
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
  }

  const dispatch = useDispatch();

  const [accountObj, setAccount] = useState({
    id: '',
    singerName: '',
    isVerified: true,
    singerbg: '',
    isActive: false,
  })

  const [active, setActive] = useState(false)
  console.log(active)
  
  const { activeAcc } = useSelector((state: RootState) => state.account);
  console.log(activeAcc);

  const saveClick = () => {
    dispatch(patchSinger(accountObj) as any);
    navigate('/profile')
  }

  useEffect(() => {
    const accountObjString = localStorage.getItem('accountObj');
    if (accountObjString) {
      const parsedAccountObj = JSON.parse(accountObjString);
      setAccount({ ...accountObj, id: parsedAccountObj.id })
      dispatch(getOneUser({ id: parsedAccountObj.id }) as any);
    }
  }, []);

  useEffect(() => {
    if (activeAcc) {
      localStorage.setItem('accountObj', JSON.stringify({username: activeAcc.username, isActive: activeAcc.isActive, id: activeAcc.id}));
    }
    if (activeAcc && activeAcc.isActive === true) {
      dispatch(getOneUser({ id: 1 }) as any);
      return setActive(true);
    }
  }, [activeAcc])

  return (
    <>
      {activeAcc && (
        <>
          <div className={style.main}>
            <div className={style.main__block}>
              <div className={style.gradient2}></div>
              <div className={style.main__nav}>
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
                  {activeAcc.isVerified ? (
                      <>
                      </>
                  ) : (
                    <div className={style.sort__item} onClick={() => setArtistModal(true)}>
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
                  <img src={activeAcc.avatar} alt="picture" />
                </div>
                <div className={style.profile__names}>
                  <h1>Профиль</h1>

                  <h3 onClick={() => setModal(true)}> {activeAcc.username} </h3>

                  <h4>Количество плейлистов 18</h4>
                </div>
              </div>

            </div>
          </div>
          <div className={modal ? `${style.modal__wrapper} ${style.modal__active}` : `${style.modal__wrapper}`} >
            <div className={style.modal} ref={menuRef}>
              <h2>Данные профиля</h2>
              <div className={style.close__img} onClick={() => setModal(false)}>
                <img src={close} alt="" />
              </div>
              <div className={style.modal__content}>
                <div className={style.modal__ava}>
                  <img src={activeAcc.avatar} alt="" />
                </div>
                <div className={style.modal__inputs}>
                  <input value={activeAcc.username} type="text" />
                  <button>Сохранить</button>
                </div>
              </div>
            </div>
          </div>
          <div className={artistModal ? `${style.modal__wrapper} ${style.modal__active}` : `${style.modal__wrapper}`} >
            <div className={style.modal} ref={menuRef}>
              <h2>Стать испольнителем</h2>
              <div className={style.close__img} onClick={() => setModal(false)}>
                <img src={close} alt="" />
              </div>
              <div className={style.modal__content}>
                <div className={style.modal__ava}>
                  <img src={activeAcc.avatar} alt="" />
                </div>
                <div className={style.modal__inputs}>
                  <input placeholder='Имя исполнетиля' type="text" onChange={(e) => setAccount({ ...accountObj, singerName: e.target.value })} />
                  <button onClick={() => saveClick()}>Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfileComp
