import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import app from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/thunk/getIngredients';
import {getOrder} from '../../services/thunk/getOrder';
import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails} from '../IngredientDetails/IngredientDetails';
import { CHANGE_CONSTRUCTOR_INGREDIENTS, SELECT_CONSTRUCTOR_BUN } from '../../services/actions/ingredients';
import { SELECT_INGREDIENT } from '../../services/actions/ingredient';

const App = () => {
  const dispatch = useDispatch();
  const { standartIngredients, constructorIngredients, selectedBun } = useSelector(state => state.ingredients);
  const [orderOverlay, toggleOrderOverlay] = React.useState(false)
  const [ingredientOverlay, toggleIngredientOverlay] = React.useState(false)

  // const [elements, setElements] = React.useState([]);
  // const [draggedElements, setDraggedElements] = React.useState([]);

  const updateOrderOverlay = () => {
    toggleOrderOverlay(!orderOverlay);
    dispatch(getOrder(constructorIngredients, selectedBun));
  }

  const updateIngredientOverlay = () => {
    toggleIngredientOverlay(!ingredientOverlay);
    dispatch({type: SELECT_INGREDIENT, value:''})
  }

  const updateBun = (item) => {
    dispatch({type: SELECT_CONSTRUCTOR_BUN, value: item})
  }

  const updateIngredients = (item) => {
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, value: [...constructorIngredients, item.id]})
  }

  const onRemoveItem = (id) => {
    const deletedIndex = constructorIngredients.indexOf(id);
    const array = constructorIngredients.filter((item, index)=> index !== deletedIndex)
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, value: array})
  };

  const showIngredientDetailsModal = (item) => {
    updateIngredientOverlay()
    dispatch({type: SELECT_INGREDIENT, value:item})
  }

  React.useEffect(()=>{
    dispatch(getIngredients())
  },[]);

  return (
    <>
      <AppHeader />
      <main className={app.app}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients 
            showIngredientDetailsModal={showIngredientDetailsModal}
          />
            <BurgerConstructor 
              onRemoveItem={onRemoveItem} 
              updateBun={updateBun}
              updateIngredients={updateIngredients}
              updateOrderOverlay={updateOrderOverlay} 
            />
        </DndProvider>
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
        
      </main>
    </>
  );
}

export default App;
