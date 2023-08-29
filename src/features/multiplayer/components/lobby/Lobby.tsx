"use client";

import { Card, Code, Heading, Input } from "@/components/ui";
import useUserClient from "@/hooks/useUserClient";
import { DatabaseClient } from "@/lib/database/databaseClient";
import { useState } from "react";

interface Props {
  id: string;
}

interface ChatMessage {
  user: {
    id: string;
  };
  message: string;
  date: Date;
}

const Lobby = ({ id }: Props) => {
  const { avatar, username, isLogged, auth } = useUserClient();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatChannelId = `${id}_messages`;

  const insertMessage = (newMessage: ChatMessage) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  const database = new DatabaseClient({ type: "clientComponent" });
  const chatChannel = database.instance.channel(chatChannelId);

  chatChannel
    .on("broadcast", { event: "chat" }, (event) => {
      const payload = event.payload as ChatMessage;
      insertMessage(payload);
    })
    .subscribe();

  return (
    <Card>
      <Heading>{isLogged && username && `Hello ${username}`}</Heading>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const form = new FormData(e.currentTarget);
          const message = form.get("message");
          e.currentTarget.reset();

          if (!message || typeof message !== "string" || message === "") return;

          insertMessage({
            date: new Date(),
            message,
            user: { id: auth!.id },
          });

          await chatChannel.send({
            type: "broadcast",
            event: "chat",
            payload: {
              message,
              date: new Date(),
              user: { id: auth!.id },
            } satisfies ChatMessage,
          });
        }}
      >
        <Input label="message" />
      </form>
      {messages.map(async ({ date, message, user }, index) => {
        const { data: messageUser } = await database.users.getProfile(user.id);

        return (
          <Code className="flex flex-col" key={index + "message"}>
            <div className="flex justify-between text-xs">
              <p>{messageUser?.username}</p>
              <p>{date.getTime()}</p>
            </div>
            {message}
          </Code>
        );
      })}
    </Card>
  );
};

export default Lobby;
