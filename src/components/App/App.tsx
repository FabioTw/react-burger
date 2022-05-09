import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import app from './app.module.css';
import {AppHeader} from '../AppHeader/AppHeader';
import { LoginPage, HomePage, RegisterPage, ForgotPage, ResetPage, NotFound404, Profile, Feed, ProfileOrders,} from '../../pages/index'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Ingredient } from '../Ingredient/Ingredient';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { FeedDetails } from "../FeedDetails/FeedDetails";
import { FeedInfo } from "../FeedInfo/FeedInfo";
import { getIngredients } from '../../services/thunk/getIngredients';
import { TBackgroundState, TLocationState } from '../../types/types';
import { RenameLocation } from 'typescript';

const App = () => {
  const { standartIngredients,} = useSelector(state => state.ingredients);
  const dispatch = useDispatch();
  React.useEffect(()=>{
    if (standartIngredients[0] === undefined) {
      dispatch(getIngredients())
    }
  },[standartIngredients]);

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
  let location = useLocation<TLocationState>();
  let background: any =  location.state && location.state.background;

  const {isClick} = useSelector(state => state.ingredient)
  const {feedOverlay} = useSelector(state => state.ws)
  if(!isClick) {
    background = location
  }
  if(!feedOverlay) {
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
        <Route path='/feed' exact={true}>
          <Feed />
        </Route>
        {
          !feedOverlay &&
          <Route path='/feed/:id' exact={true}>
            <FeedInfo />
          </Route>
        }
        {
          feedOverlay &&
          <Route path='/feed/:id' exact={true}>
            <Feed />
          </Route>
        }
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
        <ProtectedRoute path="/profile/orders" exact={true}>
          <ProfileOrders />
        </ProtectedRoute>
        {
          !feedOverlay &&
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <FeedInfo />
          </ProtectedRoute>
        }
        {
          feedOverlay &&
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <ProfileOrders />
          </ProtectedRoute>
        }
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {
        feedOverlay &&
        <Route path="/feed/:id" exact={true}>
          <FeedDetails />
        </Route>
      }
      {
        feedOverlay &&
        <Route path="/profile/orders/:id" exact={true}>
          <FeedDetails />
        </Route>
      }
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
