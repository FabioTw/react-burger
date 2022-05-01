import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../actions/profile';
import { baseUrl, checkError } from "../apiSettings";

export function forgotPass (form) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD })
    fetch(`${baseUrl}/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        })
      } else {
        alert(data.message)
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        })
      }
      return data.success
    });
  } 
}

export function resetPass (form) {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD })
    fetch(`${baseUrl}/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    })
    .then(checkError)
    .then(data => {
      if (data.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        })
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED
        })
      }
    })
    .catch( err => {
      dispatch({
          type: RESET_PASSWORD_FAILED
      })
    })
  } 
}