import Layout from "./components/layout";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import beamsClient from "../lib/beams";

interface Message {
  senderUserId: string;
  receiverUserId: string;
  text: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Chat() {
  const { status: loading, data: session } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const receiverUser: User = {
    id: "643eb75439eae20fa6adb475",
    name: "anas zn",
    email: "anas.zn@example.com",
  };

  useEffect(() => {
    // beamsClient
    //   .start()
    //   .then((beamsClient) => beamsClient.getDeviceId())
    //   .then((deviceId) =>
    //     console.log("Successfully registered with Beams. Device ID:", deviceId)
    //   )
    //   .catch(console.error);

    if (!session) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: "/api/pusher/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      },
    });

    const channel = pusher.subscribe(`private-chat-1`);

    console.log(`private-chat-1`);

    channel.bind("new-message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      pusher.unsubscribe(`private-chat-1`);
      pusher.disconnect();
    };
  }, [receiverUser?.id, session?.user?.accessToken, session?.user?.id]);

  const handleNewMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newMessage) {
      return;
    }

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        senderUserId: session?.user.id,
        receiverUserId: receiverUser?.id,
        text: newMessage,
      }),
    });

    // console.log("response: ", response);

    if (response.ok) {
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div>
        <h2>Chat with {receiverUser.name}</h2>

        <div>
          {messages.map((message, i) => (
            <div key={i}>
              <span>
                {message.senderUserId === session?.user.id.toString()
                  ? "You "
                  : receiverUser.name}
              </span>
              <span>{message.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleNewMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </Layout>
  );
}
