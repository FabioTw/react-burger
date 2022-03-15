import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import app from './app.module.css';
import {AppHeader} from '../AppHeader/AppHeader';
import { LoginPage, HomePage, RegisterPage, ForgotPage, ResetPage} from './pages/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={app.app}>
        <DndProvider backend={HTML5Backend}>
          <Router>
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
              <Route path="/profile" exact={true}>
                {/* <Profile /> */}
              </Route>
              <Route path="/ingredients/:id" exact={true}>
                {/* <Ingridients /> */}
              </Route>
            </Switch>
          </Router>
        </DndProvider>
      </main>
    </>
  );
}

export default App;
