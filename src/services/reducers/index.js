import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  profile: profileReducer,
});
