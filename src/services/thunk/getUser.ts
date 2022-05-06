import { AppDispatch, AppThunk } from '../../types';
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from '../actions/profile';
import { getCookie } from '../cookie';
import { baseUrl, checkError } from "../apiSettings";


export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER })
  fetch(`${baseUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  .then(checkError)
  .then(data => {
    if (data.success) {
      dispatch({
        type: GET_USER_SUCCESS,
        user: data.user
      })
    } else {
      dispatch({
        type: GET_USER_FAILED
      })
    }
  })
  .catch( err => {
    dispatch({
        type: GET_USER_FAILED
    })
  })
}
