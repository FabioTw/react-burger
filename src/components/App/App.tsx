import React from 'react';
import logo from './logo.svg';
import app from './app.module.css';
import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'

function App() {
  return (
    <>
      <AppHeader />
      <main className={app.app}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
