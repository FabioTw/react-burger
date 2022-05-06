import { TWebSocket, TWSOrder } from "../../types/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_PRIVATE_CONNECTION_START: 'WS_PRIVATE_CONNECTION_START' = 'WS_PRIVATE_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SELECT_ORDER: 'WS_SELECT_ORDER' = 'WS_SELECT_ORDER';
export const WS_CLOSE_ORDER: 'WS_CLOSE_ORDER' = 'WS_CLOSE_ORDER';
export const WS_CLEAN_ORDERS: 'WS_CLEAN_ORDERS' = 'WS_CLEAN_ORDERS';

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSPrivateConnectionStartAction {
  readonly type: typeof WS_PRIVATE_CONNECTION_START;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWebSocket;
}

export interface IWSSelectOrderAction {
  readonly type: typeof WS_SELECT_ORDER;
  readonly payload?: TWSOrder;
}

export interface IWSCloseOrderAction {
  readonly type: typeof WS_CLOSE_ORDER;
}

export interface IWSCleanOrdersAction {
  readonly type: typeof WS_CLEAN_ORDERS;
}

export type TWSActions = 
  | IWSConnectionStartAction
  | IWSPrivateConnectionStartAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSelectOrderAction
  | IWSCloseOrderAction
  | IWSCleanOrdersAction;
