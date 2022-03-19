import React, {useCallback, useEffect} from 'react';
import { useHistory } from 'react-router-dom'; 
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPass } from '../services/thunk/resetProfilePass';

export const ForgotPage = () => {
  const {emailSended} = useSelector(state => state.profile)

  const [emailValue, setEmailValue] = React.useState('')
  const emailRef = React.useRef(null)
  const history = useHistory(); 
  const dispatch = useDispatch();

  const reset = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(forgotPass({email:emailValue})) 
    },
    [emailSended, history, emailValue, ]
  ); 

  useEffect(()=> {
    if (emailSended) {
      history.replace({ pathname: '/reset-password' });
    }
  },[emailSended])

  return (
    <form className={`${styles.field} mt-15`} onSubmit={reset}>
      <p className="text text_type_main-medium mt-30 mb-6">
        Восстановление пароля
      </p>
      <div className="mb-6">
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'e-mail'}
          error={false}
          ref={emailRef}
          errorText={'Ошибка, адрес почты введен не верно!'}
          size={'default'}
          required
        />
      </div>
      <Button type="primary" size="medium">
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
        Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </form>
  )
}
