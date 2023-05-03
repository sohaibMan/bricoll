// import { useSession, getSession } from "next-auth/react";

// import Layout from "./components/layout";
// export default function IndexPage({user}) {
//   const { data: session, status: loading } = useSession();

//   // console.log("session v3 ", user);

//   return (
//     <>
//       <Layout>
//         <h1>NextAuth.js Example</h1>
//         <p>
//           This is an example site to demonstrate how to use{" "}
//           <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
//         </p>
//       </Layout>
//     </>
//   );
// }

// !!
// import Button from "./components/Button";
// import { FormEvent, ChangeEvent } from "react";

// interface LoginProps {
//   handleLogin: (e: FormEvent<HTMLFormElement>) => void;
//   handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }

// export default function Login({ handleLogin, handleLoginChange }: LoginProps): JSX.Element {
//   return (
//     <div>
//       <div>
//         <h1>Chattr</h1>
//         <p>your chats, your way</p>
//       </div>
//       <form onSubmit={handleLogin}>
//         <p>Enter your name to start:</p>
//         <div>
//           <input
//             type="text"
//             onChange={handleLoginChange}
//             placeholder="your name"
//           />
//           <Button text="Sign in to get started" />
//         </div>
//       </form>
//     </div>
//   );
// }

// !!
// import { useEffect, useState } from "react";
// import Pusher from "pusher-js";
// import { signIn, signOut, useSession, getSession } from "next-auth/react";

// export default function Home(session: any) {
//   const { status: loading } = useSession();

//   const [messages, setMessages] = useState([]);

//   // console.log("Access token v1 : ", session.user?.accessToken);

//   useEffect(() => {
//     // console.log("Access token after v1 : ", session.user.accessToken);

//     if (session) {
//       const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
//         cluster: process.env.PUSHER_CLUSTER,
//         authEndpoint: "/api/chat/pusherAuth",
//         auth: {
//           headers: {
//             Authorization: `Bearer ${session.user?.accessToken}`,
//           },
//         },
//       });

//       console.log("Access token after v1 : ", session.user.accessToken);

//       const channel = pusher.subscribe("chat");
//       channel.bind("new-message", (data: any) => {
//         // setMessages((messages) => [...messages, data]);
//       });

//       return () => {
//         pusher.disconnect();
//       };
//     }
//   }, [session]);

//   const handleSubmit = async (event: any) => {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const message = formData.get("message");

//     await fetch("/api/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session.user.accessToken}`,
//       },
//       body: JSON.stringify({ message }),
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!session) {
//     return <div>Please sign in to use the chat</div>;
//   }

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{/* {message.from}: {message.message} */}</li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="message" required />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx)
//   if (!session) {
//     return {
//       props: {}
//     }
//   }
//   const { user } = session;
//   return {
//     props: { user },
//   }
// }


import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";

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

export default function Chat(session: Session) {
  const { status: loading,data } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const receiverUser = { id: 2, name: 'anas zn', email: 'anas.zn@example.com' }; 

  // console.log("session v3 : ", session.user);
  console.log(data)
  


  useEffect(() => {
    // if (!session) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: "/api/pusher/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    });


    

    const channel = pusher.subscribe(
      `private-chat-${session?.user.id}-${receiverUser.id}`
    );

    channel.bind("new-message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      pusher.unsubscribe(`private-chat-${session?.user.id}-${receiverUser.id}`);
      pusher.disconnect();
    };
  }, [receiverUser?.id, session?.user.accessToken, session?.user.id]);

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
    <div>
      <h2>Chat with {receiverUser?.name}</h2>

      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <span>
              {message.senderUserId === session?.user.id
                ? "You"
                : receiverUser?.name}
              :{" "}
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
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx)
  if (!session) {
    return {
      props: {}
    }
  }
  const { user } = session;
  return {
    props: session,
  }
}


