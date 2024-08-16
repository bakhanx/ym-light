import React from "react";

const ChatLayout = ({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return <div>{children}</div>;
};

export default ChatLayout;
