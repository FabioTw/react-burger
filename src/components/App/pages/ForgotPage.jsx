import React, {useCallback} from 'react';
import { useHistory } from 'react-router-dom'; 
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPass } from '../../../services/thunk/resetProfilePass';

export const ForgotPage = () => {
  const {forgotFailed, forgotRequest} = useSelector(state => state.profile)

  const [emailValue, setEmailValue] = React.useState('')
  const emailRef = React.useRef(null)
  const history = useHistory(); 
  const dispatch = useDispatch();

  const reset = useCallback(
    () => {
      dispatch(forgotPass({email:emailValue})) 
      if (!forgotFailed && !forgotRequest) {
        history.replace({ pathname: '/reset-password' });
      }
    },
    [history, emailValue, forgotRequest, forgotFailed]
  ); 
  return (
    <div className={`${styles.field} mt-15`}>
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
        />
      </div>
      <Button type="primary" size="medium" onClick={reset}>
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
        Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  )
}