import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import app from './app.module.css';
import {AppHeader} from '../AppHeader/AppHeader';
import { LoginPage, HomePage, RegisterPage, ForgotPage, ResetPage, NotFound404, Profile} from './pages/index'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Ingredient } from '../Ingredient/Ingredient';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';

const App = () => {
  return (
    <>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <ModalSwitch />
          </Router>
        </DndProvider>
    </>
  );
}

function ModalSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;
  const {isClick} = useSelector(state => state.ingredient)
  if(!isClick) {
    background = location
  }
  return (
    <>
      <AppHeader />
      <main className={app.app}>
      <Switch location={background||location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/ingredients/:id"  exact={true}>
          <Ingredient />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {
        isClick && 
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>
      }
      </main>
    </>
  )
}

export default App;
