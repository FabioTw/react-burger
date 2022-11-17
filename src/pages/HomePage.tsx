import React, { FC } from 'react';
import { useSelector, useDispatch } from '../services/hooks/hooks';
import {getOrder} from '../services/thunk/getOrder';
import {BurgerIngredients} from '../components/BurgerIngredients/BurgerIngredients'
import {BurgerConstructor} from '../components/BurgerConstructor/BurgerConstructor'
import { OrderDetails } from '../components/OrderDetails/OrderDetails';
import { CHANGE_CONSTRUCTOR_INGREDIENTS, SELECT_CONSTRUCTOR_BUN } from '../services/actions/ingredients';
import { CLOSE_INGREDIENT, SELECT_INGREDIENT } from '../services/actions/ingredient';
import { v4 as uuidv4 } from 'uuid'
import { Route,useHistory, useLocation } from 'react-router-dom';
import { getUser } from '../services/thunk/getUser';
import { deleteCookie, getCookie } from '../services/cookie';
import { updateToken } from '../services/thunk/updateToken';
import { CLEAN_ORDER } from '../services/actions/order';
import { TConstructorIngredients } from '../types/types';

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.profile)
  const {userFailed, tokenRequest, tokenFailed} = useSelector(state => state.profile)
  const { constructorIngredients, selectedBun, } = useSelector(state => state.ingredients);
  const [orderOverlay, toggleOrderOverlay] = React.useState<boolean>(false)
  const history = useHistory();
  const {isClick} = useSelector(state => state.ingredient)

  const updateOrderOverlay = (): void => {
    if (!user.name) {
      history.replace({ pathname: '/react-burger/login', state: [{ path: '/react-burger', url: '/react-burger', title: 'Home' }] });
    } else {
      dispatch({type: CLEAN_ORDER})
      toggleOrderOverlay(!orderOverlay);
      if (!orderOverlay) {
        dispatch(getOrder(constructorIngredients, selectedBun))
      }
    }
  }

  const updateIngredientOverlay = (): void => {
    if (isClick) {
      dispatch({type: CLOSE_INGREDIENT})
    } else {
      dispatch({type: SELECT_INGREDIENT})
    }
  }

  const updateBun = (item:string): void => {
    dispatch({type: SELECT_CONSTRUCTOR_BUN, value: item})
  }

  const updateIngredients = (item: TConstructorIngredients): void => {
    const key = uuidv4()
    item.uuid = key
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, value: [...constructorIngredients, item]})
  }

  const moveIngredients = (item: Array<TConstructorIngredients>): void => {
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, value: item})
  }

  const onRemoveItem = (id:string): void => {
    let deletedIndex: number;
    constructorIngredients.forEach((element, index) => {
      if (element.id === id) {
        deletedIndex = index;
      }
    });
    const array = constructorIngredients.filter((item, index)=> index !== deletedIndex)
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, value: array})
  };

  const showIngredientDetailsModal = (): void => {
    updateIngredientOverlay()
    dispatch({type: SELECT_INGREDIENT})
  }

  React.useEffect(()=>{
    if (!user.name){
      if (getCookie('token') !== undefined) {
        dispatch(getUser())
        if (userFailed) {
          dispatch(updateToken())
          if (!tokenRequest && !tokenFailed) {
            dispatch(getUser())
          }
          if (tokenFailed) {
            deleteCookie('token');
            deleteCookie('refreshToken');
          }
        }
      }
    }
  },[]);

  return (
    <>
      <BurgerIngredients 
        showIngredientDetailsModal={showIngredientDetailsModal}
      />
      <BurgerConstructor 
        onRemoveItem={onRemoveItem} 
        updateBun={updateBun}
        updateIngredients={updateIngredients}
        moveIngredients={moveIngredients}
        updateOrderOverlay={updateOrderOverlay} 
      />
      {
        orderOverlay && 
        <OrderDetails updateOrderOverlay={updateOrderOverlay}/>
      }
    </>
  )

}