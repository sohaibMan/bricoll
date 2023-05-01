import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import { useSession } from 'next-auth/react';

interface Message {
  id: number;
  senderUserId: number;
  receiverUserId: number;
  text: string;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  receiverUser: User;
}

const Chat: React.FC<Props> = ({ receiverUser }) => {
  const {data: session} = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
      authEndpoint: '/api/pusher/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    });

    const channel = pusher.subscribe(`private-chat-${session?.user.id}-${receiverUser.id}`);

    channel.bind('new-message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      pusher.unsubscribe(`private-chat-${session?.user.id}-${receiverUser.id}`);
      pusher.disconnect();
    };
  }, [receiverUser.id, session?.user.accessToken, session?.user.id]);

  const handleNewMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newMessage) {
      return;
    }

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        senderUserId: session?.user.id,
        receiverUserId: receiverUser.id,
        text: newMessage,
      }),
    });

    if (response.ok) {
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat with {receiverUser.name}</h2>

      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <span>{message.senderUserId === session?.user.id ? 'You' : receiverUser.name}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleNewMessage}>
        <input type="text" value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
