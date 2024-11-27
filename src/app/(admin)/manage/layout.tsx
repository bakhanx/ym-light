import React from "react";
import SideNavigation from "./_components/sideNavigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideNavigation />
      <div className="p-4 max-w-screen-xl">{children}</div>
    </div>
  );
};

export default HomeLayout;
