import {SessionProvider} from "next-auth/react";
import "./styles.css";

import type {AppProps} from "next/app";
import type {Session} from "next-auth";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../components/dev";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({Component, pageProps: {session, ...pageProps},}: AppProps<{ session: Session }>) {
    return (
        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
            <SessionProvider session={session}>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </SessionProvider>
        </DevSupport>
    );
}
