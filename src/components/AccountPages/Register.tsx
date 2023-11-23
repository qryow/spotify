import React, { useState, useEffect } from 'react'
import style from './styles/register.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, registerUser } from '../../store/Slices/AuthSlice'
import { RootState } from '../../store/store'


import facebook from '../../img/icons/facebook.svg'
import apple from '../../img/icons/apple.svg'
import google from '../../img/icons/google.svg'
import passVisible from '../../img/icons/eye-open.svg'
import passUnvisible from '../../img/icons/eye-cl.svg'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('error');

  const { accounts } = useSelector((state: RootState) => state.account);
  console.log(accounts)

  const [accountObj, setAccount] = useState({
    username: '',
    password: '',
    password_confirm: '',
    isActive: false,
    avatar: 'https://i.pinimg.com/564x/3e/f1/ec/3ef1ec48b03076009518fdc3a0ab8e02.jpg',
    isVerified: false,
    singerName: '',
    singerBg: 'https://i.pinimg.com/564x/4d/0a/a9/4d0aa9f4ce6c73a856a1d3036018feb3.jpg',
    playlist: {},
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkInputs = () => {
    if (accountObj.username === '' || accountObj.password === '' || accountObj.password_confirm === '') {
      console.log('Инпуты пустые');
      setError('error');
      return false;
    }

    if (accounts.some((acc) => acc.username === accountObj.username)) {
      console.log('Имя пользователя не уникально');
      setError('error');
      return false;
    }

    if (accountObj.password !== accountObj.password_confirm) {
      console.log('Пароли разные')
      return false
    }

    if (accountObj.password.length <= 5) {
      console.log('пароль меньше 6ти')
      return false
    }

    return true;
  };
  
  const registerFunc = async () => {
    if (checkInputs()) {
      // Вызываем асинхронные операции только если проверки пройдены
      await dispatch(registerUser(accountObj) as any);
      navigate('/login');
    }
  };
  

  useEffect(() => {
    dispatch(getUsers() as any)
  }, [])

  return (
    <>
      {error === 'error' ? (
        <>
          <div className={style.wrapper}>
            <div className={style.block}>
              <div className={style.buttons}>
                <button className={style.facebook}> <img src={facebook} alt="" />Продолжить с помощью Facebook</button>
                <button className={style.apple}> <img src={apple} alt="" />Продолжить с помощью Apple</button>
                <button className={style.google}> <img src={google} alt="" />Продолжить с помощью Google</button>
              </div>

              <div className={style.line__wrapper}>
                <div className={style.line}></div>
                <h4>или</h4>
                <div className={style.line}></div>
              </div>

              <div className={style.inputs}>
                <h4>Имя пользователя</h4>
                <input required placeholder='Введите имя пользователя' type="text" onChange={(e) => setAccount({ ...accountObj, username: e.target.value })} />
              </div>
              <div className={style.inputs}>
                <h4>Пароль</h4>
                <div className={style.inp}>
                  <input required placeholder='Введите пароль' type={showPassword ? 'text' : 'password'} onChange={(e) => setAccount({ ...accountObj, password: e.target.value })}/>
                  <img src={showPassword ? passVisible : passUnvisible} alt="" onClick={() => togglePasswordVisibility()} />
                </div>
              </div>
              <div className={style.inputs}>
                <h4>Подтвеждение пароля</h4>
                <div className={style.inp}>
                  <input required placeholder='Подтвердите пароль' type={showPassword ? 'text' : 'password'} onChange={(e) => setAccount({ ...accountObj, password_confirm: e.target.value })} />
                  <img src={showPassword ? passVisible : passUnvisible} alt="" onClick={() => togglePasswordVisibility()} />
                </div>
              </div>

              <button className={style.register__btn} onClick={() => registerFunc()} >
              {/*dispatch(registerUser(accountObj) as any)*/}
                Регистрация
              </button>

              <div className={style.acc__footer}><p>У тебя уже есть аккаунт ?</p> <a href="/login">Ввойти</a> </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={style.wrapper}>
            <div className={style.block}>
              <div className={style.buttons}>
                <button className={style.facebook}> <img src={facebook} alt="" />Продолжить с помощью Facebook</button>
                <button className={style.apple}> <img src={apple} alt="" />Продолжить с помощью Apple</button>
                <button className={style.google}> <img src={google} alt="" />Продолжить с помощью Google</button>
              </div>

              <div className={style.line__wrapper}>
                <div className={style.line}></div>
                <h4>или ошибка</h4>
                <div className={style.line}></div>
              </div>

              <div className={style.inputs}>
                <h4>Имя пользователя</h4>
                <input required placeholder='Введите имя пользователя' type="text" onChange={(e) => setAccount({ ...accountObj, username: e.target.value })} />
              </div>
              <div className={style.inputs}>
                <h4>Пароль</h4>
                <div className={style.inp}>
                  <input required placeholder='Введите пароль' type={showPassword ? 'text' : 'password'} onChange={(e) => setAccount({ ...accountObj, password: e.target.value })}/>
                  <img src={showPassword ? passVisible : passUnvisible} alt="" onClick={() => togglePasswordVisibility()} />
                </div>
              </div>
              <div className={style.inputs}>
                <h4>Подтвеждение пароля</h4>
                <div className={style.inp}>
                  <input required placeholder='Подтвердите пароль' type={showPassword ? 'text' : 'password'} onChange={(e) => setAccount({ ...accountObj, password_confirm: e.target.value })} />
                  <img src={showPassword ? passVisible : passUnvisible} alt="" onClick={() => togglePasswordVisibility()} />
                </div>
              </div>

              <button className={style.register__btn} onClick={() => registerFunc()} >
              {/*dispatch(registerUser(accountObj) as any)*/}
                Регистрация
              </button>

              <div className={style.acc__footer}><p>У тебя уже есть аккаунт ?</p> <a href="/login">Ввойти</a> </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Register