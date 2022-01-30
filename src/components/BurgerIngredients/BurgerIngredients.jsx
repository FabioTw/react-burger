import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsInfo } from "../../utils/data.js";
import burgerIngredients from "./burger-ingredients.module.css";

export const BurgerIngredients = () => {
  return (
    <section className={`${burgerIngredients["burger-ingredients"]} mr-10`}>
      <p className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </p>
      <Tabs />
      <div className={burgerIngredients.ingredients}>
        <p id="bun" className="text text_type_main-medium">
          Булки
        </p>
        <div className={burgerIngredients["ingredients-block"]}>
          <CardFinder array={ingredientsInfo} find="bun" />
        </div>
        <p id="sauce" className="text text_type_main-medium mt-4 mb-6">
          Соусы
        </p>
        <div className={burgerIngredients["ingredients-block"]}>
          <CardFinder array={ingredientsInfo} find="sauce" />
        </div>
        <p id="other" className="text text_type_main-medium mt-4 mb-6">
          Начинки
        </p>
        <div className={burgerIngredients["ingredients-block"]}>
          <CardFinder array={ingredientsInfo} find="main" />
        </div>
      </div>
    </section>
  );
};

const Card = ({ img, price, text }) => {
  return (
    <div className={`${burgerIngredients.card} mt-6 mb-6 ml-3 mr-3`}>
      <img src={img} alt="булка" />
      <div className={`${burgerIngredients["card-info"]} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <img
          src={require("./../../images/Subtract.svg").default}
          alt="иконка денег"
        />
      </div>
      <p className={`${burgerIngredients["card-name"]} text text_type_main-default`}>{text}</p>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={`${burgerIngredients.tabs} mb-10`}>
      <a href="#bun">
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a href="#sauce">
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a href="#other">
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </a>
    </div>
  );
};

const CardFinder = ({ array, find }) => {
  const correct = [];
  array.map((item) => {
    if (item.type === find) {
      correct.push(item);
    }
  });
  return correct.map((item) => (
    <Card key={item._id} img={item.image} price={item.price} text={item.name} />
  ));
};
