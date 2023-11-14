import React, { useState } from 'react'
import style from './styles/register.module.scss'

import facebook from '../../img/icons/facebook.svg'
import apple from '../../img/icons/apple.svg'
import google from '../../img/icons/google.svg'

import passVisible from '../../img/icons/eye-open.svg'
import passUnvisible from '../../img/icons/eye-cl.svg'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

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

          <div className={style.line__wrapper}>
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
          <div className={style.inputs}>
            <h4>Подтвеждение пароля</h4>
            <div className={style.inp}>
              <input placeholder='Подтвердите пароль' type={showPassword ? 'text' : 'password'} />
              <img src={showPassword ? passVisible : passUnvisible} alt="" onClick={() => togglePasswordVisibility()} />
            </div>
          </div>

          <button className={style.register__btn}>
            Регистрация
          </button>

          <div className={style.acc__footer}><p>У тебя уже есть аккаунт ?</p> <a href="/login">Ввойти</a> </div>
        </div>
      </div>
    </>
  )
}

export default Register