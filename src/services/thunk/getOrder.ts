import { AppDispatch, AppThunk } from '../../types';
import { TConstructorIngredients } from '../../types/types';

import { CLEAR_INGREDIENTS } from '../actions/ingredients';
import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS
} from '../actions/order';

import { baseUrl, checkError } from '../apiSettings';
import { getCookie } from '../cookie';

export const getOrder: AppThunk = (constructorIngredients: TConstructorIngredients[], selectedBun: string) => (dispatch: AppDispatch) =>  {
  const order: string[] = [selectedBun];
  constructorIngredients.forEach(element => {
    order.push(element.id);
  });
  dispatch({
    type: GET_ORDER
  })
  fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      ingredients: order
    })
  })
  .then(checkError)
  .then(res => {
    if (res.success) {
      dispatch({
        type: GET_ORDER_SUCCESS,
        number: res.order.number
      })
      dispatch({type: CLEAR_INGREDIENTS})
    } else {
      dispatch({
        type: GET_ORDER_FAILED
      })
    }
  })
  .catch( err => {
      dispatch({
          type: GET_ORDER_FAILED
      })
  })
}

