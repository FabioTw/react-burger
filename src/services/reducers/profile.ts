import { TUser } from '../../types/types';
import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILED,
  REGISTER_PROFILE,
  REGISTER_PROFILE_SUCCESS,
  REGISTER_PROFILE_FAILED,
  LOGIN_PROFILE,
  LOGIN_PROFILE_SUCCESS,
  LOGIN_PROFILE_FAILED,
  LOGOUT_PROFILE,
  LOGOUT_PROFILE_SUCCESS,
  LOGOUT_PROFILE_FAILED,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  PATCH_PROFILE,
  PATCH_PROFILE_SUCCESS,
  PATCH_PROFILE_FAILED,
  TProfileActions,
} from '../actions/profile';

type TProfileState = {
  user: TUser;
  loginRequest: boolean;
  loginFailed: boolean;

  registerRequest: boolean;
  registerFailed: boolean;

  forgotRequest: boolean;
  forgotFailed: boolean;

  resetRequest: boolean;
  resetFailed: boolean;

  tokenRequest: boolean;
  tokenFailed: boolean;

  userRequest: boolean;
  userFailed: boolean;

  patchRequest: boolean;
  patchFailed: boolean;

  logoutRequest: boolean;
  logoutFailed: boolean;
  
  emailSended: boolean;
}

const initialState: TProfileState = {
  user: {name: '', email: ''},

  loginRequest: false,
  loginFailed: false,

  registerRequest: false,
  registerFailed: false,

  forgotRequest: false,
  forgotFailed: false,
  resetRequest: false,
  resetFailed: false,

  tokenRequest: false,
  tokenFailed: false,

  userRequest: false,
  userFailed: false,

  patchRequest: false,
  patchFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  emailSended: false,
};

export const profileReducer = (state = initialState, action: TProfileActions): TProfileState => {
  switch (action.type) {
    case GET_TOKEN: {
      return {
        ...state,
        tokenRequest: true,
        tokenFailed: false,
      }
    }
    case GET_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false
      }
    }
    case GET_TOKEN_FAILED: {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: true,
      }
    }
    case GET_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        userRequest: false
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
      }
    }
    case REGISTER_PROFILE: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      }
    }
    case REGISTER_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.user,
        registerRequest: false
      }
    }
    case REGISTER_PROFILE_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      }
    }
    case LOGIN_PROFILE: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      }
    }
    case LOGIN_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginRequest: false
      }
    }
    case LOGIN_PROFILE_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      }
    }
    case FORGOT_PASSWORD: {
      return {
        ...state,
        forgotRequest: true,
        forgotFailed: false,
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        emailSended: true,
        forgotRequest: false,
        
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotRequest: false,
        forgotFailed: true,
      }
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        resetRequest: true,
        resetFailed: false,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetRequest: false,
        emailSended: false
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetRequest: false,
        resetFailed: true,
      }
    }
    case PATCH_PROFILE: {
      return {
        ...state,
        patchRequest: true,
        patchFailed: false,
      }
    }
    case PATCH_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.user,
        patchRequest: false
      }
    }
    case PATCH_PROFILE_FAILED: {
      return {
        ...state,
        patchRequest: false,
        patchFailed: true,
      }
    }
    case LOGOUT_PROFILE: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      }
    }
    case LOGOUT_PROFILE_SUCCESS: {
      return {
        ...state,
        user: {name: '', email: ''},
        logoutRequest: false,
        
      }
    }
    case LOGOUT_PROFILE_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      }
    }
    default: {
      return state
    }
  }
}