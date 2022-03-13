import { CLEAR_INGREDIENTS } from '../actions/ingredients';
import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS
} from '../actions/order';
import { baseUrl, checkError } from '../apiSettings';

export function getOrder(constructorIngredients, selectedBun) {
  const order = [selectedBun];
  constructorIngredients.forEach(element => {
    order.push(element.id);
  });
  return function(dispatch) {
    dispatch({
      type: GET_ORDER
    })
    fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
} 

