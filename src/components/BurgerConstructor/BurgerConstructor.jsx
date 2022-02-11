import React from "react";
import PropTypes from "prop-types";
import { Button, CurrencyIcon   } from "@ya.praktikum/react-developer-burger-ui-components";
import { ElementCreator } from '../ElementCreator/ElementCreator'
import burgerConstructor from "./burger-constructor.module.css";
import { ingredientsPropType } from "../../utils/propTypes";

export const BurgerConstructor = ({ingredientsInfo, bun, ingredients, onRemoveItem, updateOrderOverlay,}) => {
  return (
    <section className={burgerConstructor["burger-constructor"]}>
      <div className={`${burgerConstructor["burger-list"]} mt-25 mr-4 mb-10 ml-4`}>
        <ElementCreator
          array={ingredientsInfo}
          _id={bun}
          isTop={true}
        />
        <div className={burgerConstructor["ingredients-list"]}>
          {ingredients.map((item, index) => (
            <ElementCreator
            key={`id_${item}-${index}}`}
            array={ingredientsInfo}
            _id={typeof(item) !== 'object'? item: ''}
            onRemoveItem={onRemoveItem}
          />
          ))}
        </div>
        <ElementCreator
          array={ingredientsInfo}
          _id={bun}
          isTop={false}
        />
      </div>
      <div className={`${burgerConstructor["buy-info"]}`}>
        <div className={`${burgerConstructor["buy-info"]} mr-10`}>
          <p className={`text text_type_digits-medium mr-2`}>{priceCalc(ingredients, ingredientsInfo, bun)}</p>
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
  ingredientsInfo: ingredientsPropType, 
  bun: PropTypes.string, 
  ingredients: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string ])), 
  onRemoveItem: PropTypes.func.isRequired,
  updateOrderOverlay: PropTypes.func.isRequired, 
};



