import React from "react";
import PropTypes from "prop-types";
import { DragIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.css";

export const BurgerConstructor = ({ingredientsInfo, bun, ingridients, onRemoveItem, updateOrderOverlay, updateIngredientOverlay, updateIngredientItem}) => {
  return (
    <section className={burgerConstructor["burger-constructor"]}>
      <div className={`${burgerConstructor["burger-list"]} mt-25 mr-4 mb-10 ml-4`}>
        <ElementCreator
          array={ingredientsInfo}
          _id={bun}
          isTop={true}
          updateIngredientOverlay={updateIngredientOverlay}
          updateIngredientItem={updateIngredientItem}
        />
        <div className={burgerConstructor["ingredients-list"]}>
          {ingridients.map((item, index) => (
            <ElementCreator
            key={`id_${item}-${index}}`}
            array={ingredientsInfo}
            _id={item}
            deleteThis={onRemoveItem}
            updateIngredientOverlay={updateIngredientOverlay}
            updateIngredientItem={updateIngredientItem}
          />
          ))}
        </div>
        <ElementCreator
          array={ingredientsInfo}
          _id={bun}
          isTop={false}
          updateIngredientOverlay={updateIngredientOverlay}
          updateIngredientItem={updateIngredientItem}
        />
      </div>
      <div className={burgerConstructor["buy-info"]}>
        <p className={`text text_type_digits-medium mr-2`}>{priceCalc(ingridients, ingredientsInfo, bun)}</p>
        <img
          className="mr-10"
          src={require("./../../images/Subtract.svg").default}
          alt="иконка денег"
        />
        <Button type="primary" size="medium" onClick={updateOrderOverlay}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

const ElementCreator = ({ array, _id, isTop, deleteThis, updateIngredientOverlay, updateIngredientItem }) => {
  const correct = [];
  array.map((item) => {
    if (item._id === _id) {
      correct.push(item);
    }
  });
  return correct.map((item) => {
    if (item.type === "bun") {
      return (
        <div key={item._id} onClick={()=> selectIngridient({item, updateIngredientOverlay, updateIngredientItem})}>
          <ConstructorElement
            type={isTop ? 'top' : 'bottom'}
            isLocked={true}
            text={isTop ? `${item.name} (верх)`: `${item.name} (низ)`}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
      );
    } else {
      return  (
        <div key={item._id} className={`${burgerConstructor.filling} mb-2 mt-2`}>
          <div onClick={()=> selectIngridient({item, updateIngredientOverlay, updateIngredientItem})}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => deleteThis(item._id)}
            />
          </div>
        </div>
      );
    }
  });
};

const selectIngridient = ({item, updateIngredientOverlay, updateIngredientItem}) => {
  updateIngredientOverlay()
  updateIngredientItem({item})
}

const priceCalc = (order, array, bun) => {
  let price = 0;
  array.map((item) => {
    if (item._id === bun) {
      price += item.price
    }
    order.map((id) => {
      if (item._id === id) {
        price += item.price
      } 
    })
  })
  return price
}

BurgerConstructor.propTypes = {
  ingredientsInfo:PropTypes.array.isRequired, 
  bun:PropTypes.string.isRequired, 
  ingridients:PropTypes.array.isRequired, 
  onRemoveItem:PropTypes.func.isRequired,
  updateOrderOverlay:PropTypes.func.isRequired, 
  updateIngredientOverlay:PropTypes.func.isRequired, 
  updateIngredientItem:PropTypes.func.isRequired
};

ElementCreator.propTypes = {
  array: PropTypes.array.isRequired,
  _id: PropTypes.any.isRequired,
  isTop: PropTypes.bool,
  deleteThis: PropTypes.func,
  updateIngredientOverlay: PropTypes.func.isRequired,
  updateIngredientItem: PropTypes.func.isRequired,
};


