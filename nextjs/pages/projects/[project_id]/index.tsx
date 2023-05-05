import {useRouter} from "next/router";
import {gql, useQuery} from "@apollo/client";
import ProjectItemCardSkeleton from "../../components/Project/ProjectItemCardSkeleton";
import {Project} from "../../../types/resolvers"
import ProjectCard from "../../components/Project/ProjectCard";

const GET_PROJECT = gql`query Project($projectId: ObjectID!) {
    Project(id: $projectId) {
        client_id
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
        attachments {
            url
            type
        }
        category
        stats {
            declined_count
            completed_count
            approved_count
            in_progress_count
        }
    }
}`

export default function Project() {
    const router = useRouter();
    const {project_id} = router.query;
    if (!project_id) return (<></>)

    const {loading, error, data} = useQuery<{ Project: Project }>(GET_PROJECT,
        {
            variables: {
                projectId: project_id
            }
        });
    if (loading) return <ProjectItemCardSkeleton/>
    if (error) return <h1>{error.message}</h1>;
    if (!data || !data.Project) return <h1>bobo</h1>

    return (
        <ProjectCard project={data.Project}/>
    )

};
