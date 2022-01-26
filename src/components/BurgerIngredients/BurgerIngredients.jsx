import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientsInfo} from '../../utils/data.js'
import './title/title.css'
import './burger-ingredients.css'
import './tabs/tabs.css'
import './card/card.css'
import './ingredients/ingredients.css'

export const BurgerIngredients = () => {
  return <section className="burger-ingredients">
    <p className="text text_type_main-large title">Соберите бургер</p>
    <Tabs />
    <div className="ingredients">
      <p id='bun' className="text text_type_main-medium">Булки</p>
      <div style={{display: 'flex', marginLeft: '4px'}}>
        <FindCard array={ingredientsInfo} find='bun'/>
      </div>
      <p id='sauce' className="text text_type_main-medium" style={{margin: "16px auto 24px"}}>Соусы</p>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <FindCard array={ingredientsInfo} find='sauce'/>
      </div>
      <p id='other' className="text text_type_main-medium" style={{margin: "16px auto 24px"}}>Начинки</p>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <FindCard array={ingredientsInfo} find='main'/>
      </div>
    </div>
  </section>
}

const Card = ({img, price, text}) => {
  return <div className="card">
    <img src={img} alt="булка" />
    <div style={{display: 'flex', margin: '4px auto', width: '64px', justifyContent: 'space-between'}}>
      <p style={{marginRight: '9px'}} className="text text_type_digits-default">{price}</p>
      <img src={require("./../../images/Subtract.svg").default} alt="иконка денег" />
    </div>  
    <p className="text text_type_main-default" style={{textAlign: 'center'}}>{text}</p>
  </div>
}

const Tabs = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div className='tabs'>
      <a href='#bun'><Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab></a>
      <a href='#sauce'><Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab></a>
      <a href='#other'><Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab></a>
    </div>
  )
}

const FindCard = ({array, find}) => {
  const correct = []
  array.map(item => {
    if (item.type === find) {
      correct.push(item)
    }
  })
  return correct.map(item => (<Card key={item._id} img={item.image} price={item.price} text={item.name}/>))
}