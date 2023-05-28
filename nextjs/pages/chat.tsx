// import Layout from "./components/layout";
// import React, { useEffect, useState } from "react";
// import Pusher from "pusher-js";
// import { useSession } from "next-auth/react";
// import beamsClient from "../lib/beams";

// interface Message {
//   senderUserId: string;
//   receiverUserId: string;
//   text: string;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export default function Chat() {
//   const { status: loading, data: session } = useSession();

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const receiverUser: User = {
//     id: "646509dfc0edd86d1253454e",
//     name: "anas zn",
//     email: "anas.zn@example.com",
//   };

//   console.log("Session, ", session);

//   useEffect(() => {
//     if (!session) return;

//     const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
//       cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
//       authEndpoint: "/api/pusher/auth",
//       auth: {
//         headers: {
//           Authorization: `Bearer ${session.user.accessToken}`,
//         },
//       },
//     });

//     // console.log("pusher, ", pusher);

//     const channel = pusher.subscribe(`private-chat-1`);

//     // console.log("channel, ", channel);

//     channel.bind("new-message", (message: Message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // console.log("Messages, ", messages);

//     return () => {
//       pusher.unsubscribe(`private-chat-1`);
//       pusher.disconnect();
//     };
//   }, [receiverUser?.id, session?.user?.accessToken, session?.user?.id]);

//   const handleNewMessage = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!newMessage) {
//       return;
//     }

//     const response = await fetch("/api/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session?.user.accessToken}`,
//       },
//       body: JSON.stringify({
//         senderUserId: session?.user.id,
//         receiverUserId: receiverUser?.id,
//         text: newMessage,
//       }),
//     });

//     console.log("response: ", response);

//     if (response.ok) {
//       setNewMessage("");
//     }
//   };

//   return (
//     <Layout>
//       <div>
//         <h2>Chat with {receiverUser.name}</h2>

//         <div>
//           {messages.map((message, i) => (
//             <div key={i}>
//               <span>
//                 {message.senderUserId === session?.user.id.toString()
//                   ? "You "
//                   : receiverUser.name}
//               </span>
//               <span>{message.text}</span>
//             </div>
//           ))}
//         </div>

//         <form onSubmit={handleNewMessage}>
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(event) => setNewMessage(event.target.value)}
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </Layout>
//   );
// }

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
    id: "646509dfc0edd86d1253454e",
    name: "anas zn",
    email: "anas.zn@example.com",
  };

  console.log("Session, ", session);

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

    console.log("response: ", response);

    if (response.ok) {
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="fixed bottom-0 right-0 p-4 m-4 bg-white rounded shadow">
        <h2 className="mb-2">Chat with {receiverUser.name}</h2>

        <div className="mb-4">
          {messages.map((message, i) => (
            <div key={i}>
              <span className="mr-2">
                {message.senderUserId === session?.user.id.toString()
                  ? "You"
                  : receiverUser.name}
              </span>
              <span>{message.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleNewMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="flex-grow p-2 mr-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
}
