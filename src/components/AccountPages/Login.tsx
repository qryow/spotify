import React, { useState } from 'react'
import style from './styles/register.module.scss'

import facebook from '../../img/icons/facebook.svg'
import apple from '../../img/icons/apple.svg'
import google from '../../img/icons/google.svg'

import passVisible from '../../img/icons/eye-open.svg'
import passUnvisible from '../../img/icons/eye-cl.svg'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
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
            <h4>Email почта</h4>
            <input placeholder='Введите почту' type="text" />
          </div>
          <div className={style.inputs}>
            <h4>Пароль</h4>
            <div className={style.inp}>
              <input placeholder='Введите пароль' type={showPassword ? 'text' : 'password'}/>
              <img src={showPassword ? passVisible : passUnvisible} alt="" onClick={() => togglePasswordVisibility()} />
            </div>
          </div>

          <a className={style.forgot} href="">Забыли пароль ?</a>


          <button className={style.login__btn}>
            Ввойти
          </button>

          <div className={style.acc__footer}><p>У тебя нету аккаунта ?</p> <a href="/register">Зарегистрироваться</a> </div>
        </div>
      </div>
    </>
  )
}

export default Login