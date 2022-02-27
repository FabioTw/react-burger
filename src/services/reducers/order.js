import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../actions/order';


const initialState = {
  orderNumber : '',
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
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
    default: {
      return state
    }
  }
}