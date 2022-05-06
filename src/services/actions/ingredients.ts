import { TConstructorIngredients, TIngredients } from "../../types/types"

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS'
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED'
export const CHANGE_CONSTRUCTOR_INGREDIENTS: 'CHANGE_CONSTRUCTOR_INGREDIENTS' = 'CHANGE_CONSTRUCTOR_INGREDIENTS'
export const SELECT_CONSTRUCTOR_BUN: 'SELECT_CONSTRUCTOR_BUN' = 'SELECT_CONSTRUCTOR_BUN'
export const CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS' = 'CLEAR_INGREDIENTS'

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredients>;
}

export interface IChangeConstructorIngredientsAction {
  readonly type: typeof CHANGE_CONSTRUCTOR_INGREDIENTS;
  readonly value: ReadonlyArray<TConstructorIngredients>;
}

export interface ISelectConstructorBunAction {
  readonly type: typeof SELECT_CONSTRUCTOR_BUN;
  readonly value: string;
}

export interface IClearIngredientsAction {
  readonly type: typeof CLEAR_INGREDIENTS;
}


export type TIngredientsActions = 
  | IGetIngredientsAction 
  | IGetIngredientsFailedAction 
  | IGetIngredientsSuccessAction 
  | IClearIngredientsAction 
  | IChangeConstructorIngredientsAction
  | ISelectConstructorBunAction;