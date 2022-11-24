
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from '../services/store';

import { TIngredientActions } from '../services/actions/ingredient';
import { TIngredientsActions } from '../services/actions/ingredients';
import { TOrderActions } from '../services/actions/order';
import { TProfileActions } from '../services/actions/profile';
import { TWSActions } from '../services/actions/wsActionTypes';


export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = 
  | TIngredientActions 
  | TIngredientsActions 
  | TOrderActions 
  | TProfileActions 
  | TWSActions; 

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch;