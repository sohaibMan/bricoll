
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
    main: "#ffffff"
    },
    secondary: {
      main: "#66bb6a",
    },
  },
});

const Home = () => {
  const [input, setInput] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <div>Hello World</div>
      </Layout>
    </ThemeProvider>
  );
  }
export default Home;
