import React from "react";
import SideNavigation from "./_components/sideNavigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SideNavigation />
      {children}
    </div>
  );
};

export default HomeLayout;
