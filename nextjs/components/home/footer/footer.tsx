// import React, { FC, ReactElement } from "react";
// import { Box, Container, Grid, Typography } from "@mui/material";

// export const Footer: FC = (): ReactElement => {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "auto",
//         // display: 'flex',
//         backgroundColor: "secondary.main",
//         paddingTop: "1rem",
//         paddingBottom: "1rem",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container direction="column" alignItems="center">
//           <Grid item xs={12}>
//             <Typography color="black" variant="h5">
//               React Starter App
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography color="textSecondary" variant="subtitle1">
//               {`${new Date().getFullYear()} | React | Material UI | React Router`}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

import * as React from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import logo from "../../../public/logo.png";

// export default Footer;
export default function Footer() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        left: 0,
        bottom: 0,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        >
          <div>
            <Image priority src={logo.src} width={50} height={50} alt="Logo" />
          </div>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©${new Date().getFullYear()}.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
