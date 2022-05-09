import { FC } from "react";
import { useSelector } from "../../services/hooks/hooks";
import { TWSOrder } from "../../types/types";
import { OrderBlock } from "../OrderBlock/OrderBlock";
import styles from './orders-profile.module.css'

interface IOrdersProfile { 
  toggleFeedOverlay: () => void;
}

export const OrdersProfile: FC<IOrdersProfile> = ({toggleFeedOverlay}) => {
  const { standartIngredients,} = useSelector(state => state.ingredients);
  const {orders, wsPrivateConnected} = useSelector(state => state.ws);
  let status = true
  const sortedOrders: TWSOrder[] = []
  if (orders.length === undefined)  {
    return null
  }

  for (let index = orders.length-1; index >= 0; index--) {
    let element = orders[index]
    sortedOrders.push(element)
 }
  if (standartIngredients[0] !== undefined) {
    return (
      <div className={`${styles.orders}`}>
        {sortedOrders.map((element)=> {
          return ( <OrderBlock 
          key={element._id} 
          element={element} 
          toggleFeedOverlay={toggleFeedOverlay} 
          pathname={`/profile/orders/${element._id}`}
          width={'856px'}
          height={'246px'}
          status={status}
        /> )
        })}
      </div>
    )
  }
  return null
}

