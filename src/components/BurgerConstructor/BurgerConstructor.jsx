import React from "react";
import PropTypes from "prop-types";
import { DragIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.css";
import { IngredientDetails} from '../IngredientDetails/IngredientDetails';

export const BurgerConstructor = ({ingredientsInfo, bun, ingridients, onRemoveItem, updateOrderOverlay, updateIngredientOverlay, stateIngredientOverlay}) => {
  return (
    <section className={burgerConstructor["burger-constructor"]}>
      <div className={`${burgerConstructor["burger-list"]} mt-25 mr-4 mb-10 ml-4`}>
        <ElementCreator
          array={ingredientsInfo}
          _id={bun}
          isTop={true}
          updateIngredientOverlay={updateIngredientOverlay}
          stateIngredientOverlay={stateIngredientOverlay}
        />
        <div className={burgerConstructor["ingredients-list"]}>
          {ingridients.map((item, index) => (
            <ElementCreator
            key={`id_${item}-${index}}`}
            array={ingredientsInfo}
            _id={item}
            deleteThis={onRemoveItem}
            updateIngredientOverlay={updateIngredientOverlay}
            stateIngredientOverlay={stateIngredientOverlay}
          />
          ))}
        </div>
        <ElementCreator
          array={ingredientsInfo}
          _id={bun}
          isTop={false}
          updateIngredientOverlay={updateIngredientOverlay}
        />
      </div>
      <div className={burgerConstructor["buy-info"]}>
        <p className={`text text_type_digits-medium mr-2`}>???</p>
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

const ElementCreator = ({ array, _id, isTop, deleteThis, updateIngredientOverlay, stateIngredientOverlay }) => {
  const correct = [];
  array.map((item) => {
    if (item._id === _id) {
      correct.push(item);
    }
  });
  return correct.map((item) => {
    if (item.type === "bun") {
      return (
        <div key={item._id} onClick={updateIngredientOverlay}>
          <ConstructorElement
            type={isTop ? 'top' : 'bottom'}
            isLocked={true}
            text={isTop ? `${item.name} (верх)`: `${item.name} (низ)`}
            price={item.price}
            thumbnail={item.image}
          />
          {stateIngredientOverlay && <IngredientDetails 
            updateIngredientOverlay={updateIngredientOverlay} 
            name={item.name} 
            image={item.image}
            proteins={item.proteins}
            fat={item.fat}
            carbohydrates={item.carbohydrates}
            calories={item.calories}
          />}
        </div>
      );
    } else {
      return (
        <div key={item._id} className={`${burgerConstructor.filling} mb-2 mt-2`}>
          <div onClick={updateIngredientOverlay}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => deleteThis(item._id)}
            />
          {stateIngredientOverlay && <IngredientDetails 
            updateIngredientOverlay={updateIngredientOverlay} 
            name={item.name} 
            image={item.image}
            proteins={item.proteins}
            fat={item.fat}
            carbohydrates={item.carbohydrates}
            calories={item.calories}
            />}
          </div>
        </div>
      );
    }
  });
};

BurgerConstructor.propTypes = {
  ingredientsInfo:PropTypes.array, 
  bun:PropTypes.string, 
  ingridients:PropTypes.array, 
  onRemoveItem:PropTypes.func
};

ElementCreator.propTypes = {
  array: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired,
  isTop: PropTypes.bool,
  deleteThis: PropTypes.func,
};


