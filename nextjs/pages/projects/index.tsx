import {gql, useQuery} from '@apollo/client';
import ProjectItemCard from "../../components/Cards/ProjectItemCard";
import {Project} from "../../types/resolvers";
import {Stack} from "@mui/joy";
import {SearchForm} from "../../components/Forms/SearchForm";
import ProjectItemCardSkeleton from "../../components/Skeletons/ProjectItemCardSkeleton";
import {ProjectCardControlButtons} from "../../components/Buttons/ProjectCardControlButtons";

const GET_PROJECTS = gql`
    query Project($query: String, $filter: filterOptionsInput) {
        Projects(query: $query, filter: $filter) {
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
    const {loading, error, refetch, data} = useQuery<{ Projects: Project[] }>(GET_PROJECTS);

    if (loading) return <Stack spacing={4}>
        <SearchForm onRefetch={refetch}/>
        <Stack spacing={2}>
            {
                [0, 1, 2, 4].map((_, i) => <ProjectItemCardSkeleton key={i}/>)
            }
        </Stack>
    </Stack>


    if (error) return <p>Error : {error.message}</p>;
    if (!data) return <p>No projects</p>


    // @ts-ignore
    return <Stack spacing={4}>
        <SearchForm onRefetch={refetch}/>
        <Stack spacing={2}>{data.Projects.map((project) => <ProjectItemCard key={project._id.toString()} project={project}>
            <ProjectCardControlButtons projectId={project._id} reactions={project.reactions}/>
            </ProjectItemCard>
        )}</Stack>
    </Stack>
}