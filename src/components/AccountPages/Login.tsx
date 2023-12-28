import React, { useState, useEffect } from 'react'
import style from './styles/register.module.scss'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { getOneUser, getUsers, loginUser } from '../../store/Slices/AuthSlice'

import facebook from '../../img/icons/facebook.svg'
import apple from '../../img/icons/apple.svg'
import google from '../../img/icons/google.svg'
import passVisible from '../../img/icons/eye-open.svg'
import passUnvisible from '../../img/icons/eye-cl.svg'


interface ActiveAccount {
  isActive: boolean;
  id: string | number;
  username: string;
  avatar: string;
  isVerified: boolean,
  password: string;
}
interface AccountState {
  activeAcc: ActiveAccount | null;
  accounts: ActiveAccount | null
}
interface RootState2 {
  account: AccountState;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('!error');
  console.log(error)

  const [matchingUser, setMatchingUser] = useState(0);
  console.log(matchingUser)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { accounts } = useSelector((state: RootState) => state.account);

  const [accountObj, setAccount] = useState({
    id: matchingUser,
    username: 'user',
    password: '',
    isActive: false,
  })
  

  const checkInputs = () => {
    if (accountObj.username === '' || accountObj.password === '') {
      console.log('Инпуты пустые');
      setError('error');
      return false
    }

    if (accounts.some((acc) => acc.username !== accountObj.username)) {
      console.log('Имя пользователя не одинаковые');
      return setError('error');
    }

    if (accounts.some((acc) => acc.password !== accountObj.password)) {
      console.log('Пароли не одинаковые');
      return setError('error');
    }

    return true;
  };

  const loginFunc = async () => {
    if (checkInputs()) {
        await dispatch(loginUser(accountObj) as any);
        navigate('/');
    }
  };

  const [active, setActive] = useState(false)
  console.log(active)
  const { activeAcc } = useSelector((state: RootState2) => state.account);
  console.log(activeAcc);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch(getUsers() as any)
    dispatch(getOneUser({id: matchingUser}) as any)
  }, [])

  useEffect(() => {
    if (activeAcc) {
      localStorage.setItem('accountObj', JSON.stringify({username: activeAcc.username, isActive: activeAcc.isActive, id: activeAcc.id}));
    }
    if (activeAcc && activeAcc.isActive === true) {
      //dispatch(getOneUser({ id: activeAcc.id }) as any);
      return setActive(true);
    }
  }, [activeAcc])

  useEffect(() => {
    if (accounts.length > 0) {
      const userWithMatchingEmail = accounts.find(user => user.username === accountObj.username);
      if (userWithMatchingEmail) {
        setMatchingUser(Number(userWithMatchingEmail.id));
        dispatch(getOneUser({id: userWithMatchingEmail.id}) as any)
        localStorage.setItem('accountObj', JSON.stringify({username: userWithMatchingEmail.username, id: userWithMatchingEmail.id}));
        setAccount({ ...accountObj, isActive: true })
      }
    }
  }, [accounts, accountObj.username]);

  useEffect(() => {
    setAccount({ ...accountObj, id: matchingUser });
  }, [matchingUser])

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
    
              <div className={`${style.line__wrapper} ${style.line__wrapper2}`}>
                <div className={style.line}></div>
                <h4>или error</h4>
                <div className={style.line}></div>
              </div>
    
              <div className={style.inputs}>
                <h4>Имя пользоватлея</h4>
                <input placeholder='Введите имя пользователя' type="text" onChange={(e) => setAccount({ ...accountObj, username: e.target.value })} />
              </div>
              <div className={style.inputs}>
                <h4>Пароль</h4>
                <div className={style.inp}>
                  <input placeholder='Введите пароль' type={showPassword ? 'text' : 'password'} onChange={(e) => setAccount({ ...accountObj, password: e.target.value })}/>
                  <img src={showPassword ? passVisible : passUnvisible} alt="" onClick={() => togglePasswordVisibility()} />
                </div>
              </div>
    
              <a className={style.forgot} href="">Забыли пароль ?</a>
    
    
              <button className={style.login__btn} onClick={() => loginFunc()}>
                Ввойти
              </button>
    
              <div className={style.acc__footer}><p>У тебя нету аккаунта ?</p> <a href="/register">Зарегистрироваться</a> </div>
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
    
              <div className={`${style.line__wrapper} ${style.line__wrapper2}`}>
                <div className={style.line}></div>
                <h4>или</h4>
                <div className={style.line}></div>
              </div>
    
              <div className={style.inputs}>
                <h4>Имя пользователя</h4>
                <input placeholder='Введите имя пользователя' type="text" onChange={(e) => setAccount({ ...accountObj, username: e.target.value })} />
              </div>
              <div className={style.inputs}>
                <h4>Пароль</h4>
                <div className={style.inp}>
                  <input placeholder='Введите пароль' type={showPassword ? 'text' : 'password'} onChange={(e) => setAccount({ ...accountObj, password: e.target.value })}/>
                  <img src={showPassword ? passVisible : passUnvisible} alt="" onClick={() => togglePasswordVisibility()} />
                </div>
              </div>
    
              <a className={style.forgot} href="">Забыли пароль ?</a>
    
    
              <button className={style.login__btn} onClick={() => loginFunc()}>
                Ввойти
              </button>
    
              <div className={style.acc__footer}><p>У тебя нету аккаунта ?</p> <a href="/register">Зарегистрироваться</a> </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Login