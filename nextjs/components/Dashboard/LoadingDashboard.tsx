import React from 'react'
import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";
import CircularProgress from "@mui/joy/CircularProgress";

export function LoadingDashboard() {
    return <Box
        sx={{
            justifyContent: "center",
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "350px",
        }}
    >
        <Link
            component="button"
            variant="outlined"
            startDecorator={
                <CircularProgress
                    variant="plain"
                    thickness={2}
                    sx={{"--CircularProgress-size": "16px"}}
                />
            }
            sx={{p: 1}}
        >
            Loading...
        </Link>
    </Box>;
}