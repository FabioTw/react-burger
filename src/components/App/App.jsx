import React from 'react';
import app from './app.module.css';
import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails} from '../IngredientDetails/IngredientDetails';

const dataLink = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [data, setState] = React.useState([]);
  const [bun, selectBun] = React.useState('')
  const [ingridients, addIngridients] = React.useState([])
  const [orderOverlay, toggleOrderOverlay] = React.useState(false)
  const [ingredientOverlay, toggleIngredientOverlay] = React.useState(false)
  const [ingredientsItem, setIngredientsItem] = React.useState(null)

  const updateOrderOverlay = () => {
    toggleOrderOverlay(!orderOverlay);
  }

  const updateIngredientOverlay = () => {
    toggleIngredientOverlay(!ingredientOverlay);
  }

  const updateIngredientItem = (props) => {
    setIngredientsItem(props.item);
  }

  const updateBun = (value) => {
    selectBun(value)
  }

  const updateIngridients = (value) => {
    addIngridients([...ingridients, value])
  }

  const onRemoveItem = (id) => {
    const array = ingridients
    let index = array.indexOf(id);
    if (index > -1) {
      array.splice(index, 1);
    }
    addIngridients([...ingridients, array])
  };

  React.useEffect(()=>{
    fetch(dataLink)
      .then(res => res.json())
      .then(res => setState(res.data))
      .catch(res => console.log(`Ошибка: ${res.status}`))
  },[]);

  return (
    <>
      <AppHeader />
      <main className={app.app}>
        <BurgerIngredients 
          ingredientsInfo={data} 
          updateBun={updateBun} 
          updateIngridients={updateIngridients}
        />
        <BurgerConstructor 
          ingredientsInfo={data} 
          bun={bun} 
          ingridients={ingridients} 
          onRemoveItem={onRemoveItem} 
          updateOrderOverlay={updateOrderOverlay} 
          updateIngredientOverlay={updateIngredientOverlay} 
          updateIngredientItem={updateIngredientItem} 
        />
        {
          orderOverlay && <OrderDetails updateOrderOverlay={updateOrderOverlay}/>
        }
        {
          ingredientOverlay && 
          <IngredientDetails 
            updateIngredientOverlay={updateIngredientOverlay} 
            name={ingredientsItem.name} 
            image={ingredientsItem.image}
            proteins={ingredientsItem.proteins}
            fat={ingredientsItem.fat}
            carbohydrates={ingredientsItem.carbohydrates}
            calories={ingredientsItem.calories}
          />
        }
      </main>
    </>
  );
}

export default App;
