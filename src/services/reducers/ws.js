import { 
  WS_CONNECTION_CLOSED, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_SUCCESS, 
  WS_GET_MESSAGE,
  WS_SELECT_ORDER,
  WS_CLOSE_ORDER,
} from "../actions/wsActionTypes";

const initialState = {
  wsConnected: false,
  orders: [],
  selectedOrder: [],
  total: 0,
  totalToday: 0,
  error: undefined,
  feedOverlay: false,
}; 


export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
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
        wsConnected: false
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
        selectedOrder: [],
        feedOverlay: false
      }
    default:
      return state;
  }
}; 