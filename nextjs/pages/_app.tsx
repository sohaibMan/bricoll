import {SessionProvider} from "next-auth/react";
import "./styles.css";


import type {AppProps} from "next/app";
import type {Session} from "next-auth";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Toaster} from "react-hot-toast";

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});


// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({Component, pageProps: {session, ...pageProps},}: AppProps<{ session: Session }>) {

    return (
            <SessionProvider session={session}>
                <ApolloProvider client={client}>
                    <Toaster/>
                    <Component {...pageProps} />
                </ApolloProvider>
            </SessionProvider>
    );
}



