import PropTypes from "prop-types";
 export const ingredientsPropType = PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    price: PropTypes.number,
    __v: PropTypes.number,
  })).isRequired;
