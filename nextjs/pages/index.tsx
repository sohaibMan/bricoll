import Layout from "./components/layout";
import React, {useEffect, useState} from "react";
import Pusher from "pusher-js";
import {useSession} from "next-auth/react";

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
    const {status: loading, data: session} = useSession();

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const receiverUser:User = {id:"645012f904bd8b633568faf2", name: 'anas zn', email: 'anas.zn@example.com'};


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


        const channel = pusher.subscribe(
            `private-chat-${session.user.id}-${receiverUser.id}`
        );

        console.log(`private-chat-${session.user.id}-${receiverUser.id}`)

        channel.bind("new-message", (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            pusher.unsubscribe(`private-chat-${session?.user.id}-${receiverUser.id}`);
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
                    {messages.map((message,i) => (
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


