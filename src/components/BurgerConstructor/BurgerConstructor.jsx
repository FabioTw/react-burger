import React from "react";
import PropTypes from "prop-types";
import { DragIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsInfo } from "../../utils/data.js";
import burgerConstructor from "./burger-constructor.module.css";
import {selectedBun, orderList} from '../../utils/order.js'

export const BurgerConstructor = () => {
  return (
    <section className={burgerConstructor["burger-constructor"]}>
      <div className={`${burgerConstructor["burger-list"]} mt-25 mr-4 mb-10 ml-4`}>
        <ElementCreator
          array={ingredientsInfo}
          _id={selectedBun}
          isTop={true}
        />
        <div className={burgerConstructor["ingredients-list"]}>
          {orderList.map((item, index) => (
            <ElementCreator
            key={`id_${item}-${index}}`}
            array={ingredientsInfo}
            _id={item}
          />
          ))}
        </div>
        <ElementCreator
          array={ingredientsInfo}
          _id={selectedBun}
          isTop={false}
        />
      </div>
      <div className={burgerConstructor["buy-info"]}>
        <p className={`text text_type_digits-medium mr-2`}>???</p>
        <img
          className="mr-10"
          src={require("./../../images/Subtract.svg").default}
          alt="иконка денег"
        />
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

const ElementCreator = ({ array, _id, isTop }) => {
  const correct = [];
  array.map((item) => {
    if (item._id === _id) {
      correct.push(item);
    }
  });
  return correct.map((item) => {
    if (item.type === "bun") {
      return (
        <ConstructorElement
          key={item._id}
          type={isTop ? 'top' : 'bottom'}
          isLocked={true}
          text={isTop ? `${item.name} (верх)`: `${item.name} (низ)`}
          price={item.price}
          thumbnail={item.image}
        />
      );
    } else {
      return (
        <div key={item._id} className={`${burgerConstructor.filling} mb-2`}>
          <div>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        </div>
      );
    }
  });
};

ElementCreator.propTypes = {
  array: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired,
  isTop: PropTypes.bool,
};
