import React, { useCallback } from "react"
import { getUser } from "../../../services/thunk/getUser";
import { useDispatch, useSelector } from "react-redux";
import styles from './index.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from 'react-router-dom';
import { signIn } from "../../../services/thunk/loginProfile";
import { getCookie } from "../../../services/cookie";
import { updateToken } from "../../../services/thunk/updateToken";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, userFailed, tokenRequest, tokenFailed } = useSelector(state => state.profile)
  const [emailValue, setEmailValue] = React.useState('')
  const emailRef = React.useRef(null)
  const [passValue, setPassValue] = React.useState('')
  const passRef = React.useRef(null)
  const [watchPass, setPassWatch] = React.useState(false)
  const history = useHistory();
  const onIconClick = () => {
    setTimeout(() => passRef.current.focus(), 0)
    setPassWatch(!watchPass)
  }

  const login = useCallback(
    e => {
      e.preventDefault();
      const form = {email:emailValue, password:passValue}
      dispatch(signIn(form))
    },
    [emailValue, passValue]
  );

  React.useEffect(() => {
    if (getCookie('token') !== undefined) {
      dispatch(getUser())
      if (userFailed) {
        dispatch(updateToken())
        if (!tokenRequest && !tokenFailed) {
          dispatch(getUser())
        }
      }
    }
    if (user.name) {
      setEmailValue('');
      setPassValue('');
      history.replace({ pathname: '/' })
    }
  },[userFailed, user, history, tokenRequest, tokenFailed])

  return (
    <div className={`${styles.field} mt-15`}>
      <p className="text text_type_main-medium mt-30 mb-6">
        Вход
      </p>
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
          name={'name'}
          error={false}
          ref={passRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <Button type="primary" size="medium" onClick={login}>
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
        Вы - новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  )
}