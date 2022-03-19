import {
  PATCH_PROFILE,
  PATCH_PROFILE_SUCCESS,
  PATCH_PROFILE_FAILED,
} from '../actions/profile';
import { getCookie } from '../cookie';
import { baseUrl, checkError } from "../apiSettings";

export function patchUser (form) {
  return function (dispatch) {
    dispatch({ type: PATCH_PROFILE })
    fetch(`${baseUrl}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    })
    .then(checkError)
    .then(data => {
      if (data.success) {
        dispatch({
          type: PATCH_PROFILE_SUCCESS,
          user: data.user
        })
      } else {
        dispatch({
          type: PATCH_PROFILE_FAILED
        })
      }
    })
    .catch( err => {
      dispatch({
          type: PATCH_PROFILE_FAILED
      })
    })
  }
}