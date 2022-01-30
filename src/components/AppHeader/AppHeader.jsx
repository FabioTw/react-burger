import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

export const AppHeader = () => {
  return (
    <header className={`${headerStyles["app-header"]} mt-4 mb-4`}>
      <div className={`${headerStyles["left-header-buttons"]} mr-30`}>
        <nav className={`${headerStyles["header-button"]} ${headerStyles.constructor} ml-1`}>
          <div className={`mt-1 mr-2 ml-2`}>
            <BurgerIcon type="primary" />
          </div>
          <p className="text text_type_main-default">Конструктор</p>
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
          <ProfileIcon type="secondary" />
        </div>
        <p className="text text_type_main-default">Личный кабинет</p>
      </nav>
    </header>
  );
};
