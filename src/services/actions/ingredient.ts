export const SELECT_INGREDIENT: 'SELECT_INGREDIENT' = 'SELECT_INGREDIENT'
export const CLOSE_INGREDIENT: 'CLOSE_INGREDIENT' = 'CLOSE_INGREDIENT'

export interface ISelectIngredientAction {
  readonly type: typeof SELECT_INGREDIENT;
}

export interface ICloseIngredientAction {
  readonly type: typeof CLOSE_INGREDIENT;
}

export type TIngredientActions = | ISelectIngredientAction | ICloseIngredientAction;