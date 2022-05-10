import { AppDispatch, AppThunk } from '../../types';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS
} from '../actions/ingredients';

import { baseUrl, checkError } from '../apiSettings';

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS
  })
  fetch(`${baseUrl}/ingredients`)
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
