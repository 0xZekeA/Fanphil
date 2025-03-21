import React from "react";
import MainScreen from "./mainScreen";
import PfpProvider from "./providers/PfpProvider";
import ProfileScreenProvider from "./providers/ProfileScreenProvider";

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
