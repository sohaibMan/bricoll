import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {Chip, Stack} from '@mui/joy';
import {Project} from "../../types/resolvers";
import moment from "moment";
import CustomLink from "../CustomLinks/CustomLink";
import {ProjectCardControlButtons} from "../Buttons/ProjectCardControlButtons";


export default function ProjectItemCard({project,children}: {
    project: Project,
    children: React.JSX.Element
}) {
    // todo :try to refactore the card

    return (
        <Box sx={{minHeight: 150}}>
            <Card
                variant="outlined"
                sx={(theme) => ({
                    width: "70vw",
                    gridColumn: 'span 2',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    overflow: 'hidden',
                    gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                    transition: 'transform 0.3s, border 0.3s',
                    '&:hover': {
                        borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                        transform: 'translateY(-2px)',
                    },
                    '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
                })}
            >

                <Box sx={{width: "60vw"}}>
                    <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>

                        <CustomLink
                            overlay
                            underline="none"
                            href={`projects/${project._id}`}
                            sx={{
                                cursor: 'pointer',
                                color: 'text.primary',
                                '&.Mui-focusVisible:after': {outlineOffset: '-4px'},
                            }}
                        >
                            {project.title}
                        </CustomLink>

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
                </Box>


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxWidth: 200,
                    }}
                >
                    {children &&
                        <Box sx={{display: 'flex', gap: 1}}>
                            {children}
                        </Box>}
                </Box>


            </Card>
        </Box>
    );
}