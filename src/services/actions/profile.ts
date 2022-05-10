import { TUser } from "../../types/types"

export const GET_TOKEN: 'GET_TOKEN' = 'GET_TOKEN'
export const GET_TOKEN_SUCCESS: 'GET_TOKEN_SUCCESS' = 'GET_TOKEN_SUCCESS'
export const GET_TOKEN_FAILED: 'GET_TOKEN_FAILED' = 'GET_TOKEN_FAILED'
export const GET_USER: 'GET_USER' = 'GET_USER'
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS'
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED'
export const REGISTER_PROFILE: 'REGISTER_PROFILE' = 'REGISTER_PROFILE'
export const REGISTER_PROFILE_SUCCESS: 'REGISTER_PROFILE_SUCCESS' = 'REGISTER_PROFILE_SUCCESS'
export const REGISTER_PROFILE_FAILED: 'REGISTER_PROFILE_FAILED'= 'REGISTER_PROFILE_FAILED'
export const LOGIN_PROFILE: 'LOGIN_PROFILE' = 'LOGIN_PROFILE'
export const LOGIN_PROFILE_SUCCESS: 'LOGIN_PROFILE_SUCCESS' = 'LOGIN_PROFILE_SUCCESS'
export const LOGIN_PROFILE_FAILED: 'LOGIN_PROFILE_FAILED' = 'LOGIN_PROFILE_FAILED'
export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED'
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED'= 'RESET_PASSWORD_FAILED'
export const LOGOUT_PROFILE: 'LOGOUT_PROFILE' = 'LOGOUT_PROFILE'
export const LOGOUT_PROFILE_SUCCESS: 'LOGOUT_PROFILE_SUCCESS' = 'LOGOUT_PROFILE_SUCCESS'
export const LOGOUT_PROFILE_FAILED: 'LOGOUT_PROFILE_FAILED' = 'LOGOUT_PROFILE_FAILED'
export const PATCH_PROFILE: 'PATCH_PROFILE' = 'PATCH_PROFILE'
export const PATCH_PROFILE_SUCCESS: 'PATCH_PROFILE_SUCCESS' = 'PATCH_PROFILE_SUCCESS'
export const PATCH_PROFILE_FAILED: 'PATCH_PROFILE_FAILED' = 'PATCH_PROFILE_FAILED'

export interface IGetTokenAction {
  readonly type: typeof GET_TOKEN;
}

export interface IGetTokenSuccessAction {
  readonly type: typeof GET_TOKEN_SUCCESS;
}

export interface IGetTokenFailedAction {
  readonly type: typeof GET_TOKEN_FAILED;
}

export interface IGetUserAction {
  readonly type: typeof GET_USER;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IRegisterProfileAction {
  readonly type: typeof REGISTER_PROFILE;
}

export interface IRegisterProfileSuccessAction {
  readonly type: typeof REGISTER_PROFILE_SUCCESS;
  readonly user: TUser
}

export interface IRegisterProfileFailedAction {
  readonly type: typeof REGISTER_PROFILE_FAILED;
}

export interface ILoginProfileAction {
  readonly type: typeof LOGIN_PROFILE;
}

export interface ILoginProfileSuccessAction {
  readonly type: typeof LOGIN_PROFILE_SUCCESS;
  readonly user: TUser
}

export interface ILoginProfileFailedAction {
  readonly type: typeof LOGIN_PROFILE_FAILED;
}

export interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ILogoutProfileAction {
  readonly type: typeof LOGOUT_PROFILE;
}

export interface ILogoutProfileSuccessAction {
  readonly type: typeof LOGOUT_PROFILE_SUCCESS;
}

export interface ILogoutProfileFailedAction {
  readonly type: typeof LOGOUT_PROFILE_FAILED;
}

export interface IPatchProfileAction {
  readonly type: typeof PATCH_PROFILE;
}

export interface IPatchProfileSuccessAction {
  readonly type: typeof PATCH_PROFILE_SUCCESS;
  readonly user: TUser
}

export interface IPatchProfileFailedAction {
  readonly type: typeof PATCH_PROFILE_FAILED;
}

export type TProfileActions = 
  | IGetTokenAction
  | IGetTokenSuccessAction
  | IGetTokenFailedAction
  | IGetUserAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IRegisterProfileAction
  | IRegisterProfileSuccessAction
  | IRegisterProfileFailedAction
  | ILoginProfileAction
  | ILoginProfileSuccessAction
  | ILoginProfileFailedAction
  | IForgotPasswordAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IResetPasswordAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | ILogoutProfileAction
  | ILogoutProfileSuccessAction
  | ILogoutProfileFailedAction
  | IPatchProfileAction
  | IPatchProfileSuccessAction
  | IPatchProfileFailedAction;