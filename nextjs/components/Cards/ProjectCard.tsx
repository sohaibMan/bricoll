import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {Project} from "../../types/resolvers";
import {Chip, Divider, Stack} from "@mui/joy";
import moment from "moment";
import Attachments from "../ListItems/Attachments";
import {ProjectStatsBarChart} from "../Charts/wrappers/ProjectStats";
import {ReadOnlyRichTextEditor} from "../RichTextEditor/ReadOnlyRichTextEditor";
import {useEditor} from "@tiptap/react";
import {Skeleton} from "@mui/material";


export default function ProjectCard({project}: { project: Project }) {
    const editor = useEditor({content: project.description});


    return (

        <Card
            variant="outlined"
            sx={(theme) => ({
                width: "60vw",
                margin: "auto",
                gridColumn: 'span 2',
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflow: 'hidden',
                gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                transition: 'transform 0.3s, border 0.3s',
                minHeight: "80vh",
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

                {/*<Typography level="inherit" sx={{fontSize: 'sm', fontWeight: "medium"}} mb={0.5}>*/}
                {/*    {project.description}*/}
                {/*</Typography>*/}


                {editor ? <ReadOnlyRichTextEditor editor={editor} /> : <Skeleton variant="rounded" width={"100%"} height={200} />}

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}

                >
                    {project.skills.map((skill, id) => <Chip key={id} color="primary" size="sm">{skill}</Chip>)}
                    <Chip size="sm" color="success">{project.category.split("_").join(" ").toLowerCase()}</Chip>
                </Stack>

            </Box>

            <Box sx={{width: "100%"}}>
                <Divider sx={{margin: "10px"}}/>

                <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>
                    Project Attachments
                </Typography>

                {project.attachments.length > 0 ?
                    <Attachments attachments={project.attachments}/> : <Typography>No Attachments</Typography>
                }
            </Box>

            <Box sx={{width: "100%"}}>


                <Stack>
                    <Divider sx={{margin: "10px"}}/>
                    <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>
                        Project Statistics
                    </Typography>
                    {
                        <Box sx={{width: "100%", height: "20rem"}}>
                            {project.stats ? <ProjectStatsBarChart stats={project.stats}/> :
                                <Typography>No statistics</Typography>}
                        </Box>

                    }
                </Stack>

            </Box>


        </Card>
    )
        ;
}