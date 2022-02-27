import { SELECT_INGREDIENT } from "../actions/ingredient";

const initialState = {
  selectedIngredient: {
    name: '',
    image:'',
    proteins: '',
    fat: '',
    carbohydrates: '',
    calories: '',
  }
}

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: {
          name: action.value.name,
          image:action.value.image,
          proteins: action.value.proteins,
          fat: action.value.fat,
          carbohydrates: action.value.carbohydrates,
          calories: action.value.calories,
        }
      }
    }
    default: {
      return state
    }
  }
}