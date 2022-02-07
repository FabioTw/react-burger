import React from "react";
import { Modal } from "../Modal/Modal";
import ingredientDetails from './ingredient-details.module.css'


export const IngredientDetails = ({updateIngredientOverlay, name, image, proteins, fat, carbohydrates, calories}) => {
  return (
    <Modal toggleModal={updateIngredientOverlay} title={'Детали ингредиента'}>
        <img
          className={`${ingredientDetails.photo} mb-4`}
          src={image}
          alt="фото ингредиента"
        />
      <p className="text text_type_main-medium mb-8">{name}</p>
      <div className={`${ingredientDetails['ingredient-stats']}`}>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Калории,ккал</p>
          <p className="text text_type_main-default mb-8">{calories}</p>
        </div>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Белки, г</p>
          <p className="text text_type_main-default mb-8">{proteins}</p>
        </div>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Жиры, г</p>
          <p className="text text_type_main-default mb-8">{fat}</p>
        </div>
        <div>
          <p className="text text_type_main-default mb-2">Углеводы, г</p>
          <p className="text text_type_main-default mb-8">{carbohydrates}</p>
        </div>
      </div>
    </Modal>
  )
}