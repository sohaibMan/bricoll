"use client";

// These styles apply to every route in the application
import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { client } from "../pages/_app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
// import "../styles/globals.css";

const materialTheme = materialExtendTheme();

let theme = createTheme({
  palette: {
    primary: {
      main: "#73bb44",
    },
    secondary: {
      main: "#4C4444",
    },
  },
});

// export const metadata: Metadata = {
//     title: 'Bricol',
//     description: 'Your next freelancer job',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ApolloProvider client={client}>
            <Toaster />
            {/* <ThemeProvider theme={theme}>
              <MaterialCssVarsProvider
                theme={{ [MATERIAL_THEME_ID]: materialTheme }}
              > */}
            {/* <JoyCssVarsProvider> */}
            {children}
            {/* </JoyCssVarsProvider>
              </MaterialCssVarsProvider>
            </ThemeProvider> */}
          </ApolloProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
