
import PropTypes from "prop-types";
import { Card } from "../Card/Card";
import { ingredientsPropType } from "../../utils/propTypes";
import cardList from "./card-list.module.css" 

export const CardList = ({ data, updateIngredient, showIngredientDetailsModal }) => {
  return  (
    <>
      {
        data==='Булки' ? <p id="bun" className="text text_type_main-medium"> 
          {data.name}
        </p>
        : data==='Соусы' ? <p id="sause" className="text text_type_main-medium mt-4 mb-6">
          {data.name}
        </p>
        : <p id="main" className="text text_type_main-medium mt-4 mb-6">
          {data.name}
        </p>
      }
      <div className={cardList["card-block"]}>
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
    type: PropTypes.string,
    array: ingredientsPropType
  }).isRequired,
  updateIngredient: PropTypes.func.isRequired,
  showIngredientDetailsModal: PropTypes.func.isRequired
}
