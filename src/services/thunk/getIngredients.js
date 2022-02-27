import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS
} from '../actions/ingredients';
const dataLink = 'https://norma.nomoreparties.space/api/ingredients';


export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS
    })
    fetch(dataLink)
    .then(checkError)
    .then( res  => {
      if (res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    })
    .catch( err => {
        dispatch({
            type: GET_INGREDIENTS_FAILED
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