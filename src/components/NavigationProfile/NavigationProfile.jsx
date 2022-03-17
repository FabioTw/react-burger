import styles from "./navigation-profile.module.css";
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/thunk/logoutProfile";
import { useCallback } from "react";

export const NavigationProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const {user} = useSelector(state => state.profile)

  const exit = useCallback(
    () => {
      dispatch(logOut())
      if (!user.name) {
        history.replace({ pathname: '/login' });
      }
    },[history]
  );

  return (
    <div className="mr-15">
      <div className={`${styles['nav-button']} mt-30`}>
        <p className={`text text_type_main-medium `}>
          Профиль
        </p>
      </div>
      <div className={`${styles['nav-button']}`}>
        <Link className={`text text_type_main-medium text_color_inactive`}>
          История заказов
        </Link>
      </div>
      <div className={`${styles['nav-button']}`}>
        <Link className={`text text_type_main-medium text_color_inactive`} onClick={exit}>
          Выход
        </Link>
      </div>
      <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете <br/>
        изменить свои персональные данные
      </p>
    </div>
  )
}