import React from "react";
import SideNavigation from "./_components/sideNavigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideNavigation />
      <div className="w-full justify-center">
        <div className="max-w-screen-xl p-4">{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
