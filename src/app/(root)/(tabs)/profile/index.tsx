import React from "react";
import PfpProvider from "./hooks/PfpProvider";
import ProfileScreenProvider from "./hooks/ProfileScreenProvider";
import MainScreen from "./mainScreen";

const Profile = () => {
  return (
    <ProfileScreenProvider>
      <PfpProvider>
        <MainScreen />
      </PfpProvider>
    </ProfileScreenProvider>
  );
};

export default Profile;
