import React from 'react';
import app from './app.module.css';
import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients'
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor'
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails} from '../IngredientDetails/IngredientDetails';
import { IngredientsContext } from '../../services/ingredientsContext';
import { OrderContext } from '../../services/orderContext';

const dataLink = 'https://norma.nomoreparties.space/api/ingredients';
const orderLink = 'https://norma.nomoreparties.space/api/orders';

const App = () => {
  const [data, setState] = React.useState([]);
  const [bun, selectBun] = React.useState('')
  const [ingredients, addIngredients] = React.useState([])
  const [orderNumber, setOrderNumber] = React.useState('')
  const [orderOverlay, toggleOrderOverlay] = React.useState(false)
  const [ingredientOverlay, toggleIngredientOverlay] = React.useState(false)
  const [ingredientsItem, setIngredientsItem] = React.useState(null)

  const updateOrderOverlay = () => {
    toggleOrderOverlay(!orderOverlay);
    checkout(ingredients);
  }

  const updateIngredientOverlay = () => {
    toggleIngredientOverlay(!ingredientOverlay);
  }

  const updateIngredientItem = (item) => {
    setIngredientsItem(item);
  }

  const updateBun = (value) => {
    selectBun(value)
  }

  const updateIngredients = (value) => {
    addIngredients([...ingredients, value])
  }

  const onRemoveItem = (id) => {
    const deletedIndex = ingredients.indexOf(id);
    const array = ingredients.filter((item, index)=> index !== deletedIndex)
    addIngredients(array)
  };

  const showIngredientDetailsModal = (item) => {
    updateIngredientOverlay()
    updateIngredientItem(item)
  }

  React.useEffect(()=>{
    fetch(dataLink)
      .then(checkError)
      .then(res => setState(res.data))
      .catch(res => console.log(`Ошибка: ${res.status}`))
  },[]);

  const checkout = (ingredients) => {
    return fetch(orderLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": ingredients
      })
    })
      .then(checkError)
      .then(res => setOrderNumber(res.order))
      .catch(res => console.log(`Ошибка: ${res.status}`))
  }

  const checkError = (res) => {
    if (!res.ok) {
        return Promise.reject()
    }
    return res.json();
  }

  return (
    <>
    
      <AppHeader />
      <main className={app.app}>
        <BurgerIngredients 
          ingredientsInfo={data} 
          updateBun={updateBun} 
          updateIngredients={updateIngredients}
          showIngredientDetailsModal={showIngredientDetailsModal}
        />
        <IngredientsContext.Provider value={ingredients}>
          <BurgerConstructor 
            ingredientsInfo={data} 
            bun={bun} 
            onRemoveItem={onRemoveItem} 
            updateOrderOverlay={updateOrderOverlay} 
          />
        </IngredientsContext.Provider>
        {
          orderOverlay && 
          <OrderContext.Provider value={orderNumber}>
            <OrderDetails updateOrderOverlay={updateOrderOverlay}/>
          </OrderContext.Provider>
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
