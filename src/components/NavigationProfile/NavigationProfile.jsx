import styles from "./navigation-profile.module.css";
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/thunk/logoutProfile";
import { useCallback } from "react";

export const NavigationProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const {user} = useSelector(state => state.profile)

  const profile = useCallback(
    () => {
      if (user.name) {
        history.replace({ pathname: '/profile' });
      }
    },[history, user]
  );

  const story = useCallback(
    () => {
      if (user.name) {
        history.replace({ pathname: '/profile/orders' });
      }
    },[history, user]
  );

  const exit = useCallback(
    () => {
      dispatch(logOut())
      if (!user.name) {
        history.replace({ pathname: '/login' });
      }
    },[history, user]
  );

  return (
    <div className="mr-15">
      <div className={`${styles['nav-button']} mt-30`}>
        <p className={`${styles['nav-button-text']} text text_type_main-medium ${history.location.pathname === '/profile' ? null : 'text_color_inactive'}`} onClick={profile}>
          Профиль
        </p>
      </div>
      <div className={`${styles['nav-button']}`}>
        <p className={`${styles['nav-button-text']} text text_type_main-medium ${history.location.pathname === '/profile/orders' ? null : 'text_color_inactive'}`} onClick={story}>
          История заказов
        </p>
      </div>
      <div className={`${styles['nav-button']}`}>
        <p className={`${styles['nav-button-text']} text text_type_main-medium text_color_inactive`} onClick={exit}>
          Выход
        </p>
      </div>
      <div className="text text_type_main-default text_color_inactive mt-20">
        {
          history.location.pathname === '/profile/orders' ?
          <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете <br/>просмотреть свою историю заказов </p> : 
          <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете <br/>изменить свои персональные данные</p>
        }
      </div>
    </div>
  )
}