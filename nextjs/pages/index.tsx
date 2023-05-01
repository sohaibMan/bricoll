// import { useSession, getSession } from "next-auth/react";

// import Layout from "./components/layout";
// export default function IndexPage({ user }: any) {
//   const { data: session, status: loading } = useSession();

//   console.log("session v3 ", user.accessToken);

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
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { signIn, signOut, useSession, getSession } from "next-auth/react";

export default function Home(session: any) {
  const { status: loading } = useSession();

  const [messages, setMessages] = useState([]);

  // console.log("Access token v1 : ", session.user?.accessToken);

  useEffect(() => {
    // console.log("Access token after v1 : ", session.user.accessToken);

    if (session) {

      const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
        cluster: process.env.PUSHER_CLUSTER,
        // authEndpoint: '/api/chat/pusherAuth',
        // auth: {
        //   headers: {
        //     Authorization: `Bearer ${session.user?.accessToken}`,
        //   },
        // },
      });

      console.log("Access token after v1 : ", session.user.accessToken);

      const channel = pusher.subscribe("chat");
      channel.bind("new-message", (data: any) => {
        // setMessages((messages) => [...messages, data]);
      });

      return () => {
        pusher.disconnect();
      };
    }
  }, [session]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const message = formData.get("message");    

    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ message }),
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to use the chat</div>;
  }

  return (
    <div>
      <h1>Chat Room</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{/* {message.from}: {message.message} */}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      props: session,
    };

    // return session
  }

  // console.log("session from server : ", session.user);

  const { user } = session;
  return {
    props: session,
  };

  // return session
}
