import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import app from './app.module.css';
import {AppHeader} from '../AppHeader/AppHeader';
import { LoginPage, HomePage, RegisterPage, ForgotPage, ResetPage, NotFound404, Profile} from './pages/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <>
      
        <DndProvider backend={HTML5Backend}>
          <Router>
            <AppHeader />
            <main className={app.app}>
            <Switch>
              <Route path="/" exact={true}>
                <HomePage />
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
              <Route path="/ingredients/:id" exact={true}>
                {/* <Ingridients /> */}
              </Route>
              <Route>
                <NotFound404 />
              </Route>
            </Switch>
            </main>
          </Router>
        </DndProvider>

    </>
  );
}

export default App;
