import React, { BaseSyntheticEvent, FC, useEffect } from "react"
import styles from './index.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks/hooks';
import { signUp } from "../services/thunk/registerProfile";
import { getUser } from "../services/thunk/getUser";


export const RegisterPage: FC = () => {
  const {user} = useSelector(state => state.profile)
  const [nameValue, setNameValue] = React.useState<string>('')
  const nameRef = React.useRef<HTMLInputElement>(null)
  const [emailValue, setEmailValue] = React.useState<string>('')
  const emailRef = React.useRef<HTMLInputElement>(null)
  const [passValue, setPassValue] = React.useState<string>('')
  const passRef = React.useRef<HTMLInputElement>(null)
  const dispatch = useDispatch();

  const registration = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if(emailValue.length>3 && passValue.length>1 && nameValue.length>1)
    dispatch(signUp({email:emailValue, password:passValue, name:nameValue}))
  }
  const history = useHistory(); 

  const [watchPass, setPassWatch] = React.useState(false)
  const onIconClick = (): void => {
    setTimeout(() => passRef.current?.focus(), 0)
    setPassWatch(!watchPass)
  }

  useEffect(()=>{
    dispatch(getUser())
    if (user.name) {
      setNameValue('');
      setEmailValue('');
      setPassValue('');
      history.replace({ pathname: '/react-burger' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user, history])

  return (
    <form className={`${styles.field} mt-15`} onSubmit={registration}>
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
          type={watchPass? 'text' : 'password' }
          placeholder={'Пароль'}
          onChange={e => setPassValue(e.target.value)}
          icon={watchPass? 'HideIcon' : 'ShowIcon'}
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
        Уже зарегистрированы? <Link to="/react-burger/login" className={styles.link}>Войти</Link>
      </p>
    </form>
  )
}