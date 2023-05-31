import {ReactNode} from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {Chip, Stack} from '@mui/joy';
import {Project} from "../../../types/resolvers";
import moment from "moment";
import CustomLink from "../../CustomLinks/CustomLink";

import {RichTextEditor} from "../../Inputs/RichTextEditor";


export default function ProjectItemCard({project, children}: {
    project: Project,
    children: ReactNode
}) {

    return (
        <Box sx={{minHeight: 150}}>
            <Card
                variant="outlined"
                sx={(theme) => ({
                    width: "100%",
                    gridColumn: 'span 2',
                    flexDirection: 'column',
                    gap: "1rem",
                    flexWrap: 'wrap',
                    overflow: 'hidden',
                    // gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                    transition: 'transform 0.3s, border 0.3s',
                    '&:hover': {
                        borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                        transform: 'translateY(-2px)',
                    },
                    '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
                })}
            >

                {/*<Box sx={{width: "80%"}}>*/}
                <Typography level="h1" sx={{fontSize: '19px', fontWeight: "bold", color: "#495057"}} mb={0.5}>

                    <CustomLink
                        href={`projects/${project._id}`}
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

                <RichTextEditor readOnly={true} value={project.description} theme="bubble"/>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}

                >
                    {project.skills.map((skill, id) => <Chip key={id} sx={{backgroundColor: "#eee", color: "#4C4444"}} size="sm">{skill}</Chip>)}
                    <Chip sx={{backgroundColor: "#73bb44", color: "#fff"}} size="sm">{project.category.split("_").join(" ").toLowerCase()}</Chip>
                </Stack>

                {children}

            </Card>
        </Box>
    );
}