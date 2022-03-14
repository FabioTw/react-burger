import PropTypes from "prop-types";
import { Card } from "../Card/Card";
import { ingredientsPropType } from "../../utils/propTypes";
import cardList from "./card-list.module.css" 

export const CardList = ({ data, showIngredientDetailsModal }) => {
  return  (
    <>
      <div id={data.array.length>0 ? data.array[0].type : null} className="text text_type_main-medium mb-6">
        <p> 
          {data.name}
        </p>
        <div className={`${cardList["card-block"]} mb-4`}>
          {data.array.map((item) => {
            const result = []
            data.selected.forEach(element => {
              if (item._id === element) {result.push(element)}
            });
            return (
              <Card 
                key={item._id} 
                id={item._id} 
                img={item.image} 
                price={item.price} 
                text={item.name} 
                type={item.type}
                onClick={()=> showIngredientDetailsModal(item)}
                counterList={result} 
              />
            )
            })}
        </div>
      </div>
    </>
  )
};

CardList.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    array: ingredientsPropType
  }).isRequired,
  showIngredientDetailsModal: PropTypes.func.isRequired
}