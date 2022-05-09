import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, 
  WS_CONNECTION_START, WS_CONNECTION_SUCCESS, 
  WS_GET_MESSAGE, WS_PRIVATE_CONNECTION_START, } from '../services/actions/wsActionTypes';
export type TIngredients = {
  _id: string;
  name: string,
  type: string,
  proteins: number,
  fat: number,
  calories: number,
  carbohydrates: number,
  image: string,
  image_large: string,
  image_mobile: string,
  price: number,
  __v: number,
};

export type TWebSocket = {
  wsConnected: boolean;
  wsPrivateConnected: boolean;
  orders: TWSOrder[];
  selectedOrder?: TWSOrder | undefined;
  total: number;
  totalToday: number;
  feedOverlay: boolean;
  wsClosed: boolean;
}

export type TWSOrder = {
  _id?: string;
  ingredients ?: string[];
  status?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  number?: number;
}

export type TConstructorIngredients = {
  id: string;
  type: string;
  uuid: string;
}

export type TUser = {
   email: string;
   name: string;
}

export type TWSActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsPrivateInit: typeof WS_PRIVATE_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
}

export type TBackgroundState = {
  pathname: string; 
  search: string; 
  hash: string;
  state: undefined; 
  key: string;
}

export type TLocationState = Location & {
  from: {
    pathname: string;
    state?: undefined | {background?: TBackgroundState};
    search: string;
  };
  background?: TBackgroundState | undefined;
}

export type TCardIngredient = {
  name:string;
  array: TIngredients[];
  selected:string[];
}
