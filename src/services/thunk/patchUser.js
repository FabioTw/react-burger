import {
  PATCH_PROFILE,
  PATCH_PROFILE_SUCCESS,
  PATCH_PROFILE_FAILED,
} from '../actions/profile';
import { getCookie } from '../cookie';
import { baseUrl } from "../apiSettings";

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
    .then(res => res.json())
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
      return data.success
    })
  }
}