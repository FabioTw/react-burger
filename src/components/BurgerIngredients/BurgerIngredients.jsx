import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "../Tabs/Tabs";
import { CardList } from "../CardList/CardList";
import burgerIngredients from "./burger-ingredients.module.css";
import { ingredientsPropType } from "../../utils/propTypes";

export const BurgerIngredients = ({ingredientsInfo, updateBun, updateIngredients, showIngredientDetailsModal}) => {
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
          <CardList array={ingredientsInfo} updateIngredient={updateBun} finding="bun" showIngredientDetailsModal={showIngredientDetailsModal} />
        </div>
        <p id="sauce" className="text text_type_main-medium mt-4 mb-6">
          Соусы
        </p>
        <div className={burgerIngredients["ingredients-block"]}>
          <CardList array={ingredientsInfo} updateIngredient={updateIngredients} finding="sauce" showIngredientDetailsModal={showIngredientDetailsModal} />
        </div>
        <p id="other" className="text text_type_main-medium mt-4 mb-6">
          Начинки
        </p>
        <div className={burgerIngredients["ingredients-block"]}>
          <CardList array={ingredientsInfo} updateIngredient={updateIngredients} finding="main" showIngredientDetailsModal={showIngredientDetailsModal}/>
        </div>
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
