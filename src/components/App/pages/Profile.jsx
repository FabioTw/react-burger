import React from "react"
import { EditProfile } from "../../EditProfile/EditProfile"
import { NavigationProfile } from "../../NavigationProfile/NavigationProfile"

export const Profile = () => {
  return (
    <>
      <NavigationProfile />
      <EditProfile />
    </>
  )
}