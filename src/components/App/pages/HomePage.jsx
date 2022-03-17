import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../../services/thunk/getIngredients';
import {getOrder} from '../../../services/thunk/getOrder';
import {BurgerIngredients} from '../../BurgerIngredients/BurgerIngredients'
import {BurgerConstructor} from '../../BurgerConstructor/BurgerConstructor'
import { OrderDetails } from '../../OrderDetails/OrderDetails';
import { IngredientDetails} from '../../IngredientDetails/IngredientDetails';
import { CHANGE_CONSTRUCTOR_INGREDIENTS, SELECT_CONSTRUCTOR_BUN } from '../../../services/actions/ingredients';
import { SELECT_INGREDIENT } from '../../../services/actions/ingredient';
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from 'react-router-dom';
import { getUser } from '../../../services/thunk/getUser';

export const HomePage = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.profile)
  const { standartIngredients, constructorIngredients, selectedBun, constructorKeys } = useSelector(state => state.ingredients);
  const [orderOverlay, toggleOrderOverlay] = React.useState(false)
  const [ingredientOverlay, toggleIngredientOverlay] = React.useState(false)
  const history = useHistory();

  const updateOrderOverlay = () => {
    if (!user.name) {
      history.replace({ pathname: '/login', state: [{ path: '/', url: '/', title: 'Home' }] });
    } else {
      toggleOrderOverlay(!orderOverlay);
      if (!orderOverlay) {
        dispatch(getOrder(constructorIngredients, selectedBun))
     }
    }
  }

  const updateIngredientOverlay = () => {
    toggleIngredientOverlay(!ingredientOverlay);
    dispatch({type: SELECT_INGREDIENT, value:''})
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
    dispatch(getIngredients())
    init();
  },[]);

  const init = async () => {
    if (!user.name) {
      await dispatch(getUser())
    }
  };

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
      {
        ingredientOverlay && 
        <IngredientDetails 
          updateIngredientOverlay={updateIngredientOverlay} 
        />
      }
    </>
  )

}