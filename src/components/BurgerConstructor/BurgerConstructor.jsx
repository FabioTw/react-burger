import React from "react";
import PropTypes from "prop-types";
import { Button, CurrencyIcon   } from "@ya.praktikum/react-developer-burger-ui-components";
import { ElementCreator } from '../ElementCreator/ElementCreator'
import burgerConstructor from "./burger-constructor.module.css";
import { useSelector } from "react-redux";

export const BurgerConstructor = ({ onRemoveItem, updateOrderOverlay,}) => {
  const { standartIngredients , constructorIngredients, selectedBun } = useSelector(state => state.ingredients);

  return (
    <section className={burgerConstructor["burger-constructor"]}>
      <div className={`${burgerConstructor["burger-list"]} mt-25 mr-4 mb-10 ml-4`}>
        <ElementCreator
          array={standartIngredients}
          _id={selectedBun}
          isTop={true}
        />
        <div className={burgerConstructor["ingredients-list"]}>
          {constructorIngredients.map((item, index) => (
            <ElementCreator
            key={`id_${item}-${index}}`}
            array={standartIngredients}
            _id={item}
            onRemoveItem={onRemoveItem}
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
  onRemoveItem: PropTypes.func.isRequired,
  updateOrderOverlay: PropTypes.func.isRequired, 
};



