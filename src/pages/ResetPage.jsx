import React, { useCallback } from 'react'; 
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from 'react-router-dom';
import styles from './index.module.css';
import { useDispatch, useSelector } from '../services/hooks/hooks';
import { resetPass } from '../services/thunk/resetProfilePass';

export const ResetPage = () => {
  const [emailValue, setEmailValue] = React.useState('')
  const emailRef = React.useRef(null)
  const [passValue, setPassValue] = React.useState('')
  const passRef = React.useRef(null)
  const {resetFailed, resetRequest, emailSended} = useSelector(state => state.profile)
  const history = useHistory(); 
  const dispatch = useDispatch();


  const [watchPass, setPassWatch] = React.useState(false)
  const onIconClick = () => {
    setTimeout(() => passRef.current.focus(), 0)
    setPassWatch(!watchPass)
  }

  const reset = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPass({password:passValue, token:emailValue})) 
      if (!resetFailed && !resetRequest) {
        history.replace({ pathname: '/login' });
      }
    },
    [history, emailValue, resetRequest, resetFailed]
  ); 

  React.useEffect(()=>{
    if (!emailSended) {
      history.replace({ pathname: '/forgot-password' });
    }
  },[emailSended])
  
  return (
    <form className={`${styles.field} mt-15`} onSubmit={reset}>
      <p className="text text_type_main-medium mt-30 mb-6">
        Восстановление пароля
      </p>
      <div className="mb-6">
        <Input
          type={watchPass? 'text' : 'password'}
          placeholder={'Введите новый пароль'}
          onChange={e => setPassValue(e.target.value)}
          icon={watchPass? 'HideIcon' : 'ShowIcon'}
          value={passValue}
          name={'name'}
          error={false}
          ref={passRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          required
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
          required
        />
      </div>
      <Button type="primary" size="medium">
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
        Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </form>
  )

}