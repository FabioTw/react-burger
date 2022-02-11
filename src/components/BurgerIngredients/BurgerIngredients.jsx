import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "../Tabs/Tabs";
import { CardList } from "../CardList/CardList";
import burgerIngredients from "./burger-ingredients.module.css";
import { ingredientsPropType } from "../../utils/propTypes";

export const BurgerIngredients = ({ingredientsInfo, updateBun, updateIngredients, showIngredientDetailsModal}) => {
  const bun = {name:'Булки', type:'bun', array:[]}
  const sauce = {name:'Соусы', type:'sauce', array:[]}
  const main = {name:'Начинки', type:'main', array:[]}

  ingredientsInfo.forEach((item) => {
    if (item.type === bun.type) {
      bun.array.push(item);
    } else if (item.type === sauce.type) {
      sauce.array.push(item);
    } else if (item.type === main.type) {
      main.array.push(item);
    } 
  });

  return (
    <section className={`${burgerIngredients["burger-ingredients"]} mr-10`}>
      <p className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </p>
      <Tabs />
      <div className={burgerIngredients.ingredients}>
          <CardList data={bun} updateIngredient={updateBun} showIngredientDetailsModal={showIngredientDetailsModal} />
          <CardList data={sauce} updateIngredient={updateIngredients} showIngredientDetailsModal={showIngredientDetailsModal}  />
          <CardList data={main} updateIngredient={updateIngredients} showIngredientDetailsModal={showIngredientDetailsModal} />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredientsInfo: ingredientsPropType,
  updateBun: PropTypes.func.isRequired, 
  updateIngredients: PropTypes.func.isRequired,
  showIngredientDetailsModal: PropTypes.func.isRequired
}
