import { SELECT_INGREDIENT, CLOSE_INGREDIENT } from "../actions/ingredient";

const initialState = {
  isClick: false
}

export const ingredientReducer = (state = initialState, action) => {
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