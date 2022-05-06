import type { TIngredientActions } from '../actions/ingredient';
import { SELECT_INGREDIENT, CLOSE_INGREDIENT } from "../actions/ingredient";

type TIngredientState = {
  isClick: boolean;
}

const initialState: TIngredientState = {
  isClick: false
}

export const ingredientReducer = (state = initialState, action: TIngredientActions): TIngredientState => {
  switch (action.type) {
    case SELECT_INGREDIENT: {
      return {
        ...state,
        isClick: true
      }
    }
    case CLOSE_INGREDIENT: {
      return {
        ...state,
        isClick: false
      }
    }
    default: {
      return state
    }
  }
}