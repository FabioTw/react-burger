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
  GET_LOGOUT,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../actions/profile';


const initialState = {
  user: {},

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

  emailSended: false,
};

export const profileReducer = (state = initialState, action) => {
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
        user: action.user,
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
        forgotRequest: false,
        emailSended: true
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
    default: {
      return state
    }
  }
}