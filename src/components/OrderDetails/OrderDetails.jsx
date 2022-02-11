
import PropTypes from "prop-types";
import { Modal } from "../Modal/Modal";
import orderDetails from './order-details.module.css'

export const OrderDetails = ({updateOrderOverlay}) => {
  const rnd = Math.floor(Math.random() * 1000000);

  return (
    <Modal toggleModal={updateOrderOverlay}>
      <p className={`${orderDetails['order-digits']} text text_type_digits-large mt-4 mb-8`}>{rnd}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img
          className={`${orderDetails['done-button']} mb-15`}
          src={require("./../../images/done.svg").default}
          alt="галочка"
          onClick={updateOrderOverlay}
        />
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className={`${orderDetails['text-dark']} text text_type_main-default mb-30`}>Дождитесь готовности на орбитальной станции</p>
    </Modal>
  )
}

OrderDetails.propTypes = {
  updateOrderOverlay: PropTypes.func.isRequired
};
