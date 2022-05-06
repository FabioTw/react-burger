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
  selectedOrder: TWSOrder | {} | undefined;
  total: number;
  totalToday: number;
  feedOverlay: boolean;
  wsClosed: boolean;
}

export type TWSOrder = {
  _id: string;
  ingredients : string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
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
