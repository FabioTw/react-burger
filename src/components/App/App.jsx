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
  const [ingredients, addIngredients] = React.useState([])
  const [orderOverlay, toggleOrderOverlay] = React.useState(false)
  const [ingredientOverlay, toggleIngredientOverlay] = React.useState(false)
  const [ingredientsItem, setIngredientsItem] = React.useState(null)

  const updateOrderOverlay = () => {
    toggleOrderOverlay(!orderOverlay);
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
    let deletedIndex = ingredients.indexOf(id);
    let array = ingredients.filter((item, index)=> index !== deletedIndex)
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
        <BurgerConstructor 
          ingredientsInfo={data} 
          bun={bun} 
          ingredients={ingredients} 
          onRemoveItem={onRemoveItem} 
          updateOrderOverlay={updateOrderOverlay} 
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
