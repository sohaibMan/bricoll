import Footer from "../footer/footer";
import Header from "../header/header";
import BottomNavigation from '@mui/material/BottomNavigation';
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*<Header />*/}
        {children}
      {/*<Footer />*/}
    </>
  );
}
