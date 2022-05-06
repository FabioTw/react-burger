import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../../types';

// Теперь этот хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 