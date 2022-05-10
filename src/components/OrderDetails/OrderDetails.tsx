import { Modal } from "../Modal/Modal";
import orderDetails from './order-details.module.css'
import { useSelector } from "../../services/hooks/hooks";
import { FC } from "react";

interface IOrderDetails { 
  updateOrderOverlay: () => void;
}

export const OrderDetails: FC<IOrderDetails> = ({updateOrderOverlay}) => {
  const { orderNumber } = useSelector(state => state.order);

  return (
    <Modal toggleModal={updateOrderOverlay}>
      <p className={`${orderDetails['order-digits']} text text_type_digits-large mt-4 mb-8`}>{orderNumber}</p>
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
