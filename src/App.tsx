import React from 'react';
import logo from './logo.svg';
import app from './app.module.css';
import {AppHeader} from './components/AppHeader/AppHeader';
import {BurgerIngredients} from './components/BurgerIngredients/BurgerIngredients'
import {BurgerConstructor} from './components/BurgerConstructor/BurgerConstructor'

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
