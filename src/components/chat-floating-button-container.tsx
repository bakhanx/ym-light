import getSession from "@/libs/session";
import React, { useEffect } from "react";
import ChatFloatingButton from "./chat-floating-button";

const ChatFloatingButtonContainer = async () => {
  const session = await getSession();
  return (
    <>
      <ChatFloatingButton sessionId={session.id} />
    </>
  );
};

export default ChatFloatingButtonContainer;
