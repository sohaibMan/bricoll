import ProjectForm from "../../../components/Forms/ProjectForm";
import {gql, useQuery} from "@apollo/client";
import {Project} from "../../../types/resolvers";
import {Stack} from "@mui/joy";
import {useRouter} from "next/router";
import * as React from "react";


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
        proposals {
            _id ##get the proposals of me as a freelancer to this project
        }
    }
}`

const EDIT_PROJECT_MUTATION = gql`
    mutation EditProject($id: ObjectID!, $title: String, $description: String, $price: Float, $skills: [String!], $projectScope: ProjectScopeInput, $category: ProjectCategoriesEnum) {
        editProject(id: $id, title: $title, description: $description, price: $price, skills: $skills, projectScope: $projectScope, category: $category) {
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
        }
    }
`


function ProjectCardSkeleton() {
    return null;
}

const EditProject = () => {


    const router = useRouter();
    const {project_id} = router.query;
    if (!project_id) return (<></>)


    const {loading, error, data} = useQuery<{ Project: Project }>(GET_PROJECT, {
        variables: {
            projectId: project_id
        }
    });

    if (loading) return <Stack spacing={4}>
        <Stack spacing={2}>
            <ProjectCardSkeleton/>
        </Stack>
    </Stack>


    if (error) return <p>Error : {error.message}</p>;
    if (!data || !data.Project) return <p>No projects</p>

// return  <h1>{JSON.stringify(data)}</h1>
    return <ProjectForm PROJECT_MUTATION={EDIT_PROJECT_MUTATION} project={data.Project}/>;

};

export default EditProject;
