import styles from './ingredient.module.css'
import { useSelector } from '../../services/hooks/hooks';
import { useParams} from "react-router-dom";
import { TIngredients} from "../../types/types";

export const Ingredient = () => {
  const {standartIngredients} = useSelector(state => state.ingredients);
  let { id } = useParams<{id?: string}>();
  const selected: TIngredients[] = []
  standartIngredients.forEach(item => {
    if (item._id === id) {
      selected.push(item)
    }
  })
  
  if (!selected[0]) return null;
  return (
    <div className={`${styles.info} mt-30`}>
        <img
          className={`${styles.photo} mb-4`}
          src={selected[0].image}
          alt="фото ингредиента"
        />
      <p className="text text_type_main-medium mb-8">{selected[0].name}</p>
      <div className={`${styles['ingredient-stats']}`}>
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
    </div>
  )
}
