import { SessionProvider } from "next-auth/react";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ApolloClient, ApolloProvider, InMemoryCache, from } from "@apollo/client";
import { Toaster } from "react-hot-toast";

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/graphql`,
  cache: new InMemoryCache(),
});

import "../styles/globals.css"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Toaster />
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
