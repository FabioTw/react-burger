import React from "react"
import { EditProfile } from "../components/EditProfile/EditProfile"
import { NavigationProfile } from "../components/NavigationProfile/NavigationProfile"
import { OrdersProfile } from "../components/OrdersProfile/OrdersProfile"

export const ProfileOrders = () => {
  return (
    <>
      <NavigationProfile />
      <OrdersProfile />
    </>
  )
}