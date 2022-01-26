import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';

export const AppHeader = () => {
  return <header className={headerStyles['app-header']}>
    <div className={headerStyles['left-header-buttons']}>
    <nav className={`${headerStyles.headerButton} ${headerStyles.constructor}`}>
      <div className={headerStyles.ico}><BurgerIcon type="primary" /></div>
      <p className="text text_type_main-default">Конструктор</p>
    </nav>
    <nav className={`${headerStyles.headerButton} ${headerStyles.orderList} ${headerStyles.notActive}`}>
      <div className={headerStyles.ico}><ListIcon type="secondary" /></div>
      <p className="text text_type_main-default">Лента заказов</p>
    </nav>
    </div>
    <Logo />
    <nav className={`${headerStyles.profile} ${headerStyles.notActive} ${headerStyles.headerButton}`}>
      <div className={headerStyles.ico}><ProfileIcon type="secondary" /></div>
      <p className="text text_type_main-default">Личный кабинет</p>
    </nav>
  </header>
}