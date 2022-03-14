import React from "react";
import PropTypes from "prop-types";
import { Button, CurrencyIcon   } from "@ya.praktikum/react-developer-burger-ui-components";
import { ElementCreator } from '../ElementCreator/ElementCreator'
import burgerConstructor from "./burger-constructor.module.css";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid'

export const BurgerConstructor = ({updateBun, onRemoveItem, updateIngredients, updateOrderOverlay, moveIngredients}) => {
  const { standartIngredients , constructorIngredients, selectedBun, constructorKeys } = useSelector(state => state.ingredients);

  const [, dropTarget] = useDrop({
    accept: ["main",'sauce', 'bun'],
    drop(itemId) {
      if (itemId.type === 'bun') { 
        updateBun(itemId.id)
      } else {
        updateIngredients(itemId)
      }
    },
  });
  
  const moveCard = (dragIndex, hoverIndex) => {
    const dragItem = constructorIngredients[dragIndex]
    if (typeof(dragItem) === 'object') {
      const coppiedStateArray = constructorIngredients;
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0])
      moveIngredients(coppiedStateArray)
    }
  }
  return (
    <section className={burgerConstructor["burger-constructor"]} ref={dropTarget}>
      <div className={`${burgerConstructor["burger-list"]} mt-25 mr-4 mb-10 ml-4`}>
        <ElementCreator
          array={standartIngredients}
          _id={selectedBun}
          isTop={true}
        />
        <div className={burgerConstructor["ingredients-list"]}>
          {constructorIngredients.map((item, index) => (
            <ElementCreator
            key={item.uuid}
            array={standartIngredients}
            _id={item.id}
            onRemoveItem={onRemoveItem}
            index={index}
            moveCard={moveCard}
          />
          ))}
        </div>
        <ElementCreator
          array={standartIngredients}
          _id={selectedBun}
          isTop={false}
        />
      </div>
      <div className={`${burgerConstructor["buy-info"]}`}>
        <div className={`${burgerConstructor["buy-info"]} mr-10`}>
          <p className={`text text_type_digits-medium mr-2`}>{priceCalc(constructorIngredients, standartIngredients, selectedBun)}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={updateOrderOverlay}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

const priceCalc = (ingredientsWithoutBun, array, bun) => {
  let price = 0;
  array.forEach((item) => {
    if (item._id === bun) {
      price += item.price * 2
    }
    ingredientsWithoutBun.forEach((id) => {
      if (item._id === id) {
        price += item.price
      } 
    })
  })
  return price
}

BurgerConstructor.propTypes = {
  updateBun: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  updateOrderOverlay: PropTypes.func.isRequired, 
  updateIngredients: PropTypes.func.isRequired, 
  moveIngredients: PropTypes.func.isRequired,
};


