
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { TextField, Button, Typography } from "@mui/material";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";

const ChatContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 400,
  margin: "0 auto",
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
});

const ChatMessagesContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  marginTop: "16px",
});

const Message = styled("div")(({ ownMessage }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  padding: "8px",
  borderRadius: "4px",
  animation: ownMessage ? "$pulse 1s infinite" : "none",
  justifyContent: ownMessage ? "flex-end" : "flex-start",
  backgroundColor: ownMessage ? "#1976d2" : "#ffffff",
  color: ownMessage ? "#ffffff" : "#000000",
  alignSelf: ownMessage ? "flex-end" : "flex-start",
}));

Message.keyframes = {
  "@keyframes pulse": {
    "0%": {
      opacity: 0.5,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0.5,
    },
  },
};

const ChatComponent = ({ receiverUser }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
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

    channel.bind("new-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      pusher.unsubscribe(`private-chat-1`);
      pusher.disconnect();
    };
  }, [receiverUser?.id, session?.user?.accessToken, session?.user?.id]);

  const handleNewMessage = async (event) => {
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

    console.log("response: ", response);

    if (response.ok) {
      setNewMessage("");
    }
  };

  return (
    <ChatContainer>
      <Typography variant="h6">Chat with {receiverUser.name}</Typography>

      <ChatMessagesContainer>
        {messages.map((message, i) => (
          <Message
            key={i}
            ownMessage={message.senderUserId === session?.user.id.toString()}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {message.senderUserId === session?.user.id.toString() ? "You:  " : `${receiverUser.name}: \t `}
            </Typography>
            <Typography variant="body1">{message.text}</Typography>
          </Message>
        ))}
      </ChatMessagesContainer>

      <form onSubmit={handleNewMessage}>
        <TextField
          variant="outlined"
          label="Message"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send
        </Button>
      </form>
    </ChatContainer>
  );
};

export default ChatComponent;

