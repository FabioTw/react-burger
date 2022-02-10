
import PropTypes from "prop-types";
import { Card } from "../Card/Card";
import { ingredientsPropType } from "../../utils/propTypes";

export const CardList = ({ array, finding, updateIngredient, showIngredientDetailsModal }) => {
  const correct = [];
  array.forEach((item) => {
    if (item.type === finding) {
      correct.push(item);
    }
  });
  return correct.map((item) => (
    <Card key={item._id} id={item._id} img={item.image} price={item.price} text={item.name} updateIngredient={updateIngredient} onClick={()=> showIngredientDetailsModal(item)} />
  ));
};

CardList.propTypes = {
  array: ingredientsPropType,
  finding: PropTypes.string.isRequired,
  updateIngredient: PropTypes.func.isRequired,
  showIngredientDetailsModal: PropTypes.func.isRequired
}
