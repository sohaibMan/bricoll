// import Layout from "./components/layout";
// export default function IndexPage() {
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
import Button from "./components/Button";
import { FormEvent, ChangeEvent } from "react";

interface LoginProps {
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
  handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Login({ handleLogin, handleLoginChange }: LoginProps): JSX.Element {
  return (
    <div>
      <div>
        <h1>Chattr</h1>
        <p>your chats, your way</p>
      </div>
      <form onSubmit={handleLogin}>
        <p>Enter your name to start:</p>
        <div>
          <input
            type="text"
            onChange={handleLoginChange}
            placeholder="your name"
          />
          <Button text="Sign in to get started" />
        </div>
      </form>
    </div>
  );
}

