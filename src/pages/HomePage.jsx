import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../services/thunk/getIngredients';
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

export const HomePage = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.profile)
  const {userFailed, tokenRequest, tokenFailed} = useSelector(state => state.profile)
  const { standartIngredients, constructorIngredients, selectedBun, constructorKeys } = useSelector(state => state.ingredients);
  const [orderOverlay, toggleOrderOverlay] = React.useState(false)
  const history = useHistory();
  const {isClick} = useSelector(state => state.ingredient)

  const updateOrderOverlay = () => {
    if (!user.name) {
      history.replace({ pathname: '/login', state: [{ path: '/', url: '/', title: 'Home' }] });
    } else {
      dispatch({type: CLEAN_ORDER})
      toggleOrderOverlay(!orderOverlay);
      if (!orderOverlay) {
        dispatch(getOrder(constructorIngredients, selectedBun))
     }
    }
  }

  const updateIngredientOverlay = () => {
    if (isClick) {
      dispatch({type: CLOSE_INGREDIENT})
    } else {
      dispatch({type: SELECT_INGREDIENT})
    }
  }

  const updateBun = (item) => {
    dispatch({type: SELECT_CONSTRUCTOR_BUN, value: item})
  }

  const updateIngredients = (item) => {
    const key = uuidv4()
    item.uuid = key
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, value: [...constructorIngredients, item]})
  }

  const moveIngredients = (item) => {
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, value: item})
  }

  const onRemoveItem = (id) => {
    let deletedIndex
    constructorIngredients.forEach((element, index) => {
      if (element.id === id) {
        deletedIndex = index;
      }
    });
    const array = constructorIngredients.filter((item, index)=> index !== deletedIndex)
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, value: array})
  };

  const showIngredientDetailsModal = (item) => {
    updateIngredientOverlay()
    dispatch({type: SELECT_INGREDIENT, value:item})
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