import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS
} from '../actions/order';

export function getOrder(constructorIngredients, selectedBun) {
  const orderLink = 'https://norma.nomoreparties.space/api/orders';
  const order = [selectedBun];
  constructorIngredients.forEach(element => {
    order.push(element);
  });
  return function(dispatch) {
    dispatch({
      type: GET_ORDER
    })
    fetch(orderLink, {
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

const checkError = (res) => {
  if (!res.ok) {
      return Promise.reject()
  }
  return res.json();
}