import React, { FC } from "react"
import { EditProfile } from "../components/EditProfile/EditProfile"
import { NavigationProfile } from "../components/NavigationProfile/NavigationProfile"

export const Profile: FC = () => {
  return (
    <>
      <NavigationProfile />
      <EditProfile />
    </>
  )
}