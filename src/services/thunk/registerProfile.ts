import {
  REGISTER_PROFILE,
  REGISTER_PROFILE_SUCCESS,
  REGISTER_PROFILE_FAILED,
} from '../actions/profile';
import { setCookie } from '../cookie';
import { baseUrl, checkError } from "../apiSettings";
import { AppDispatch, AppThunk } from '../../types';

export const signUp: AppThunk = (form: {email: string; name: string; password: string}) => (dispatch: AppDispatch) => {
  dispatch({ type: REGISTER_PROFILE })
  fetch(`${baseUrl}/auth/register`, {
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
      let authToken, refreshToken;
      authToken = data.accessToken.split('Bearer ')[1];
      refreshToken = data.refreshToken
      if (authToken) {
        setCookie('token', authToken);
        setCookie('refreshToken', refreshToken);
      }
      dispatch({
        type: REGISTER_PROFILE_SUCCESS,
        user: data.user
      })
    } else {
      dispatch({
        type: REGISTER_PROFILE_FAILED
      })
    }
  })
  .catch( err => {
    dispatch({
        type: REGISTER_PROFILE_FAILED
    })
  })
} 
