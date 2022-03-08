import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_CONSTRUCTOR_INGREDIENTS,
  SELECT_CONSTRUCTOR_BUN,
  CLEAR_INGREDIENTS
} from '../actions/ingredients.js'

const initialState = {
  standartIngredients: [],
  constructorIngredients: [],
  selectedBun: '',
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        standartIngredients: action.ingredients,
        ingredientsRequest: false,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    }
    case CHANGE_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: action.value,
      }
    }
    case SELECT_CONSTRUCTOR_BUN: {
      return {
        ...state,
        selectedBun: action.value
      }
    }
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: [],
        selectedBun: '',
      }
    }
    default: {
      return state
    }
  }
}