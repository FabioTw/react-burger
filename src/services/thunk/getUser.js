import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from '../actions/profile';
import { getCookie } from '../cookie';
import { baseUrl } from "../apiSettings";

export function getUser () {
  return function (dispatch) {
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
    .then(res => res.json())
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
      return data.success
    })
  }
}