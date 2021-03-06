import type { TOrderActions } from '../actions/order';
import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAN_ORDER
} from '../actions/order';

type TOrderState = {
  orderNumber: string;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: TOrderState = {
  orderNumber : 'Загрузка',
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.number,
        orderRequest: false
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    case CLEAN_ORDER: {
      return {
        ...state,
        orderNumber: 'Загрузка',
      }
    }
    default: {
      return state
    }
  }
}