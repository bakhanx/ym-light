import React from "react";
import ChatFloatingButton from "./chat-floating-button";
import getSession from "@/utils/session";

const ChatFloatingButtonContainer = async () => {
  const session = await getSession();
  return (
    <>
      <ChatFloatingButton sessionId={session.id} />
    </>
  );
};

export default ChatFloatingButtonContainer;
