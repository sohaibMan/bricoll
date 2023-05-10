import { SessionProvider } from "next-auth/react";
import "./styles.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { StyledEngineProvider } from "@mui/joy/styles";
import Layout from "../components/home/layout/layout";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
// import { green, purple } from '@mui/material/colors';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      //   main: "#e3f2fd",
      main: "#ffffff",
    },
    secondary: {
      main: "#66bb6a",
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [input, setInput] = useState("");

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </StyledEngineProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
