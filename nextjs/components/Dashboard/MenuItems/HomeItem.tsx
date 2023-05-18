import {User, UserRole} from "../../../types/resolvers";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import Box from "@mui/joy/Box";

export const HomeItem = (props: {
    profile: User
    userRole: UserRole
}) => {
    return (
        <>
            <Typography>welcome {props.profile.username}</Typography>
            {/*<Divider sx={{margin: "10px"}}/>*/}
            <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>
                Project Statistics
            </Typography>

            {props.userRole === UserRole.Client && props.profile.projects && <Box sx={{width: "100%", height: "20rem"}}>
                {/*<ProjectStatsBarChart stats={props.profile.projects.map(project=>{}).stats}/>?*/}
            </Box>}
        </>
    )
}