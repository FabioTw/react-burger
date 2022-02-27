import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  order: orderReducer
});
