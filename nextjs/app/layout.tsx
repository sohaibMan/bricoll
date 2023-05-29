"use client";

// These styles apply to every route in the application
import "../styles/globals.css"
import React from "react";
import {Toaster} from "react-hot-toast";
import {SessionProvider} from "next-auth/react";
import {client} from "../pages/_app";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

// export const metadata: Metadata = {
//     title: 'Bricol',
//     description: 'Your next freelancer job',
// };


export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (

        <html lang="en">
        <body>
        <SessionProvider>
            <ApolloProvider client={client}>
                <Toaster/>
                {children}
            </ApolloProvider>
        </SessionProvider>
        </body>
        </html>
    );
}