import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { Link, useLocation } from 'react-router-dom';
import { TLocationState } from "../../types/types";

export const AppHeader = () => {
  let location = useLocation<TLocationState>();
  return (
    <header className={`${headerStyles["app-header"]} mt-4 mb-4`}>
      <div className={`${headerStyles["left-header-buttons"]} mr-30`}>
        <nav className={`${headerStyles["header-button"]} ${headerStyles.constructor} ml-1`}>
          <div className={`mt-1 mr-2 ml-2`}>
            <BurgerIcon type={`${location.pathname === '/react-burger'? 'primary' : 'secondary' }`} />
          </div>
          <Link to="/react-burger" className={`${headerStyles["link"]} ${location.pathname === '/react-burger'? headerStyles["active"] : null} text text_type_main-default`}>Конструктор</Link>
        </nav>
        <nav className={`${headerStyles["header-button"]} ${headerStyles["order-list"]} ${headerStyles["not-active"]} ml-2`}>
          <div className={`mt-1 mr-2 ml-2`}>
            <ListIcon type={`${location.pathname === '/react-burger/feed'? 'primary' : 'secondary' }`} />
          </div>
          <Link to="/react-burger/feed" className={`${headerStyles["link"]} ${location.pathname === '/react-burger/feed'? headerStyles["active"] : null} text text_type_main-default`}>Лента заказов</Link>
        </nav>
      </div>
      <Logo />
      <nav className={`${headerStyles["not-active"]} ${headerStyles["header-button"]} ${headerStyles.profile}`}>
        <div className={`mt-1 mr-2 ml-2`}>
          <ProfileIcon type={`${location.pathname === '/react-burger/profile' || location.pathname === '/react-burger/profile/orders'? 'primary' : 'secondary' }`} />
        </div>
        <Link to="/react-burger/profile" className={`${headerStyles["link"]} ${location.pathname === '/react-burger/profile' || location.pathname === '/react-burger/profile/orders'? headerStyles["active"] : null } text text_type_main-default`}>Личный кабинет</Link>
      </nav>
    </header>
  );
};
