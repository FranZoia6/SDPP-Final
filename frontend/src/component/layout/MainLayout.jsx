import React from "react";
import LeftSide from "./LeftSide";
import LogoutButton from "../login/LogoutButton";

const MainLayout = () => {
  return (
    <div className="mainLayout">
      <LogoutButton />
      <LeftSide />
    </div>
  );
};

export default MainLayout;
