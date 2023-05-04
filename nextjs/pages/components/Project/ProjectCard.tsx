import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import {Project, Reaction_Type} from "../../../types/resolvers";
import {Chip, Stack} from "@mui/joy";
import {ReactionButton} from "../Buttons/ReactionButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import moment from "moment";


export default function ProjectCard({project}: { project: Project }) {


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
                        <Link
                            href={`products/${project._id}`}
                            overlay
                            underline="none"
                            sx={{
                                color: 'text.primary',
                                '&.Mui-focusVisible:after': {outlineOffset: '-4px'},
                            }}
                        >
                            {project.title}
                        </Link>
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
                    <Box sx={{display: 'flex', gap: 1}}>

                        <ReactionButton project_id={project._id} reactions={project.reactions}
                                        reaction_type={Reaction_Type.Love}
                                        active_icon={<FavoriteIcon color="primary"/>}
                                        inactive_icon={<FavoriteBorderRoundedIcon color="primary"/>}
                        />

                        <ReactionButton project_id={project._id} reactions={project.reactions}
                                        reaction_type={Reaction_Type.Dislike}
                                        active_icon={<ThumbDownIcon color="primary"/>}
                                        inactive_icon={<ThumbDownOffAltRoundedIcon color="primary"/>}
                        />

                    </Box>
                </Box>


            </Card>
        </Box>
    );
}