import React, { BaseSyntheticEvent, FC, useCallback } from "react"
import { getUser } from "../services/thunk/getUser";
import { useDispatch, useSelector } from '../services/hooks/hooks';
import styles from './index.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { signIn } from "../services/thunk/loginProfile";
import { getCookie } from "../services/cookie";
import { updateToken } from "../services/thunk/updateToken";

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const { user, userFailed, tokenRequest, tokenFailed } = useSelector(state => state.profile)
  const [emailValue, setEmailValue] = React.useState<string>('')
  const emailRef = React.useRef<HTMLInputElement>(null)
  const [passValue, setPassValue] = React.useState<string>('')
  const passRef = React.useRef<HTMLInputElement>(null)
  const [watchPass, setPassWatch] = React.useState<boolean>(false)
  const history = useHistory<History>();
  let location = useLocation<any>();
  const onIconClick = () => {
    setTimeout(() => passRef.current?.focus(), 0)
    setPassWatch(!watchPass)
  }

  const login = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault();
      const form = {email:emailValue, password:passValue}
      if (emailValue.length>3 && passValue.length>1) {
        dispatch(signIn(form))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (user.name !== '') {
      setEmailValue('');
      setPassValue('');
      history.replace(location.state? location.state.from: {pathname: '/react-burger'})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userFailed, user, history,])

  return (
    <form className={`${styles.field} mt-15`} onSubmit={login}>
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
      <Button type="primary" size="medium">
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
        Вы - новый пользователь? <Link to="/react-burger/register" className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/react-burger/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>
    </form>
  )
}