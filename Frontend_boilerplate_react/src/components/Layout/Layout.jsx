import React from "react";
import TabBar from "../TabBar/TabBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen pb-20">
      {children}
      <TabBar />
    </div>
  );
};

export default Layout; 