import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {Project} from "../../types/resolvers";
import {Chip, Divider, Stack} from "@mui/joy";
import moment from "moment";
import Attachments from "../ListItems/Attachments";
import {BarChart} from "../Charts/BarChart";


export default function ProjectCard({project}: { project: Project }) {


    return (

        <Card
            variant="outlined"
            sx={(theme) => ({
                width: "60vw",
                gridColumn: 'span 2',
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflow: 'hidden',
                gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                transition: 'transform 0.3s, border 0.3s',
                minHeight: "90vh",
                '&:hover': {
                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                    transform: 'translateY(-2px)',
                },
                '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
            })}
        >

            <Box sx={{width: "60vw"}}>
                <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>

                    {project.title}

                </Typography>
                <Typography level="h6" sx={{fontSize: 'sm', fontWeight: "light", color: "#495057"}} mb={0.5}>
                    Est. Budget {project.price.toFixed(2)} $ | {" "}
                    Est. Time {project.projectScope.estimated_duration_in_days} days | {" "}
                    Size {project.projectScope.size_of_project.toLowerCase()} | {" "}
                    Level {project.projectScope.level_of_expertise.toLowerCase()} | {" "}
                    Posted {moment(project.created_at).fromNow()}
                </Typography>
                <Typography level="inherit" sx={{fontSize: 'sm', fontWeight: "medium"}} mb={0.5}>
                    {project.description}
                </Typography>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}

                >
                    {project.skills.map((skill, id) => <Chip key={id} color="primary" size="sm">{skill}</Chip>)}
                    <Chip size="sm" color="success">{project.category.split("_").join(" ").toLowerCase()}</Chip>
                </Stack>


                {project.attachments.length > 0 &&
                    <Box>
                        <Divider sx={{margin: "10px"}}/>
                        <Typography>Project Attachments</Typography> <Attachments
                        attachments={project.attachments}/>

                    </Box>

                }
            </Box>


            <Stack alignItems="center" sx={{width: "100%", height: "20rem"}}>

                {project.stats && !(project.stats.approved_count === 0 && project.stats.completed_count === 0 && project.stats.declined_count === 0 && project.stats.in_progress_count === 0) &&
                    <Box>
                        <Divider sx={{margin: "10px"}}/>
                        <BarChart stats={project.stats}/>
                    </Box>

                }
            </Stack>


        </Card>
    )
        ;
}