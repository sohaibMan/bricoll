
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";

interface ChatProps {
  sender: string;
}

interface Chat {
  sender: string;
  message: string;
}

const Chat = ({ sender }: ChatProps): JSX.Element => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY as string, {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");

    channel.bind("chat-event", function (data: Chat) {
      setChats((prevState) => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("/api/pusher", { message: messageToSend, sender });
  };

  return (
    <>
      <p>Hello, {sender}</p>
      <div>
        {chats.map((chat, id) => (
          <div key={id}>
            <p>{chat.message}</p>
            <small>{chat.sender}</small>
          </div>
        ))}
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="start typing...."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Chat;

