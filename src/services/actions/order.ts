export const GET_ORDER: 'GET_ORDER' = 'GET_ORDER'
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED'
export const CLEAN_ORDER: 'CLEAN_ORDER' = 'CLEAN_ORDER'

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number: string;
}

export interface ICleanOrderAction {
  readonly type: typeof CLEAN_ORDER;
}


export type TOrderActions = | IGetOrderAction | IGetOrderFailedAction | IGetOrderSuccessAction | ICleanOrderAction;