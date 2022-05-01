import PropTypes from "prop-types";
import { Modal } from "../Modal/Modal";
import ingredientDetails from './ingredient-details.module.css'
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams} from "react-router-dom";
import { CLOSE_INGREDIENT } from "../../services/actions/ingredient";

export const IngredientDetails = () => {
  const { selectedIngredient } = useSelector(state => state.ingredient);
  const { standartIngredients } = useSelector(state => state.ingredients);
  const dispatch = useDispatch(); 
  let history = useHistory();
  let { id } = useParams();
  const selected = []
  standartIngredients.forEach((item) => {
    if (item._id === id) {
      selected.push(item)
    }
  })

  const back = e => {
    e.stopPropagation();
    dispatch({type: CLOSE_INGREDIENT})
    history.goBack();
  };

  if (!selected[0]) return null;

  return (
    <Modal toggleModal={back} title={'Детали ингредиента'}>
        <img
          className={`${ingredientDetails.photo} mb-4`}
          src={selected[0].image}
          alt="фото ингредиента"
        />
      <p className="text text_type_main-medium mb-8">{selected[0].name}</p>
      <div className={`${ingredientDetails['ingredient-stats']}`}>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Калории,ккал</p>
          <p className="text text_type_main-default mb-8">{selected[0].calories}</p>
        </div>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Белки, г</p>
          <p className="text text_type_main-default mb-8">{selected[0].proteins}</p>
        </div>
        <div className="mr-5">
          <p className="text text_type_main-default mb-2">Жиры, г</p>
          <p className="text text_type_main-default mb-8">{selected[0].fat}</p>
        </div>
        <div>
          <p className="text text_type_main-default mb-2">Углеводы, г</p>
          <p className="text text_type_main-default mb-8">{selected[0].carbohydrates}</p>
        </div>
      </div>
    </Modal>
  )
}
