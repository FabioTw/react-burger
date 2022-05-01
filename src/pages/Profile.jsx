import React from "react"
import { EditProfile } from "../components/EditProfile/EditProfile"
import { NavigationProfile } from "../components/NavigationProfile/NavigationProfile"

export const Profile = () => {
  return (
    <>
      <NavigationProfile />
      <EditProfile />
    </>
  )
}