import PropTypes from "prop-types";
import { Card } from "../Card/Card";
import { ingredientsPropType } from "../../utils/propTypes";
import cardList from "./card-list.module.css" 

export const CardList = ({ data, updateIngredient, showIngredientDetailsModal }) => {
  return  (
    <>
      <p id={data.array.length>0 ? data.array[0].type : null} className="text text_type_main-medium mb-6"> 
        {data.name}
      </p>
      <div className={`${cardList["card-block"]} mb-4`}>
        {data.array.map((item) => (
          <Card 
            key={item._id} 
            id={item._id} 
            img={item.image} 
            price={item.price} 
            text={item.name} 
            updateIngredient={updateIngredient} 
            onClick={()=> showIngredientDetailsModal(item)} 
          />
        ))}
      </div>
    </>
  )
};

CardList.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    array: ingredientsPropType
  }).isRequired,
  updateIngredient: PropTypes.func.isRequired,
  showIngredientDetailsModal: PropTypes.func.isRequired
}
