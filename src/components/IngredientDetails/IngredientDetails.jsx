import PropTypes from "prop-types";
import { Modal } from "../Modal/Modal";
import ingredientDetails from './ingredient-details.module.css'
import { useSelector } from "react-redux";

export const IngredientDetails = ({updateIngredientOverlay}) => {
  const { selectedIngredient } = useSelector(state => state.ingredient);
  return (
    <Modal toggleModal={updateIngredientOverlay} title={'Детали ингредиента'}>
        <img
          className={`${ingredientDetails.photo} mb-4`}
          src={selectedIngredient.image}
          alt="фото ингредиента"
        />
      <p className="text text_type_main-medium mb-8">{selectedIngredient.name}</p>
      <div className={`${ingredientDetails['ingredient-stats']}`}>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Калории,ккал</p>
          <p className="text text_type_main-default mb-8">{selectedIngredient.calories}</p>
        </div>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Белки, г</p>
          <p className="text text_type_main-default mb-8">{selectedIngredient.proteins}</p>
        </div>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Жиры, г</p>
          <p className="text text_type_main-default mb-8">{selectedIngredient.fat}</p>
        </div>
        <div>
          <p className="text text_type_main-default mb-2">Углеводы, г</p>
          <p className="text text_type_main-default mb-8">{selectedIngredient.carbohydrates}</p>
        </div>
      </div>
    </Modal>
  )
}

IngredientDetails.propTypes = {
  updateIngredientOverlay: PropTypes.func.isRequired,
};
