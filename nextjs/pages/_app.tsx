import {SessionProvider} from "next-auth/react";
import "../styles/styles.css";
import type {AppProps} from "next/app";
import type {Session} from "next-auth";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {Toaster} from "react-hot-toast";
import {StepContextProvider} from "../components/auth/registration/stepContext";


// const theme = createTheme({
//     palette: {
//         primary: {
//             //   main: "#e3f2fd",
//             main: "#ffffff",
//         },
//         secondary: {
//             main: "#66bb6a",
//         },
//     },
// });


export const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
});

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({

                                Component,
                                pageProps: {session, ...pageProps},
                            }: AppProps<{ session: Session }>) {

    return (
        <SessionProvider session={session}>
            <ApolloProvider client={client}>
                {/*<StyledEngineProvider injectFirst> */}
                <StepContextProvider>

                    {/* <!--             <ThemeProvider theme={theme}> --> */}
                    {/* <CssBaseline/> */}
                    {/* <Layout> */}
                    <Toaster/>
                    <Component {...pageProps} />
                    {/* </Layout> */}
                    {/* <!--             </ThemeProvider> --> */}
                </StepContextProvider>
                {/* </StyledEngineProvider> */}
            </ApolloProvider>
        </SessionProvider>
    );

}
