import React from "react";
import SideNavigation from "./_components/sideNavigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SideNavigation />
      <div className="max-w-screen-xl mx-auto">
      {children}  
      </div>
    </div>
  );
};

export default HomeLayout;
