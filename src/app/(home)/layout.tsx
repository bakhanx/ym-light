import TopNav from "@/components/top-navigation";
import React from "react";

const HomeLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div>
      <TopNav />
      {children}
      {modal}
    </div>
  );
};

export default HomeLayout;
