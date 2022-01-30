import React from 'react';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientsInfo} from '../../utils/data.js'
import burgerConstructor from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  return <section className={burgerConstructor['burger-constructor']}>
    <div className={burgerConstructor['burger-list']}>
      <CreateElement array={ingredientsInfo} _id={'60666c42cc6b410027a1a9b1'}/>
      <div className={burgerConstructor['ingredients-list']}>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9b3'}/>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9b6'}/>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9b5'}/>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9bd'}/>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9be'}/>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9be'}/>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9be'}/>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9be'}/>
        <CreateElement array={ingredientsInfo} _id={'60666c42cc7b410027a1a9be'}/>
      </div>
      <CreateElement array={ingredientsInfo} _id={'60666c42cc7a410027a1a9b2'}/>
    </div>
    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
      <p style={{marginRight: '8px'}} className="text text_type_digits-medium">???</p>
      <img style={{marginRight: '40px'}} src={require("./../../images/Subtract.svg").default} alt="иконка денег" />
      <Button type="primary" size="medium">Оформить заказ</Button>
    </div>
  </section>
}

const CreateElement = ({array, _id}) => {
  const correct = []
  array.map(item => {
    if (item._id === _id) {
      correct.push(item)
    }
  })
  return correct.map(item => {if (item.type === 'top' || item.type === 'bottom') {
    return (<ConstructorElement
      key={item._id}
      type={item.type}
      isLocked={true}
      text={item.name}
      price={item.price}
      thumbnail={item.image}
    />)
  } else {
    return (<div key={item._id} style={{display:'flex', alignItems: 'center', marginBottom: '8px', }}><div><DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}/>
      </div>
    </div>
    )}
  })
}

CreateElement.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string
}