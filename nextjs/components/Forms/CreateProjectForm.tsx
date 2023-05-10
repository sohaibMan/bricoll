import ProjectForm from "./ProjectForm";
import {gql} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import {Project} from "../../types/resolvers";

const CREATE_PROJECT_MUTATION = gql`
    mutation CreateProject($title: String!, $description: String!, $price: Float!, $skills: [String!]!, $projectScope: ProjectScopeInput!, $category: ProjectCategoriesEnum!) {
        createProject(title: $title, description: $description, price: $price, skills: $skills, projectScope: $projectScope, category: $category) {
            client_id
            _id
            title
            description
            price
            skills
            created_at
            category
            reactions {
                freelancer_id
                reaction_type
            }
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
        }
    }
`;
export default function CreateProjectForm(props: {
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}) {

    return <Box sx={{width: "90%", margin: "auto", height: "100%"}}><ProjectForm label="Add a new Project"
                                                                                PROJECT_MUTATION={CREATE_PROJECT_MUTATION}
                                                                                onSubmitProjectHandler={(projet) => {
                                                                                    props.setProjects(prv => [...prv, projet])
                                                                                }}/>
    </Box>
};
