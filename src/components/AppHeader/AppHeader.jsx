import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { Link, useLocation } from 'react-router-dom';

export const AppHeader = () => {
  let location = useLocation();
  return (
    <header className={`${headerStyles["app-header"]} mt-4 mb-4`}>
      <div className={`${headerStyles["left-header-buttons"]} mr-30`}>
        <nav className={`${headerStyles["header-button"]} ${headerStyles.constructor} ml-1`}>
          <div className={`mt-1 mr-2 ml-2`}>
            <BurgerIcon type={`${location.pathname === '/profile'? 'secondary' : 'primary' }`} />
          </div>
          <Link to="/" className={`${headerStyles["link"]} ${location.pathname === '/profile'? null : headerStyles["active"]} text text_type_main-default`}>Конструктор</Link>
        </nav>
        <nav className={`${headerStyles["header-button"]} ${headerStyles["order-list"]} ${headerStyles["not-active"]} ml-2`}>
          <div className={`mt-1 mr-2 ml-2`}>
            <ListIcon type="secondary" />
          </div>
          <p className="text text_type_main-default">Лента заказов</p>
        </nav>
      </div>
      <Logo />
      <nav className={`${headerStyles["not-active"]} ${headerStyles["header-button"]} ${headerStyles.profile}`}>
        <div className={`mt-1 mr-2 ml-2`}>
          <ProfileIcon type={`${location.pathname === '/profile'? 'primary' : 'secondary' }`} />
        </div>
        <Link to="/profile" className={`${headerStyles["link"]} ${location.pathname === '/profile'? headerStyles["active"] : null } text text_type_main-default`}>Личный кабинет</Link>
      </nav>
    </header>
  );
};
