import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import {styled} from '@mui/joy/styles';
import {gql, useQuery} from "@apollo/client";
import {User} from "../../types/resolvers";
import ProjectItemCardSkeleton from "../../components/Skeletons/ProjectCardSkeleton";
import DashBoardProjects from "../../components/Dashboard/DashBoardProjects";

const Item = styled(Sheet)(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
}));

const GET_PROFILE = gql`query Profile {
    Profile {
        projects {
            client_id
            _id
            title
            description
            price
            skills
            reactions {
                freelancer_id
                reaction_type
            }
            created_at
            projectScope {
                estimated_duration_in_days
                level_of_expertise
                size_of_project
            }
            attachments {
                url
                type
                name
            }
            category
            stats {
                declined_count
                completed_count
                approved_count
                in_progress_count
            }
            proposals {
                _id
                project_id
                freelancer_id
                client_id
                price
                duration
                description
                cover_letter
                created_at
                updated_at
                status
            }
        }
    }
}`

// client
// freelancer Dashboard/client Dashboard
const items = [
    {title: "My projects", href: "/Dashboard/projects"},
    {title: "My proposals", href: "/Dashboard/proposals"},
    {title: "My profile", href: "/Dashboard/profile"},
    {title: "My payments", href: "/Dashboard/payments"}
]


export default function index() {
    // the types are not specific to check the query if you have any problem
    const {data, loading, error} = useQuery<{ Profile: User }>(GET_PROFILE);

    if (loading) return <Stack spacing={4}>
        <Stack spacing={2}>
            {
                [0, 1, 2, 4].map((_, i) => <ProjectItemCardSkeleton key={i}/>)
            }
        </Stack>
    </Stack>


    if (error) return <p>Error : {error.message}</p>;
    if (!data) return <p>No projects</p>


    return <Stack spacing={4}>
        {data.Profile && data.Profile.projects && <DashBoardProjects projectsArr={data.Profile.projects}/>}
    </Stack>
}