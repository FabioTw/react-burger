import { deleteCookie, getCookie } from "../cookie";
import {
  LOGOUT_PROFILE,
  LOGOUT_PROFILE_SUCCESS,
  LOGOUT_PROFILE_FAILED,
} from '../actions/profile';
import { baseUrl, checkError } from "../apiSettings";


export function logOut () {
  return function (dispatch) {
    dispatch({ type: LOGOUT_PROFILE })
    fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
    .then(checkError)
    .then(data => {
      if (data.success) {
        deleteCookie('token');
        deleteCookie('refreshToken');
        dispatch({
          type: LOGOUT_PROFILE_SUCCESS,
        })
      } else {
        dispatch({
          type: LOGOUT_PROFILE_FAILED
        })
      }
    })
    .catch( err => {
      dispatch({
          type: LOGOUT_PROFILE_FAILED
      })
    })
  } 
}