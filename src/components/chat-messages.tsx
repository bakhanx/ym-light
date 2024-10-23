"use client";

import { initialMessages } from "@/app/(content)/chats/[id]/page";
import { cls } from "@/libs/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { saveChatMessages } from "@/app/(content)/chats/action";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

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

  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ inline: "end" });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ inline: "end", behavior: "smooth" });
  }, [messages]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message === "") return;
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

    // scrollRef.current?.scrollIntoView({ inline: "end", behavior: "smooth" });

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
    saveChatMessages(message, chatRoomId, userId);
    setMessage("");
  };

  return (
    <div>
      <ul className="flex h-80 flex-col  overflow-y-scroll px-4 pb-4 pt-12">
        {messages.map((message) => (
          <li
            key={message.id}
            className={cls(
              message.userId === userId ? "justify-end" : "justify-start",
              "flex  items-center gap-x-2 py-1",
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
        <div className="inline" ref={scrollRef}></div>
      </ul>

      <div className="absolute w-96 -translate-x-1 rounded-md px-1 pt-2">
        <form onSubmit={onSubmit} className="flex shadow-md">
          <input
            onChange={onChange}
            className="w-full rounded-bl-md border-2 p-2  focus:border-amber-500 focus:outline-none focus:ring-amber-500"
            type="text"
            value={message}
          />
          <button className="flex w-20 items-center justify-center border-4 border-yellow-500 bg-yellow-500 p-2 font-bold text-white ">
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatMessages;
