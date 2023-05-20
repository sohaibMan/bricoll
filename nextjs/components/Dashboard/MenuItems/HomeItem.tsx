import {User, UserRole} from "../../../types/resolvers";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import {ProjectStatsBarChartPerMonth} from "../../Charts/Project_Stats_Per_Month";

export const HomeItem = (props: {
    profile: User
    userRole: UserRole
}) => {
    return (
        <>
            {/*<Divider sx={{margin: "10px"}}/>*/}
            <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>
                welcome {props.profile.username}
            </Typography>

            {props.userRole === UserRole.Client && props.profile.projects_stats &&
                <Box sx={{width: "100%", height: "20rem"}}>
                    <Stack>
                        <Box>
                            {props.userRole === UserRole.Client &&
                                <ProjectStatsBarChartPerMonth stats={props.profile.projects_stats}/>}
                        </Box>
                        <Box>
                            {/*{JSON.stringify(props.profile.projects_stats)}*/}
                        </Box>
                    </Stack>
                </Box>}
        </>
    )
}