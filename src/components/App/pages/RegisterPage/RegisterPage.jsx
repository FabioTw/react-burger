import React from "react"
import styles from './register-page.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [nameValue, setNameValue] = React.useState('')
  const nameRef = React.useRef(null)
  const [emailValue, setEmailValue] = React.useState('')
  const emailRef = React.useRef(null)
  const [passValue, setPassValue] = React.useState('')
  const passRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => passRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return (
    <div className={`${styles.register} mt-15`}>
      <p className="text text_type_main-medium mt-30 mb-6">
        Регистрация
      </p>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setNameValue(e.target.value)}
          value={nameValue}
          name={'Name'}
          error={false}
          ref={nameRef}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'e-mail'}
          error={false}
          ref={emailRef}
          errorText={'Ошибка, адрес почты введен не верно!'}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => setPassValue(e.target.value)}
          icon={'ShowIcon'}
          value={passValue}
          name={'password'}
          error={false}
          ref={passRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <Button type="primary" size="medium">
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </div>
  )
}