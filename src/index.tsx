import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {AppHeader} from './components/AppHeader/AppHeader';
import {BurgerIngredients} from './components/BurgerIngredients/BurgerIngredients'
import {BurgerConstructor} from './components/BurgerConstructor/BurgerConstructor'


ReactDOM.render(
  <React.StrictMode>
    <>
      <AppHeader />
      <main style={{display: 'flex', justifyContent: 'center'}}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
