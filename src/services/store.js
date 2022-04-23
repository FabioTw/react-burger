import { rootReducer } from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, 
  WS_CONNECTION_START, WS_CONNECTION_SUCCESS, 
  WS_GET_MESSAGE, WS_PRIVATE_CONNECTION_START, } from './actions/wsActionTypes';
import {getCookie} from './cookie'
import { useState } from 'react';

export const wsUrl = `wss://norma.nomoreparties.space/orders/all`;

export let personalAccess = false;

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsPrivateInit: WS_PRIVATE_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

export const store = createStore(rootReducer, enhancer); 
