import {gql, useQuery} from '@apollo/client';
import ProjectCard from "../../components/Project/ProjectCard";
import {Project} from "../../types/resolvers";
import {Stack} from "@mui/joy";

const GET_PROJECTS = gql`
    query Project {
        Projects {
            _id
            title
            description
            price
            skills
            created_at
            projectScope {
                estimated_duration_in_days
                level_of_expertise
                size_of_project
            }
            category
            reactions {
                freelancer_id
                reaction_type
            }
        }
    }
`


export default function DisplayLocations() {
    // the types are not specific to check the query if you have any problem
    const {loading, error, data} = useQuery<{ Projects: Project[] }>(GET_PROJECTS, {});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (!data) return <p>No projects</p>


    return <Stack spacing={2}>{data.Projects.map((project) => <ProjectCard key={project._id.toString()} project={project}/>)}</Stack>
}