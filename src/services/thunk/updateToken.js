import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILED,
} from '../actions/profile';
import { getCookie, setCookie } from '../cookie';
import { baseUrl, checkError } from "../apiSettings";
import { getUser } from './getUser';

export function updateToken () {
  return function (dispatch) {
    dispatch({ type: GET_TOKEN })
    fetch(`${baseUrl}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        let authToken, refreshToken;
        authToken = data.accessToken.split('Bearer ')[1];
        refreshToken = data.refreshToken
        if (authToken) {
          setCookie('token', authToken);
          setCookie('refreshToken', refreshToken);
        }
        dispatch({
          type: GET_TOKEN_SUCCESS,
        })
      } else {
        dispatch({
          type: GET_TOKEN_FAILED
        })
      }
      return data.success
    });
  }
}