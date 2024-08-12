import React from "react";
import { createChatRoom } from "./action";

const Chat = () => {


  return (
    <div className="h-screen">
      <form action={createChatRoom} className="">
        {/* Floating Button */}
        <button className="h-20 w-20 rounded-full bg-amber-500 font-bold text-white">
          대화하기
        </button>
      </form>
    </div>
  );
};

export default Chat;
