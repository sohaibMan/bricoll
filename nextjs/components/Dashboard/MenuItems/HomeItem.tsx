import {User, UserRole} from "../../../types/resolvers";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import {ProjectStatsBarChartPerMonth} from "../../Charts/wrappers/Project_Stats_Per_Month";
import {RadarChartProposalsContracts} from "../../Charts/wrappers/RadarChartProposalsContracts";

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
            <Stack sx={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}
                   direction={"row"} spacing={4}>

                <Box sx={{width: "100%"}}>
                    <RadarChartProposalsContracts contracts_stats={props.profile.contracts_stats}
                                                  proposals_stats={props.profile.proposals_stats}/>

                </Box>
                {props.profile.projects_stats && props.userRole === UserRole.Client &&
                    <>
                        <Divider orientation="vertical"/>
                        <Box sx={{width: "100%"}}>
                            <ProjectStatsBarChartPerMonth stats={props.profile.projects_stats}/>
                        </Box>

                    </>
                }


            </Stack>

        </>
    )
}