"use client";

import { initialMessages } from "@/app/(content)/chats/[id]/page";
import { cls } from "@/libs/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { saveChatMessages } from "@/app/(content)/chats/action";

const SUPABASE_URL = "https://qtxacjywgtbrwupngvuh.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

type ChatMessagesProps = {
  initialMessages: initialMessages;
  userId: number;
  username: string;
  chatRoomId: string;
};

const ChatMessages = ({
  userId,
  chatRoomId,
  username,
  initialMessages,
}: ChatMessagesProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");

  const channelA = useRef<RealtimeChannel>();
  useEffect(() => {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    channelA.current = supabaseClient.channel(`room-${chatRoomId}`);
    channelA.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prev) => [...prev, payload.payload]);
      })
      .subscribe();

    return () => {
      channelA.current?.unsubscribe();
    };
  }, [chatRoomId]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(message);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        payload: message,
        userId,
        chatRoomId: "",
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          id: userId,
          username: "",
        },
      },
    ]);
    channelA.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          id: userId,
          username,
        },
      },
    });
    saveChatMessages(message, chatRoomId, userId)
    setMessage("");
  };

  return (
    <div>
      <ul className="flex flex-col gap-y-2">
        {userId === 1 && <div>{messages[0]?.user?.username}님과의 대화</div>}
        {messages.map((message) => (
          <li
            key={message.id}
            className={cls(
              message.userId === userId ? "justify-end" : "justify-start",
              "flex w-1/2 items-center gap-x-2",
            )}
          >
            {message.userId === userId ? (
              ""
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-500" />
            )}
            <span className="rounded-md border-2 border-amber-500 p-2">
              {message.payload}
            </span>
          </li>
        ))}
      </ul>

      <div className="w-1/2 pt-20">
        <form onSubmit={onSubmit} className="flex">
          <input
            onChange={onChange}
            className="w-full border-2 p-2"
            type="text"
            value={message}
          />
          <button className="w-20 border-2 p-2">입력</button>
        </form>
      </div>
    </div>
  );
};

export default ChatMessages;
