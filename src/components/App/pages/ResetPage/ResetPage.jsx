import React from 'react'; 
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './reset-page.module.css';

export const ResetPage = () => {
  const [emailValue, setEmailValue] = React.useState('')
  const emailRef = React.useRef(null)
  const [passValue, setPassValue] = React.useState('')
  const passRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => passRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return (
    <div className={`${styles.reset} mt-15`}>
      <p className="text text_type_main-medium mt-30 mb-6">
        Вход
      </p>
      <div className="mb-6">
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={e => setPassValue(e.target.value)}
          icon={'ShowIcon'}
          value={passValue}
          name={'name'}
          error={false}
          ref={passRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'e-mail code'}
          error={false}
          ref={emailRef}
          errorText={'Ошибка, код введен не верно!'}
          size={'default'}
        />
      </div>
      <Button type="primary" size="medium">
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </div>
  )

}