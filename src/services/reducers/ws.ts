import { TWebSocket, TWSOrder } from "../../types/types";
import type { TWSActions } from "../actions/wsActionTypes";

import { 
  WS_CONNECTION_CLOSED, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_SUCCESS, 
  WS_GET_MESSAGE,
  WS_SELECT_ORDER,
  WS_CLOSE_ORDER,
  WS_CLEAN_ORDERS
} from "../actions/wsActionTypes";

type TWSState = TWebSocket & { 
  error: undefined | string;
}  

const initialState: TWSState = {
  wsConnected: false,
  wsPrivateConnected: false,
  orders: [],
  selectedOrder: {},
  total: 0,
  totalToday: 0,
  error: undefined,
  feedOverlay: false,
  wsClosed: false
}; 


export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        wsClosed: false
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        wsPrivateConnected: false,
        wsClosed: true
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
          error: undefined,
          orders: action.payload.orders,
          totalToday: action.payload.totalToday,
          total: action.payload.total,
      };
    case WS_SELECT_ORDER: 
      return { 
        ...state,
        selectedOrder: action.payload,
        feedOverlay: true
      }
    case WS_CLOSE_ORDER: 
      return {
        ...state,
        selectedOrder: {},
        feedOverlay: false
      }
    case WS_CLEAN_ORDERS: 
      return {
        ...state,
        orders: [],
        selectedOrder: {},
        total: 0,
        totalToday: 0,
        error: undefined,
        feedOverlay: false,
      }
    default:
      return state;
  }
}; 